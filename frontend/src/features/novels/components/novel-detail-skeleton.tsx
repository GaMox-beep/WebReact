export const NovelDetailSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-pulse">
      {/* Header Info Skeleton */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Cover Skeleton */}
        <div className="w-48 sm:w-56 aspect-[2/3] bg-[var(--bg-surface-elevated)] rounded-xl shrink-0 mx-auto md:mx-0" />

        {/* Text Info Skeleton */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Title */}
            <div className="h-7 bg-[var(--bg-surface-elevated)] rounded-lg w-3/4" />
            
            {/* Author */}
            <div className="h-4 bg-[var(--bg-surface-elevated)] rounded-md w-1/3" />

            {/* Badges */}
            <div className="flex items-center gap-2 pt-1">
              <div className="h-6 w-20 bg-[var(--bg-surface-elevated)] rounded-md" />
              <div className="h-6 w-24 bg-[var(--bg-surface-elevated)] rounded-md" />
              <div className="h-6 w-16 bg-[var(--bg-surface-elevated)] rounded-md" />
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 pt-3">
              <div className="h-4 w-24 bg-[var(--bg-surface-elevated)] rounded" />
              <div className="h-4 w-24 bg-[var(--bg-surface-elevated)] rounded" />
            </div>
          </div>

          {/* Action Button Skeleton */}
          <div className="pt-4 flex items-center gap-3">
            <div className="h-11 w-36 bg-[var(--bg-surface-elevated)] rounded-xl" />
            <div className="h-11 w-36 bg-[var(--bg-surface-elevated)] rounded-xl" />
          </div>
        </div>
      </div>

      {/* Description Box Skeleton */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 space-y-3">
        <div className="h-5 bg-[var(--bg-surface-elevated)] rounded-md w-32" />
        <div className="h-4 bg-[var(--bg-surface-elevated)] rounded-md w-full" />
        <div className="h-4 bg-[var(--bg-surface-elevated)] rounded-md w-5/6" />
        <div className="h-4 bg-[var(--bg-surface-elevated)] rounded-md w-4/6" />
      </div>

      {/* Chapter List Skeleton */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 space-y-3">
        <div className="h-5 bg-[var(--bg-surface-elevated)] rounded-md w-40" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 bg-[var(--bg-surface-elevated)] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
