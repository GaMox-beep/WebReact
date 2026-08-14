import { useParams, Link } from 'react-router-dom'
import { useNovel } from '../../features/novels/api/get-novel'
import { NovelDetailHeader } from '../../features/novels/components/novel-detail-header'
import { NovelChapterList } from '../../features/novels/components/novel-chapter-list'
import { NovelDetailSkeleton } from '../../features/novels/components/novel-detail-skeleton'
import { paths } from '../../config/paths'

export const NovelDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: novel, isLoading, error } = useNovel(slug || '')

  if (isLoading) {
    return <NovelDetailSkeleton />
  }

  if (error || !novel) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-12 shadow-sm">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Không Tìm Thấy Truyện</h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            Bộ truyện bạn đang tìm kiếm có thể đã bị đổi tên, tạm ẩn hoặc không tồn tại trên hệ thống.
          </p>
          <Link
            to={paths.home.getHref()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm rounded-xl transition-all shadow-sm"
          >
            ← Quay Lại Trang Chủ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link to={paths.home.getHref()} className="hover:text-[var(--text-primary)] transition-colors">
          Trang Chủ
        </Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)] truncate max-w-[200px] sm:max-w-xs">{novel.title}</span>
      </nav>

      {/* Novel Header Info Component */}
      <NovelDetailHeader novel={novel} />

      {/* Description Content Box */}
      <section className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 space-y-3 transition-colors shadow-sm">
        <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
          Giới Thiệu Truyện
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
          {novel.description || 'Chưa có thông tin tóm tắt cho bộ truyện này.'}
        </p>
      </section>

      {/* Chapter List Component */}
      <NovelChapterList chapters={novel.chapters || []} novelSlug={novel.slug} />
    </div>
  )
}

export default NovelDetailPage
