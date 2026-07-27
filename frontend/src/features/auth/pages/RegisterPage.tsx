import { useState } from 'react'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="flex justify-center items-center py-12 px-4 min-h-[85vh]">
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] border-t-2 border-t-amber-500 rounded-2xl shadow-2xl p-6 sm:p-8 transition-colors">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full mb-3 bg-amber-500/10 border border-amber-500/20 shadow-lg shadow-amber-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
          </div>
          <h3 className="font-bold text-2xl mb-1 text-[var(--text-primary)]">Tạo Tài Khoản</h3>
          <p className="text-[var(--text-secondary)] text-sm">Đăng ký để lưu truyện yêu thích và tham gia bình luận</p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-[var(--text-secondary)] text-xs font-medium mb-1">Tên người dùng / Biệt danh</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[var(--text-muted)] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                autoComplete="username"
                className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[var(--text-secondary)] text-xs font-medium mb-1">Địa chỉ Email</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[var(--text-muted)] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[var(--text-secondary)] text-xs font-medium mb-1">Mật khẩu</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[var(--text-muted)] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Tối thiểu 6 ký tự"
                autoComplete="new-password"
                className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              <button
                type="button"
                className="absolute right-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[var(--text-secondary)] text-xs font-medium mb-1">Xác nhận mật khẩu</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[var(--text-muted)] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 12 2 2 4-4" />
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                autoComplete="new-password"
                className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              <button
                type="button"
                className="absolute right-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="termsAgreement"
              className="rounded bg-[var(--bg-surface-elevated)] border-[var(--border-color)] text-amber-500 focus:ring-amber-500/20 cursor-pointer"
            />
            <label htmlFor="termsAgreement" className="text-[var(--text-secondary)] text-xs cursor-pointer select-none">
              Tôi đồng ý với <a href="#terms" onClick={(e) => e.preventDefault()} className="text-amber-500 hover:underline">Điều khoản dịch vụ</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl shadow-lg shadow-amber-500/20 transition-all mt-2"
          >
            Tạo Tài Khoản
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 pt-4 border-t border-[var(--border-color)]">
          <span className="text-[var(--text-secondary)] text-xs">Đã có tài khoản? </span>
          <Link to="/login" className="text-xs text-amber-500 hover:underline font-semibold">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
