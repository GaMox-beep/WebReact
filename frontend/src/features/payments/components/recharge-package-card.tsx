import type { RechargePackage } from '../types';

interface RechargePackageCardProps {
  pkg: RechargePackage;
  isSelected: boolean;
  onSelect: (pkg: RechargePackage) => void;
}

export const RechargePackageCard = ({
  pkg,
  isSelected,
  onSelect,
}: RechargePackageCardProps) => {
  const totalCoins = pkg.coins + pkg.bonusCoins;

  return (
    <button
      type="button"
      onClick={() => onSelect(pkg)}
      className={`relative w-full text-left p-5 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 shadow-xs ring-1 ring-[var(--accent-gold)]'
          : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--text-secondary)]/40'
      }`}
    >
      {pkg.bonusCoins > 0 && (
        <span className="absolute -top-2.5 right-4 bg-[var(--accent-gold)] text-slate-900 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
          +{pkg.bonusCoins.toLocaleString('vi-VN')} Linh Thạch ({Math.round((pkg.bonusCoins / pkg.coins) * 100)}%)
        </span>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
          {pkg.name}
        </span>

        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-[var(--text-primary)]">
            {totalCoins.toLocaleString('vi-VN')}
          </span>
          <span className="text-xs font-medium text-[var(--accent-gold)]">
            Linh Thạch
          </span>
        </div>

        <div className="pt-2 mt-1 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>Giá thanh toán:</span>
          <span className="font-semibold text-sm text-[var(--text-primary)]">
            {pkg.amount.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>
    </button>
  );
};
