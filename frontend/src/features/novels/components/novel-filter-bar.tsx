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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#11131e] p-4 rounded-2xl border border-white/10">
      <div>
        <input
          type="text"
          placeholder="Tìm theo tên truyện hoặc tác giả..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#0a0b10] border border-white/10 text-white placeholder-slate-500 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-amber-500/50"
        />
      </div>
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-[#0a0b10] border border-white/10 text-white text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-amber-500/50"
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
          className="w-full bg-[#0a0b10] border border-white/10 text-white text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-amber-500/50"
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
