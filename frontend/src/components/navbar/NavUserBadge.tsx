import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { paths } from '../../config/paths'

export const NavUserBadge = () => {
  const { user, isAuthenticated, logout } = useAuth()

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2 w-full lg:w-auto">
        <NavLink
          to={paths.users.profile.getHref()}
          className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-nav-elevated)] border border-[var(--border-nav)] hover:border-amber-500/50 rounded-xl text-xs text-[var(--text-nav-primary)] transition-all group"
        >
          <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black flex items-center justify-center font-bold text-xs transition-colors">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold max-w-[100px] truncate">{user.username}</span>
          <span className="text-amber-400 font-medium flex items-center gap-1 pl-1 border-l border-[var(--border-nav)]">
            🪙 {user.coins}
          </span>
        </NavLink>

        <button
          type="button"
          onClick={logout}
          className="px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg whitespace-nowrap transition-all"
        >
          Đăng Xuất
        </button>
      </div>
    )
  }

  return (
    <>
      <NavLink
        to={paths.auth.login.getHref()}
        className="flex-1 lg:flex-none text-center px-4 py-2 text-sm font-medium text-[var(--text-nav-primary)] bg-transparent border border-[var(--border-nav)] hover:bg-[var(--bg-nav-hover)] rounded-lg whitespace-nowrap transition-all"
      >
        Đăng Nhập
      </NavLink>
      <NavLink
        to={paths.auth.register.getHref()}
        className="flex-1 lg:flex-none text-center px-4 py-2 text-sm font-semibold text-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-lg whitespace-nowrap shadow-md shadow-amber-500/20 transition-all"
      >
        Đăng Ký
      </NavLink>
    </>
  )
}
