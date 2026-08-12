export const NovelCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden animate-pulse">
      {/* 2:3 Aspect Ratio Image Skeleton */}
      <div className="w-full aspect-[2/3] bg-[var(--bg-surface-elevated)] relative">
        <div className="absolute top-2 left-2 w-14 h-5 rounded-md bg-[var(--bg-surface-hover)]" />
      </div>

      {/* Content Skeleton */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        {/* Title */}
        <div className="h-4 bg-[var(--bg-surface-elevated)] rounded-md w-4/5" />
        <div className="h-4 bg-[var(--bg-surface-elevated)] rounded-md w-3/5" />

        {/* Author */}
        <div className="h-3 bg-[var(--bg-surface-elevated)] rounded-md w-1/2 mt-1" />

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-[var(--border-color)]">
          <div className="h-3 bg-[var(--bg-surface-elevated)] rounded w-12" />
          <div className="h-3 bg-[var(--bg-surface-elevated)] rounded w-12" />
        </div>
      </div>
    </div>
  )
}
