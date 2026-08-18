import { Link, useLocation } from 'react-router-dom'
import { paths } from '../../../config/paths'
import type { User } from '../../../types'

interface ChapterReaderPaywallProps {
  chapterId: string
  chapterPrice: number
  user: User | null
  isAuthenticated: boolean
  isUnlocking: boolean
  unlockError: string | null
  autoUnlock: boolean
  onToggleAutoUnlock: (enabled: boolean) => void
  onUnlock: () => void
}

export const ChapterReaderPaywall = ({
  chapterPrice,
  user,
  isAuthenticated,
  isUnlocking,
  unlockError,
  autoUnlock,
  onToggleAutoUnlock,
  onUnlock,
}: ChapterReaderPaywallProps) => {
  const location = useLocation()
  const price = chapterPrice || 5
  const userCoins = user?.coins ?? 0
  const hasEnoughCoins = userCoins >= price

  return (
    <div className="relative mt-2 pt-6 border-t border-[var(--border-color)]">
      {/* Paywall Container */}
      <div className="bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 max-w-xl mx-auto text-center space-y-5 shadow-lg">
        {/* Lock Status Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Nội Dung Chương VIP
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Chương truyện này yêu cầu{' '}
            <span className="font-bold text-[var(--accent-gold)]">{price} xu</span> để mở khóa và đọc toàn bộ nội dung.
          </p>
        </div>

        {/* Localized Error Display */}
        {unlockError && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
            {unlockError}
          </div>
        )}

        {/* State Branching */}
        {!isAuthenticated ? (
          /* State 1: Guest / Unauthenticated */
          <div className="pt-2 space-y-3">
            <Link
              to={paths.auth.login.getHref(location.pathname)}
              className="inline-flex items-center justify-center w-full px-5 py-3 bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold text-sm rounded-xl transition-all shadow-sm"
            >
              Đăng Nhập Để Mở Khóa
            </Link>
            <p className="text-xs text-[var(--text-muted)]">
              Chưa có tài khoản?{' '}
              <Link
                to={paths.auth.register.getHref(location.pathname)}
                className="text-[var(--accent-gold)] hover:underline font-semibold"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        ) : (
          /* State 2 & 3: Authenticated User */
          <div className="space-y-4 pt-1">
            {/* User Coin Balance Info */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-xs sm:text-sm">
              <span className="text-[var(--text-secondary)]">Số dư hiện tại của bạn:</span>
              <span className="font-bold text-[var(--accent-gold)]">
                {userCoins} xu
              </span>
            </div>

            {hasEnoughCoins ? (
              /* State 2: Sufficient Balance */
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onUnlock}
                  disabled={isUnlocking}
                  className="w-full px-5 py-3 bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isUnlocking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Đang Mở Khóa...</span>
                    </>
                  ) : (
                    <span>Mở Khóa Chương ({price} Xu)</span>
                  )}
                </button>

                {/* Auto-Unlock Preference (Defaulted to OFF / unchecked) */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="autoUnlockVipCheck"
                    checked={autoUnlock}
                    onChange={(e) => onToggleAutoUnlock(e.target.checked)}
                    className="w-4 h-4 accent-[var(--accent-gold)] rounded cursor-pointer"
                  />
                  <label
                    htmlFor="autoUnlockVipCheck"
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none"
                  >
                    Tự động mở khóa các chương tiếp theo
                  </label>
                </div>
              </div>
            ) : (
              /* State 3: Insufficient Balance */
              <div className="space-y-3">
                <div className="text-xs text-red-400 font-medium">
                  Bạn còn thiếu{' '}
                  <span className="font-bold">{price - userCoins} xu</span> để đọc chương này.
                </div>
                <Link
                  to={paths.payments.recharge.getHref()}
                  className="inline-flex items-center justify-center w-full px-5 py-3 bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold text-sm rounded-xl transition-all shadow-sm"
                >
                  Nạp Thêm Xu Ngay
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
