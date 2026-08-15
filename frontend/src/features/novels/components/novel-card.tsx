import { Link } from 'react-router-dom'
import { paths } from '../../../config/paths'
import type { Novel } from '../types'

interface NovelCardProps {
  novel: Novel
}

export const NovelCard = ({ novel }: NovelCardProps) => {
  const chapterCount = novel._count?.chapters ?? 0
  const mainCategory = novel.categories?.[0]?.category

  return (
    <Link
      to={paths.novels.detail.getHref(novel.slug)}
      className="group flex flex-col bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-gold)] rounded-xl overflow-hidden transition-colors duration-150"
    >
      {/* Cover Image Container (2:3 Aspect Ratio) */}
      <div className="relative w-full aspect-[2/3] bg-[var(--bg-surface-elevated)] overflow-hidden">
        {novel.coverUrl ? (
          <img
            src={novel.coverUrl}
            alt={novel.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-muted)] p-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-1 opacity-50"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
            <span className="text-[11px]">Chưa có bìa</span>
          </div>
        )}

        {/* Status Badge Overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-1">
          {novel.status === 'COMPLETED' ? (
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-blue-600/90 text-white backdrop-blur-xs">
              Hoàn thành
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-600/90 text-white backdrop-blur-xs">
              Đang ra
            </span>
          )}
        </div>

        {/* Category Tag Overlay (Bottom Right) */}
        {mainCategory && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-medium rounded bg-black/60 text-slate-200 backdrop-blur-xs border border-white/10">
            {mainCategory.name}
          </span>
        )}
      </div>

      {/* Novel Information Body */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-1.5">
        <div>
          {/* Title (2 lines max) */}
          <h4 className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors line-clamp-2 leading-snug">
            {novel.title}
          </h4>

          {/* Author Name */}
          <p className="text-xs text-[var(--text-secondary)] mt-1 truncate flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 opacity-70"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="truncate">{novel.authorName}</span>
          </p>
        </div>

        {/* Footer Stats: Chapter Count & Views */}
        <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)] mt-1">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            {chapterCount} chương
          </span>

          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {novel.views.toLocaleString('vi-VN')}
          </span>
        </div>
      </div>
    </Link>
  )
}
