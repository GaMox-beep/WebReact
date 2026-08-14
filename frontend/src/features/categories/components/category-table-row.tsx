import type { Category } from '../types'

interface CategoryTableRowProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (id: string, name: string) => void
}

export const CategoryTableRow = ({
  category,
  onEdit,
  onDelete,
}: CategoryTableRowProps) => {
  const formattedDate = new Date(category.createdAt).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="py-3.5 px-4">
        <div className="font-semibold text-white">{category.name}</div>
      </td>
      <td className="py-3.5 px-4">
        <code className="text-xs text-amber-400/90 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          {category.slug}
        </code>
      </td>
      <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">
        {category.description || <span className="text-slate-600 italic">Chưa có mô tả</span>}
      </td>
      <td className="py-3.5 px-4">
        <span className="text-sm font-medium text-slate-300">
          {category._count?.novels ?? 0} truyện
        </span>
      </td>
      <td className="py-3.5 px-4 text-slate-400 text-xs">
        {formattedDate}
      </td>
      <td className="py-3.5 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(category)}
            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
            title="Chỉnh sửa thể loại"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(category.id, category.name)}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
            title="Xóa thể loại"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
}
