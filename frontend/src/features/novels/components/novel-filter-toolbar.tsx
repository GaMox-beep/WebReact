interface NovelFilterToolbarProps {
  status: string
  onStatusChange: (status: string) => void
  sortBy: 'createdAt' | 'views' | 'rating'
  onSortChange: (sort: 'createdAt' | 'views' | 'rating') => void
}

const STATUS_OPTIONS = [
  { id: 'ALL', label: 'Tất cả' },
  { id: 'ONGOING', label: 'Đang ra' },
  { id: 'COMPLETED', label: 'Hoàn thành' },
]

const SORT_OPTIONS = [
  { id: 'createdAt', label: 'Mới nhất' },
  { id: 'views', label: 'Lượt xem' },
  { id: 'rating', label: 'Đánh giá' },
] as const

export const NovelFilterToolbar = ({
  status,
  onStatusChange,
  sortBy,
  onSortChange,
}: NovelFilterToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-3">
      {/* Status Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        <span className="text-xs text-[var(--text-muted)] font-medium mr-1 shrink-0">
          Trạng thái:
        </span>
        {STATUS_OPTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onStatusChange(item.id)}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors whitespace-nowrap ${
              status === item.id
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-gold)] border border-[var(--border-color)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Sort Selector */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-xs text-[var(--text-muted)] font-medium mr-1">
          Sắp xếp:
        </span>
        {SORT_OPTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSortChange(item.id)}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors whitespace-nowrap ${
              sortBy === item.id
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-gold)] border border-[var(--border-color)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
