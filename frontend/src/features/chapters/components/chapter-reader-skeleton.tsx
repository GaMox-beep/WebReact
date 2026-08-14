export const ChapterReaderSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-20 bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-4 w-4 bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-4 w-32 bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-4 w-4 bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-4 w-24 bg-[var(--bg-surface-elevated)] rounded" />
      </div>

      {/* Header Info Skeleton */}
      <div className="text-center space-y-3 pb-6 border-b border-[var(--border-color)]">
        <div className="h-4 w-40 bg-[var(--bg-surface-elevated)] rounded mx-auto" />
        <div className="h-8 w-3/4 max-w-lg bg-[var(--bg-surface-elevated)] rounded mx-auto" />
        <div className="h-4 w-48 bg-[var(--bg-surface-elevated)] rounded mx-auto" />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4 pt-4">
        <div className="h-5 w-full bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-5 w-full bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-5 w-5/6 bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-5 w-full bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-5 w-4/5 bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-5 w-full bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-5 w-3/4 bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-5 w-full bg-[var(--bg-surface-elevated)] rounded" />
        <div className="h-5 w-5/6 bg-[var(--bg-surface-elevated)] rounded" />
      </div>
    </div>
  )
}
