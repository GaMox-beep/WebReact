import type { Novel } from '../types'
import { StatusBadge } from './status-badge'

interface NovelDetailHeaderProps {
  novel: Novel
}

export const NovelDetailHeader = ({ novel }: NovelDetailHeaderProps) => {
  const chapterCount = novel.chapters?.length ?? (novel._count?.chapters ?? 0)
  const firstChapter = novel.chapters?.[0]

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-sm transition-colors">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
        {/* Cover Image (2:3 Aspect Ratio) */}
        <div className="w-48 sm:w-56 aspect-[2/3] bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-md shrink-0">
          {novel.coverUrl ? (
            <img
              src={novel.coverUrl}
              alt={novel.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-muted)] p-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2 opacity-40"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
              <span className="text-xs">Chưa có ảnh bìa</span>
            </div>
          )}
        </div>

        {/* Text Information & Stats */}
        <div className="flex-1 flex flex-col justify-between space-y-4 text-center md:text-left w-full">
          <div className="space-y-2.5">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {novel.title}
            </h1>

            {/* Author */}
            <p className="text-sm text-[var(--text-secondary)] font-medium flex items-center justify-center md:justify-start gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Tác giả: <strong className="text-[var(--text-primary)]">{novel.authorName}</strong></span>
            </p>

            {/* Badges: Status & Categories */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              {/* Status Badge */}
              <StatusBadge status={novel.status} />

              {/* Categories */}
              {novel.categories?.map((c) => (
                <span
                  key={c.category.id}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                >
                  {c.category.name}
                </span>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-center md:justify-start gap-6 pt-3 text-sm text-[var(--text-secondary)] border-t border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">★ {novel.rating?.toFixed(1) || '5.0'}</span>
                <span className="text-xs text-[var(--text-muted)]">Đánh giá</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[var(--text-primary)] font-bold">{chapterCount}</span>
                <span className="text-xs text-[var(--text-muted)]">Chương</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[var(--text-primary)] font-bold">{novel.views.toLocaleString('vi-VN')}</span>
                <span className="text-xs text-[var(--text-muted)]">Lượt xem</span>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
            <button
              type="button"
              disabled={!firstChapter}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{firstChapter ? 'Đọc Từ Đầu' : 'Chưa có chương'}</span>
            </button>

            <button
              type="button"
              className="px-5 py-2.5 bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              <span>Lưu Vào Tủ Truyện</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
