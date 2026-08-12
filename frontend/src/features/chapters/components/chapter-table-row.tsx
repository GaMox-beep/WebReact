import type { Chapter } from '../types'

interface ChapterTableRowProps {
  chapter: Chapter
  onEdit: (chapter: Chapter) => void
  onDelete: (id: string, title: string) => void
}

export const ChapterTableRow = ({
  chapter,
  onEdit,
  onDelete,
}: ChapterTableRowProps) => {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors">
      <td className="py-3 px-4 font-semibold text-amber-400">
        Chương {chapter.chapterNumber}
      </td>
      <td className="py-3 px-4 font-medium text-white max-w-sm truncate">
        {chapter.title}
      </td>
      <td className="py-3 px-4">
        {chapter.isVip ? (
          <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-md">
            VIP 🪙
          </span>
        ) : (
          <span className="px-2 py-0.5 text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-md">
            Miễn phí
          </span>
        )}
      </td>
      <td className="py-3 px-4 text-slate-400 text-xs">
        {chapter.views.toLocaleString()} lượt
      </td>
      <td className="py-3 px-4 text-slate-400 text-xs">
        {new Date(chapter.createdAt).toLocaleDateString('vi-VN')}
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => onEdit(chapter)}
            title="Sửa chương"
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
            onClick={() => onDelete(chapter.id, chapter.title)}
            title="Xóa chương"
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
