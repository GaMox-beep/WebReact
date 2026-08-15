import { NovelCard } from './novel-card'
import { NovelCardSkeleton } from './novel-card-skeleton'
import type { Novel } from '../types'

interface NovelGridProps {
  novels: Novel[]
  isLoading?: boolean
  skeletonCount?: number
  emptyMessage?: string
}

export const NovelGrid = ({
  novels,
  isLoading = false,
  skeletonCount = 12,
  emptyMessage = 'Hiện chưa có bộ truyện nào trong danh mục này.',
}: NovelGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <NovelCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!novels || novels.length === 0) {
    return (
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-12 text-center my-4">
        <div className="w-14 h-14 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--accent-gold)] rounded-2xl flex items-center justify-center mx-auto mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
        </div>
        <h4 className="font-semibold text-base text-[var(--text-primary)] mb-1">Chưa Có Truyện</h4>
        <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
      {novels.map((novel) => (
        <NovelCard key={novel.id} novel={novel} />
      ))}
    </div>
  )
}
