import { Link } from 'react-router-dom'
import { NovelGrid } from './novel-grid'
import type { Novel } from '../types'

interface NovelSectionProps {
  title: string
  viewAllHref?: string
  novels: Novel[]
  isLoading?: boolean
  error?: Error | unknown
  emptyMessage?: string
  skeletonCount?: number
}

export const NovelSection = ({
  title,
  viewAllHref,
  novels,
  isLoading = false,
  error,
  emptyMessage,
  skeletonCount = 6,
}: NovelSectionProps) => {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
          {title}
        </h2>
        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1"
          >
            <span>Xem tất cả</span>
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        )}
      </div>

      {/* Error Message */}
      {Boolean(error) && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          Không thể tải danh sách truyện: {error instanceof Error ? error.message : 'Lỗi kết nối máy chủ'}
        </div>
      )}

      {/* Novel Cards Grid */}
      <NovelGrid
        novels={novels}
        isLoading={isLoading}
        skeletonCount={skeletonCount}
        emptyMessage={emptyMessage}
      />
    </section>
  )
}
