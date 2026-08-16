import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MomoService } from './momo.service';
import { VnpayService } from './vnpay.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { MomoIpnDto } from './dto/momo-ipn.dto';
import { Transaction, TransactionStatus, PaymentMethod } from '@prisma/client';
import { randomUUID } from 'crypto';
import type { IPaymentProvider } from './interfaces/payment-provider.interface';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly momoService: MomoService,
    private readonly vnpayService: VnpayService,
  ) {}

  /**
   * Helper: Lấy provider tương ứng với phương thức thanh toán
   */
  private getProvider(method: PaymentMethod): IPaymentProvider {
    switch (method) {
      case PaymentMethod.VNPAY:
        return this.vnpayService;
      case PaymentMethod.MOMO:
      default:
        return this.momoService;
    }
  }

  /**
   * Lấy danh sách các gói nạp đang hoạt động
   */
  async getPackages() {
    return this.prisma.rechargePackage.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  /**
   * Tạo đơn nạp tiền và sinh URL thanh toán (MoMo hoặc VNPay)
   */
  async createPayment(
    userId: string,
    dto: CreatePaymentDto,
    ipAddress = '127.0.0.1',
  ) {
    // 1. Server-side package lookup & active check
    const pkg = await this.prisma.rechargePackage.findUnique({
      where: { id: dto.packageId },
    });

    if (!pkg || !pkg.isActive) {
      throw new BadRequestException(
        'Gói nạp không tồn tại hoặc đã ngừng kích hoạt',
      );
    }

    // 2. Server-side generated IDs
    const prefix = dto.paymentMethod === PaymentMethod.VNPAY ? 'VNP' : 'MOMO';
    const orderId = `${prefix}_${Date.now()}_${randomUUID().substring(0, 8)}`;
    const requestId = randomUUID();
    const totalCoins = pkg.coins + pkg.bonusCoins;

    // 3. Tạo bản ghi Transaction ở trạng thái PENDING
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        orderId,
        requestId,
        amount: pkg.amount,
        coins: totalCoins,
        status: TransactionStatus.PENDING,
        paymentMethod: dto.paymentMethod,
        packageId: pkg.id,
      },
    });

    // 4. Chọn Provider và tạo Payment URL
    const provider = this.getProvider(dto.paymentMethod);
    const orderInfo = `Nạp ${totalCoins.toLocaleString('vi-VN')} Linh Thạch (${pkg.name})`;

    const paymentResponse = await provider.createPaymentUrl({
      orderId,
      requestId,
      amount: pkg.amount,
      orderInfo,
      ipAddress,
    });

    // 5. Lưu payUrl vào transaction
    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: { payUrl: paymentResponse.payUrl },
    });

    return {
      orderId,
      requestId,
      amount: pkg.amount,
      coins: totalCoins,
      paymentMethod: dto.paymentMethod,
      payUrl: paymentResponse.payUrl,
    };
  }

  /**
   * Idempotent Payment Completion Core Logic
   * Sử dụng PostgreSQL row lock `SELECT ... FOR UPDATE` trong Prisma transaction
   */
  async completePayment(
    orderId: string,
    gatewayTransId: string | number,
    paidAmount: number,
    isSuccess: boolean,
  ): Promise<Transaction> {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Khóa dòng Transaction bằng SELECT ... FOR UPDATE (PostgreSQL row-level lock)
      const rows = await tx.$queryRaw<Transaction[]>`
        SELECT * FROM "transactions" WHERE "orderId" = ${orderId} FOR UPDATE
      `;
      const transaction = rows[0];

      if (!transaction) {
        throw new NotFoundException(
          `Giao dịch không tồn tại với orderId: ${orderId}`,
        );
      }

      // 2. Kiểm tra Idempotent: Nếu đã thành công thì trả về luôn không cộng trùng
      if (transaction.status === TransactionStatus.SUCCESS) {
        this.logger.log(
          `Transaction ${orderId} already completed successfully. Idempotent return.`,
        );
        return transaction;
      }

      if (isSuccess) {
        // 3. Defense-in-depth: Kiểm tra số tiền cổng thanh toán báo về có khớp với DB không
        if (Number(paidAmount) !== transaction.amount) {
          this.logger.error(
            `CRITICAL: Amount mismatch on orderId ${orderId}: expected ${transaction.amount}, got ${paidAmount}`,
          );
          return await tx.transaction.update({
            where: { orderId },
            data: { status: TransactionStatus.FAILED },
          });
        }

        // 4. Cập nhật trạng thái đơn thành SUCCESS và lưu mã giao dịch của Gateway
        const updatedTx = await tx.transaction.update({
          where: { orderId },
          data: {
            status: TransactionStatus.SUCCESS,
            transId: String(gatewayTransId || ''),
          },
        });

        // 5. Cộng Linh Thạch cho User atomically
        await tx.user.update({
          where: { id: transaction.userId },
          data: { coins: { increment: transaction.coins } },
        });

        this.logger.log(
          `Successfully credited ${transaction.coins} coins to user ${transaction.userId} for order ${orderId}`,
        );

        return updatedTx;
      } else {
        return await tx.transaction.update({
          where: { orderId },
          data: { status: TransactionStatus.FAILED },
        });
      }
    });
  }

  /**
   * Xử lý IPN Webhook từ MoMo
   */
  async handleMomoIpn(ipnDto: MomoIpnDto) {
    this.logger.log(
      `Received MoMo IPN for orderId: ${ipnDto.orderId}, resultCode: ${ipnDto.resultCode}`,
    );

    // 1. BẮT BUỘC: Xác thực chữ ký HMAC-SHA256
    const isValid = this.momoService.verifySignature(ipnDto);
    if (!isValid) {
      this.logger.warn(`Invalid IPN signature for orderId: ${ipnDto.orderId}`);
      throw new BadRequestException('Invalid MoMo signature');
    }

    // 2. Chữ ký hợp lệ -> Gọi luồng xử lý idempotent
    const isSuccess = ipnDto.resultCode === 0;
    await this.completePayment(
      ipnDto.orderId,
      ipnDto.transId,
      Number(ipnDto.amount),
      isSuccess,
    );

    // 3. Trả về phản hồi tiêu chuẩn cho MoMo Webhook
    return {
      message: 'Received',
      resultCode: 0,
    };
  }

  /**
   * Xử lý IPN Webhook từ VNPay
   */
  async handleVnpayIpn(query: Record<string, unknown>) {
    this.logger.log(
      `Received VNPay IPN for orderId: ${query['vnp_TxnRef']}, ResponseCode: ${query['vnp_ResponseCode']}`,
    );

    // 1. BẮT BUỘC: Xác thực chữ ký HMAC-SHA512
    const isValid = this.vnpayService.verifySignature(query);
    if (!isValid) {
      this.logger.warn(
        `Invalid VNPay IPN signature for orderId: ${query['vnp_TxnRef']}`,
      );
      return {
        RspCode: '97',
        Message: 'Checksum failed',
      };
    }

    const orderId = String(query['vnp_TxnRef']);
    const vnpAmount = Number(query['vnp_Amount']) / 100;
    const transId = String(query['vnp_TransactionNo'] || '');
    const isSuccess =
      query['vnp_ResponseCode'] === '00' &&
      (query['vnp_TransactionStatus'] === undefined ||
        query['vnp_TransactionStatus'] === '00');

    try {
      await this.completePayment(orderId, transId, vnpAmount, isSuccess);
      return {
        RspCode: '00',
        Message: 'Confirm Success',
      };
    } catch (err: unknown) {
      if (err instanceof NotFoundException) {
        return {
          RspCode: '01',
          Message: 'Order not found',
        };
      }
      return {
        RspCode: '99',
        Message: 'Unknown error',
      };
    }
  }

  /**
   * Xác thực và hoàn tất đơn nạp khi người dùng chuyển hướng về trang kết quả (/nap/ket-qua)
   * 1. Nếu IPN đã xử lý thành công trước đó -> trả về kết quả ngay (< 1ms).
   * 2. Nếu có queryParams đi kèm chứa chữ ký hợp lệ -> xác thực chữ ký mật mã và hoàn tất ngay (< 5ms).
   * 3. Fallback: Nếu không có queryParams -> gọi queryTransactionStatus Server-to-Server.
   */
  async verifyPayment(
    userId: string,
    orderId: string,
    queryParams?: Record<string, any>,
  ) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { orderId },
    });

    if (!transaction) {
      throw new NotFoundException('Giao dịch không tồn tại');
    }

    // Anti-IDOR Check: Ngăn chặn người dùng kiểm tra đơn của người khác
    if (transaction.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền kiểm tra đơn hàng này');
    }

    // Nếu đã thành công trước đó (do IPN về trước) -> trả về kết quả ngay
    if (transaction.status === TransactionStatus.SUCCESS) {
      return {
        success: true,
        message: 'Giao dịch đã được ghi nhận thành công',
        transaction,
      };
    }

    if (transaction.status === TransactionStatus.FAILED) {
      return {
        success: false,
        message: 'Giao dịch thất bại',
        transaction,
      };
    }

    // Fast-path: Kiểm tra chữ ký mật mã trực tiếp từ callback queryParams
    if (queryParams && Object.keys(queryParams).length > 0) {
      const provider = this.getProvider(transaction.paymentMethod);
      const isSignatureValid = provider.verifySignature(queryParams);

      if (isSignatureValid) {
        this.logger.log(
          `Fast-path: Valid cryptographic callback signature for order ${orderId}`,
        );

        let isSuccess = false;
        let transId = '';
        let amount = transaction.amount;

        if (transaction.paymentMethod === PaymentMethod.VNPAY) {
          isSuccess =
            queryParams['vnp_ResponseCode'] === '00' &&
            (queryParams['vnp_TransactionStatus'] === undefined ||
              queryParams['vnp_TransactionStatus'] === '00');
          transId = String(queryParams['vnp_TransactionNo'] || '');
          amount = Number(queryParams['vnp_Amount']) / 100;
        } else {
          isSuccess =
            queryParams['resultCode'] === 0 ||
            queryParams['resultCode'] === '0';
          transId = String(queryParams['transId'] || '');
          amount = Number(queryParams['amount']);
        }

        const updatedTx = await this.completePayment(
          orderId,
          transId,
          amount,
          isSuccess,
        );

        return {
          success: isSuccess,
          message: isSuccess
            ? 'Thanh toán thành công'
            : 'Thanh toán không thành công',
          transaction: updatedTx,
        };
      }
    }

    // Fallback: Gọi Query API của Provider tương ứng (Server-to-Server)
    const provider = this.getProvider(transaction.paymentMethod);
    const queryRes = await provider.queryTransactionStatus(
      orderId,
      transaction.requestId,
    );

    const updatedTx = await this.completePayment(
      orderId,
      queryRes.transId,
      queryRes.amount,
      queryRes.isPaid,
    );

    return {
      success: queryRes.isPaid,
      message:
        queryRes.message ||
        (queryRes.isPaid
          ? 'Thanh toán thành công'
          : 'Thanh toán không thành công'),
      transaction: updatedTx,
    };
  }

  /**
   * Lấy danh sách lịch sử nạp của người dùng có phân trang
   */
  async getUserTransactions(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.transaction.count({
        where: { userId },
      }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
