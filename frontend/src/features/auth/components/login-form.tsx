import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useLogin } from '../api/login'
import type { AuthResponse } from '../types'

interface LoginFormProps {
  onSuccess?: (data: AuthResponse) => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setUser, setAccessToken } = useAuth()
  const loginMutation = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const data = await loginMutation.mutateAsync({ email, password })
      setUser(data.user)
      setAccessToken(data.accessToken)
      onSuccess?.(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng nhập thất bại'
      setError(msg)
    }
  }

  return (
    <div>
      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-medium text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[var(--text-secondary)] text-xs font-medium">Mật khẩu</label>
            <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-[var(--text-secondary)] hover:text-amber-500 transition-colors">
              Quên mật khẩu?
            </a>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-[var(--text-muted)] pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-lg pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
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

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-2.5 font-semibold text-black bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors mt-2 disabled:opacity-50 text-sm"
        >
          {loginMutation.isPending ? 'Đang xử lý...' : 'Đăng Nhập'}
        </button>
      </form>
    </div>
  )
}
