import { StatusBadge } from './status-badge'
import type { Novel } from '../types'

interface NovelTableRowProps {
  novel: Novel
  onEdit: (novel: Novel) => void
  onDelete: (id: string, title: string) => void
  onManageChapters: (novelId: string) => void
}

export const NovelTableRow = ({
  novel,
  onEdit,
  onDelete,
  onManageChapters,
}: NovelTableRowProps) => {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors">
      <td className="py-3 px-4">
        {novel.coverUrl ? (
          <img
            src={novel.coverUrl}
            alt={novel.title}
            className="w-12 h-16 object-cover rounded-lg border border-white/10 shadow-sm"
          />
        ) : (
          <div className="w-12 h-16 bg-[#0a0b10] border border-white/10 rounded-lg flex items-center justify-center text-xs text-slate-500">
            No cover
          </div>
        )}
      </td>
      <td className="py-3 px-4">
        <div className="font-bold text-white max-w-xs truncate">{novel.title}</div>
        <div className="text-xs text-slate-500 mt-0.5 max-w-xs truncate">{novel.slug}</div>
      </td>
      <td className="py-3 px-4 text-slate-300 font-medium">{novel.authorName}</td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1 max-w-xs">
          {novel.categories && novel.categories.length > 0 ? (
            novel.categories.map((c) => (
              <span
                key={c.category.id}
                className="px-2 py-0.5 text-[11px] bg-white/5 border border-white/10 text-slate-300 rounded-md"
              >
                {c.category.name}
              </span>
            ))
          ) : (
            <span className="text-slate-500 text-xs">-</span>
          )}
        </div>
      </td>
      <td className="py-3 px-4 text-slate-300 font-semibold">{novel._count?.chapters ?? 0}</td>
      <td className="py-3 px-4">
        <StatusBadge status={novel.status} />
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => onManageChapters(novel.id)}
            title="Quản lý các chương"
            className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
            <span>Chương</span>
          </button>
          <button
            onClick={() => onEdit(novel)}
            title="Chỉnh sửa truyện"
            className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-semibold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
            onClick={() => onDelete(novel.id, novel.title)}
            title="Xóa truyện"
            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-semibold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
