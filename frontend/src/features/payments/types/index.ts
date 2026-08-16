export type TransactionStatus =
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED';

export type PaymentMethod = 'MOMO' | 'VNPAY';

export interface RechargePackage {
  id: string;
  name: string;
  amount: number;
  coins: number;
  bonusCoins: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  orderId: string;
  requestId: string;
  amount: number;
  coins: number;
  status: TransactionStatus;
  paymentMethod: PaymentMethod | string;
  transId?: string | null;
  payUrl?: string | null;
  packageId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  packageId: string;
  paymentMethod: PaymentMethod;
}

export interface CreatePaymentResponse {
  orderId: string;
  requestId: string;
  amount: number;
  coins: number;
  paymentMethod: PaymentMethod;
  payUrl: string;
  qrCodeUrl?: string;
  deeplink?: string;
}

export interface VerifyPaymentRequest {
  orderId: string;
  queryParams?: Record<string, string>;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  transaction: Transaction;
}

export interface TransactionsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TransactionsResponse {
  items: Transaction[];
  pagination: TransactionsPagination;
}
