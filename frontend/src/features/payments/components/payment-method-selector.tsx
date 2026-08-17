import type { PaymentMethod } from '../types'

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod
  onSelect: (method: PaymentMethod) => void
}

const PAYMENT_OPTIONS: { id: PaymentMethod; name: string; description: string; bgColor: string }[] = [
  { id: 'MOMO', name: 'Ví MoMo', description: 'Quét mã QR / App MoMo', bgColor: '#A50064' },
  { id: 'VNPAY', name: 'Cổng VNPAY', description: 'Thẻ ATM / QR / Tài khoản Ngân hàng', bgColor: '#005BAA' },
]

export const PaymentMethodSelector = ({
  paymentMethod,
  onSelect,
}: PaymentMethodSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {PAYMENT_OPTIONS.map((option) => {
        const isSelected = paymentMethod === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              isSelected
                ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/5 ring-1 ring-[var(--accent-gold)]'
                : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-gold)]/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs tracking-tight shrink-0 shadow-2xs"
                style={{ backgroundColor: option.bgColor }}
              >
                {option.id === 'MOMO' ? 'MoMo' : 'VNPAY'}
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--text-primary)] block">
                  {option.name}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  {option.description}
                </span>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isSelected ? 'border-[var(--accent-gold)]' : 'border-[var(--border-color)]'
              }`}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-gold)]" />
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
