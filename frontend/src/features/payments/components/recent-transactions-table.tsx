import type { Transaction, TransactionStatus } from '../types';

interface RecentTransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const statusMap: Record<
  TransactionStatus,
  { label: string; className: string }
> = {
  SUCCESS: {
    label: 'Thành công',
    className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
  PENDING: {
    label: 'Đang xử lý',
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  FAILED: {
    label: 'Thất bại',
    className: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  },
  CANCELLED: {
    label: 'Đã hủy',
    className: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  },
};

export const RecentTransactionsTable = ({
  transactions,
  isLoading,
}: RecentTransactionsTableProps) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3 py-4">
        <div className="h-10 bg-[var(--bg-surface)] rounded-lg" />
        <div className="h-10 bg-[var(--bg-surface)] rounded-lg" />
        <div className="h-10 bg-[var(--bg-surface)] rounded-lg" />
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-[var(--text-secondary)]">
        Chưa có giao dịch nạp tiền nào.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-[var(--border-color)] text-[var(--text-secondary)]">
            <th className="pb-3 font-medium">Mã đơn</th>
            <th className="pb-3 font-medium">Thời gian</th>
            <th className="pb-3 font-medium">Số tiền</th>
            <th className="pb-3 font-medium">Linh Thạch</th>
            <th className="pb-3 font-medium text-right">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
          {transactions.map((tx) => {
            const statusConfig = statusMap[tx.status] || statusMap.PENDING;
            const dateStr = new Date(tx.createdAt).toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <tr key={tx.id} className="hover:bg-[var(--bg-surface)]/50 transition-colors">
                <td className="py-3 font-mono text-[var(--text-primary)]">
                  {tx.orderId}
                </td>
                <td className="py-3 text-[var(--text-secondary)]">{dateStr}</td>
                <td className="py-3 font-medium text-[var(--text-primary)]">
                  {tx.amount.toLocaleString('vi-VN')} đ
                </td>
                <td className="py-3 font-semibold text-[var(--accent-gold)]">
                  +{tx.coins.toLocaleString('vi-VN')}
                </td>
                <td className="py-3 text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-2xs font-medium border ${statusConfig.className}`}
                  >
                    {statusConfig.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
