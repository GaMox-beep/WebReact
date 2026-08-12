import { Link, useNavigate } from 'react-router-dom'
import { LoginForm } from '../../features/auth/components/login-form'
import { paths } from '../../config/paths'

export const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center py-12 px-4 min-h-[80vh]">
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-lg p-6 sm:p-8 transition-colors">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full mb-3 bg-amber-500/10 border border-amber-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" x2="3" y1="12" y2="12" />
            </svg>
          </div>
          <h3 className="font-bold text-xl mb-1 text-[var(--text-primary)]">Đăng Nhập</h3>
          <p className="text-[var(--text-secondary)] text-xs">Chào mừng bạn quay trở lại với Novelis</p>
        </div>

        {/* Reusable Login Form */}
        <LoginForm onSuccess={() => navigate(paths.home.getHref())} />

        {/* Footer Link */}
        <div className="text-center mt-6 pt-4 border-t border-[var(--border-color)]">
          <span className="text-[var(--text-secondary)] text-xs">Chưa có tài khoản? </span>
          <Link to={paths.auth.register.getHref()} className="text-xs text-amber-500 hover:underline font-semibold">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
