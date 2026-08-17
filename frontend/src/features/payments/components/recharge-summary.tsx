import type { RechargePackage, PaymentMethod } from '../types'

interface RechargeSummaryProps {
  selectedPackage: RechargePackage | null
  paymentMethod: PaymentMethod
  isPending: boolean
  errorMessage: string | null
  onPayment: () => void
}

export const RechargeSummary = ({
  selectedPackage,
  paymentMethod,
  isPending,
  errorMessage,
  onPayment,
}: RechargeSummaryProps) => {
  return (
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
        disabled={!selectedPackage || isPending}
        onClick={onPayment}
        className="w-full py-3 px-4 rounded-xl bg-[var(--accent-gold)] text-slate-900 font-semibold text-sm hover:brightness-105 active:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
      >
        {isPending ? (
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
  )
}
