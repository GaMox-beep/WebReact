import { Link } from 'react-router-dom'
import { paths } from '../../../config/paths'

interface ChapterItem {
  id: string
  chapterNumber: number
  title: string
  isVip?: boolean
  price?: number
  views?: number
  createdAt?: string
}

interface NovelChapterListProps {
  chapters: ChapterItem[]
  novelSlug?: string
}

export const NovelChapterList = ({ chapters, novelSlug }: NovelChapterListProps) => {
  if (!chapters || chapters.length === 0) {
    return (
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-8 text-center">
        <p className="text-sm text-[var(--text-secondary)]">Bộ truyện này hiện chưa có chương nào được xuất bản.</p>
      </div>
    )
  }

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 space-y-4 transition-colors">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
        <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
          Danh Sách Chương
        </h3>
        <span className="text-xs text-[var(--text-muted)] font-medium">
          Tổng cộng {chapters.length} chương
        </span>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
        {chapters.map((chap) => {
          const content = (
            <div
              className="group flex items-center justify-between p-3 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] hover:border-amber-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span className="text-xs font-semibold text-amber-500 shrink-0">
                  #{chap.chapterNumber}
                </span>
                <span className="text-xs font-medium text-[var(--text-primary)] group-hover:text-amber-400 transition-colors truncate">
                  {chap.title || `Chương ${chap.chapterNumber}`}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {chap.isVip && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    VIP
                  </span>
                )}
                {chap.createdAt && (
                  <span className="text-[11px] text-[var(--text-muted)] hidden lg:inline">
                    {new Date(chap.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                )}
              </div>
            </div>
          )

          if (novelSlug) {
            return (
              <Link
                key={chap.id}
                to={paths.novels.chapter.getHref(novelSlug, chap.chapterNumber)}
                className="block"
              >
                {content}
              </Link>
            )
          }

          return <div key={chap.id}>{content}</div>
        })}
      </div>
    </div>
  )
}
