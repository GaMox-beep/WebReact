import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { paths } from '../../config/paths';
import { useGetRechargePackages } from '../../features/payments/api/get-packages';
import { useCreatePayment } from '../../features/payments/api/create-payment';
import { useGetMyTransactions } from '../../features/payments/api/get-my-transactions';
import { RechargePackageCard } from '../../features/payments/components/recharge-package-card';
import { RecentTransactionsTable } from '../../features/payments/components/recent-transactions-table';
import type { PaymentMethod } from '../../features/payments/types';

export const RechargePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { data: packages, isLoading: isLoadingPackages } = useGetRechargePackages();
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useGetMyTransactions(1, 5);
  const createPaymentMutation = useCreatePayment();

  const [userSelectedPackageId, setUserSelectedPackageId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MOMO');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultPackage =
    packages && packages.length > 0
      ? packages.length > 1
        ? packages[1]
        : packages[0]
      : null;

  const selectedPackage =
    (packages && userSelectedPackageId
      ? packages.find((p) => p.id === userSelectedPackageId)
      : null) || defaultPackage;

  const handlePayment = async () => {
    if (!isAuthenticated) {
      navigate(paths.auth.login.getHref(paths.payments.recharge.getHref()));
      return;
    }

    if (!selectedPackage) {
      setErrorMessage('Vui lòng chọn một gói nạp');
      return;
    }

    setErrorMessage(null);

    try {
      const res = await createPaymentMutation.mutateAsync({
        packageId: selectedPackage.id,
        paymentMethod,
      });

      if (res.payUrl) {
        window.location.href = res.payUrl;
      } else {
        setErrorMessage(`Không nhận được đường dẫn thanh toán từ cổng ${paymentMethod}`);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo giao dịch thanh toán';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Balance Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Nạp Linh Thạch
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Nạp Linh Thạch để mở khóa các chương truyện VIP và ủng hộ tác giả
          </p>
        </div>

        {isAuthenticated && user && (
          <div className="flex items-center gap-4 bg-[var(--bg-surface)] border border-[var(--border-color)] px-5 py-3.5 rounded-xl shadow-2xs">
            <div className="p-2.5 rounded-lg bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="8" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="20" y1="12" x2="22" y2="12" />
                <line x1="2" y1="12" x2="4" y2="12" />
              </svg>
            </div>
            <div>
              <span className="text-xs text-[var(--text-secondary)] block">
                Số dư hiện tại
              </span>
              <span className="text-xl font-bold text-[var(--accent-gold)]">
                {(user.coins ?? 0).toLocaleString('vi-VN')}{' '}
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  Linh Thạch
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left 2 Cols: Package Grid & Payment Methods */}
        <div className="lg:col-span-2 space-y-8">
          {/* Packages */}
          <div>
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              1. Chọn gói Linh Thạch
            </h2>

            {isLoadingPackages ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-28 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packages?.map((pkg) => (
                  <RechargePackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isSelected={selectedPackage?.id === pkg.id}
                    onSelect={(p) => setUserSelectedPackageId(p.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Payment Gateway Selector */}
          <div>
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              2. Chọn cổng thanh toán
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* MoMo Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('MOMO')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'MOMO'
                    ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/5 ring-1 ring-[var(--accent-gold)]'
                    : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-gold)]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#A50064] flex items-center justify-center text-white font-bold text-xs tracking-tight shrink-0 shadow-2xs">
                    MoMo
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[var(--text-primary)] block">
                      Ví MoMo
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      Quét mã QR / App MoMo
                    </span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'MOMO'
                      ? 'border-[var(--accent-gold)]'
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  {paymentMethod === 'MOMO' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-gold)]" />
                  )}
                </div>
              </button>

              {/* VNPay Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('VNPAY')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'VNPAY'
                    ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/5 ring-1 ring-[var(--accent-gold)]'
                    : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-gold)]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#005BAA] flex items-center justify-center text-white font-bold text-xs tracking-tight shrink-0 shadow-2xs">
                    VNPAY
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[var(--text-primary)] block">
                      Cổng VNPAY
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      Thẻ ATM / QR / Tài khoản Ngân hàng
                    </span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'VNPAY'
                      ? 'border-[var(--accent-gold)]'
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  {paymentMethod === 'VNPAY' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-gold)]" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Summary Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)] pb-3 border-b border-[var(--border-color)]">
              Thông tin thanh toán
            </h3>

            {selectedPackage ? (
              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Gói nạp:</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {selectedPackage.name}
                  </span>
                </div>

                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Cổng thanh toán:</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {paymentMethod === 'MOMO' ? 'Ví MoMo' : 'Cổng VNPay'}
                  </span>
                </div>

                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Linh Thạch cơ bản:</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {selectedPackage.coins.toLocaleString('vi-VN')}
                  </span>
                </div>

                {selectedPackage.bonusCoins > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Thưởng thêm:</span>
                    <span className="font-medium">
                      +{selectedPackage.bonusCoins.toLocaleString('vi-VN')}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-[var(--border-color)] flex justify-between items-baseline">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    Tổng nhận được:
                  </span>
                  <span className="text-lg font-bold text-[var(--accent-gold)]">
                    {(
                      selectedPackage.coins + selectedPackage.bonusCoins
                    ).toLocaleString('vi-VN')}{' '}
                    <span className="text-xs font-normal text-[var(--text-primary)]">
                      Linh Thạch
                    </span>
                  </span>
                </div>

                <div className="pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    Tổng thanh toán:
                  </span>
                  <span className="text-xl font-bold text-[var(--text-primary)]">
                    {selectedPackage.amount.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-[var(--text-secondary)]">
                Vui lòng chọn một gói nạp để tiếp tục
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
                {errorMessage}
              </div>
            )}

            <button
              type="button"
              disabled={!selectedPackage || createPaymentMutation.isPending}
              onClick={handlePayment}
              className="w-full py-3 px-4 rounded-xl bg-[var(--accent-gold)] text-slate-900 font-semibold text-sm hover:brightness-105 active:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              {createPaymentMutation.isPending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-slate-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Đang kết nối cổng thanh toán...</span>
                </>
              ) : (
                <span>Thanh toán với {paymentMethod === 'MOMO' ? 'MoMo' : 'VNPay'}</span>
              )}
            </button>

            <p className="text-2xs text-center text-[var(--text-secondary)]">
              Bằng việc bấm thanh toán, bạn đồng ý với Điều khoản nạp tiền và sử dụng dịch vụ của WebNovel.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent 5 Transactions */}
      {isAuthenticated && (
        <div className="mt-16 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-4">
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Giao dịch gần đây
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                5 giao dịch nạp Linh Thạch mới nhất của bạn
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(paths.users.profile.getHref())}
              className="text-xs text-[var(--accent-gold)] hover:underline cursor-pointer font-medium"
            >
              Xem tất cả
            </button>
          </div>

          <RecentTransactionsTable
            transactions={transactionsData?.items || []}
            isLoading={isLoadingTransactions}
          />
        </div>
      )}
    </div>
  );
};

export default RechargePage;
