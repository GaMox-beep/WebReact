import { Link } from 'react-router-dom'
import { paths } from '../../../config/paths'
import type { ChapterDetailResponse } from '../types'

interface ChapterReaderHeaderProps {
  chapter: ChapterDetailResponse
}

export const ChapterReaderHeader = ({ chapter }: ChapterReaderHeaderProps) => {
  const { novel } = chapter

  return (
    <header className="space-y-4 pb-6 border-b border-[var(--border-color)]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-[var(--text-muted)]">
        <Link
          to={paths.home.getHref()}
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          Trang Chủ
        </Link>
        <span>/</span>
        <Link
          to={paths.novels.detail.getHref(novel.slug)}
          className="hover:text-[var(--text-primary)] transition-colors max-w-[200px] truncate"
        >
          {novel.title}
        </Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)] font-medium">
          Chương {chapter.chapterNumber}
        </span>
      </nav>

      {/* Chapter & Novel Titles */}
      <div className="text-center space-y-2 pt-2">
        <Link
          to={paths.novels.detail.getHref(novel.slug)}
          className="inline-block text-sm font-semibold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors"
        >
          {novel.title}
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
          {chapter.title?.toLowerCase().startsWith('chương')
            ? chapter.title
            : `Chương ${chapter.chapterNumber}${chapter.title ? `: ${chapter.title}` : ''}`}
        </h1>

        {/* Metadata */}
        <div className="flex items-center justify-center flex-wrap gap-3 text-xs text-[var(--text-muted)] pt-1">
          <span>Tác giả: <strong className="text-[var(--text-secondary)]">{novel.authorName}</strong></span>
          <span>•</span>
          <span>{chapter.views} lượt xem</span>
          {chapter.createdAt && (
            <>
              <span>•</span>
              <span>Cập nhật: {new Date(chapter.createdAt).toLocaleDateString('vi-VN')}</span>
            </>
          )}
          {chapter.isVip && (
            <>
              <span>•</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                VIP
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
