import { useNovels } from '../../features/novels/api/get-novels'
import { NovelGrid } from '../../features/novels/components/novel-grid'

export const HomePage = () => {
  const { data: novelsData, isLoading, error } = useNovels({ limit: 18 })
  const novels = novelsData?.items || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8">
      {/* Subtle Welcome Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-surface)] to-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
            ✨ Nền tảng đọc truyện chữ trực tuyến
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Khám phá thế giới truyện chữ đỉnh cao cùng <span className="text-amber-500">Novelis</span>
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Hàng ngàn bộ truyện tiên hiệp, kiếm hiệp, đô thị, huyền huyễn được cập nhật liên tục mỗi ngày với giao diện tối ưu tốc độ cao.
          </p>
        </div>
      </section>

      {/* Main Section: Newly Updated Novels */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-amber-500 rounded-full" />
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              Truyện Mới Cập Nhật
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-medium">
            {novels.length > 0 ? `${novels.length} bộ truyện` : ''}
          </span>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
            Không thể tải danh sách truyện: {error instanceof Error ? error.message : 'Lỗi kết nối máy chủ'}
          </div>
        )}

        <NovelGrid novels={novels} isLoading={isLoading} />
      </section>
    </div>
  )
}

export default HomePage
