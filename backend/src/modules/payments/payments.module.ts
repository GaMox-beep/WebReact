import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MomoService } from './momo.service';
import { VnpayService } from './vnpay.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, MomoService, VnpayService],
  exports: [PaymentsService, MomoService, VnpayService],
})
export class PaymentsModule {}
