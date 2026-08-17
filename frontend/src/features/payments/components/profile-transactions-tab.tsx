import { useState } from 'react';
import { useGetMyTransactions } from '../api/get-my-transactions';
import { RecentTransactionsTable } from './recent-transactions-table';

export const ProfileTransactionsTab = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyTransactions(page, 10);

  const transactions = data?.items || [];
  const pagination = data?.pagination;

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            Lịch sử nạp Linh Thạch
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Danh sách tất cả các giao dịch nạp tiền qua cổng thanh toán MoMo
          </p>
        </div>
      </div>

      <RecentTransactionsTable transactions={transactions} isLoading={isLoading} />

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--border-color)] text-xs">
          <span className="text-[var(--text-secondary)]">
            Trang {pagination.page} / {pagination.totalPages} ({pagination.total} giao dịch)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--accent-gold)] transition-colors cursor-pointer"
            >
              Trước
            </button>
            <button
              type="button"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--accent-gold)] transition-colors cursor-pointer"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
