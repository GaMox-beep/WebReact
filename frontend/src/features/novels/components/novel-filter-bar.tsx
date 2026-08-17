import type { Category } from '../types'

interface NovelFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  selectedStatus: string
  onStatusChange: (value: string) => void
  categories: Category[]
}

export const NovelFilterBar = ({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  categories,
}: NovelFilterBarProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[var(--bg-surface)] p-4 rounded-2xl border border-[var(--border-color)]">
      <div>
        <input
          type="text"
          placeholder="Tìm theo tên truyện hoặc tác giả..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-[var(--accent-gold)]/50"
        />
      </div>
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-[var(--accent-gold)]/50"
        >
          <option value="">Tất cả thể loại</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-[var(--accent-gold)]/50"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="ONGOING">Đang ra</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="PAUSED">Tạm dừng</option>
        </select>
      </div>
    </div>
  )
}
