import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { paths } from '../../../config/paths'
import { useBookmarkStatus } from '../api/get-bookmark-status'
import { useToggleBookmark } from '../api/toggle-bookmark'

interface BookmarkButtonProps {
  novelId: string
  variant?: 'default' | 'compact' | 'icon'
  className?: string
}

export const BookmarkButton = ({
  novelId,
  variant = 'default',
  className = '',
}: BookmarkButtonProps) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: statusData, isLoading: isLoadingStatus } = useBookmarkStatus(
    novelId,
    isAuthenticated
  )
  const toggleMutation = useToggleBookmark(novelId)

  const isBookmarked = Boolean(statusData?.isBookmarked)
  const isPending = toggleMutation.isPending || isLoadingStatus

  const handleToggle = () => {
    if (!isAuthenticated) {
      navigate(paths.auth.login.getHref(location.pathname))
      return
    }

    toggleMutation.mutate()
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        title={isBookmarked ? 'Đã lưu trong Tủ Truyện (Bấm để xóa)' : 'Lưu vào Tủ Truyện'}
        className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${
          isBookmarked
            ? 'bg-[var(--accent-gold)] text-slate-950 border-[var(--accent-gold)] font-bold shadow-sm'
            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--accent-gold)]'
        } ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={isBookmarked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
      </button>
    )
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
          isBookmarked
            ? 'bg-[var(--accent-gold)] text-slate-950 border-[var(--accent-gold)] shadow-sm'
            : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--accent-gold)]'
        } ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={isBookmarked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
        <span>{isBookmarked ? 'Đã Lưu' : 'Lưu Truyện'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`px-4 py-2.5 rounded-xl font-semibold text-sm border transition-colors flex items-center justify-center gap-2 ${
        isBookmarked
          ? 'bg-[var(--accent-gold)] text-slate-950 border-[var(--accent-gold)] hover:opacity-90 shadow-sm'
          : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--accent-gold)]'
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={isBookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
      <span>{isBookmarked ? 'Đã Lưu Vào Tủ' : 'Lưu Vào Tủ Truyện'}</span>
    </button>
  )
}
