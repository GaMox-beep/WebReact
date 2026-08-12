import { Link, useNavigate } from 'react-router-dom'
import { RegisterForm } from '../../features/auth/components/register-form'
import { paths } from '../../config/paths'

export const RegisterPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center py-12 px-4 min-h-[85vh]">
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
          </div>
          <h3 className="font-bold text-xl mb-1 text-[var(--text-primary)]">Tạo Tài Khoản</h3>
          <p className="text-[var(--text-secondary)] text-xs">Đăng ký để lưu truyện yêu thích và tham gia bình luận</p>
        </div>

        {/* Reusable Register Form */}
        <RegisterForm onSuccess={() => navigate(paths.home.getHref())} />

        {/* Footer Link */}
        <div className="text-center mt-6 pt-4 border-t border-[var(--border-color)]">
          <span className="text-[var(--text-secondary)] text-xs">Đã có tài khoản? </span>
          <Link to={paths.auth.login.getHref()} className="text-xs text-amber-500 hover:underline font-semibold">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
