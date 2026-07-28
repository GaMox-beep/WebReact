import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { customerNavItems } from '../menu-items/customerMenu'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const renderIcon = (iconName?: string) => {
  switch (iconName) {
    case 'home':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case 'grid':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      )
    case 'trophy':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
          <path d="M12 2a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        </svg>
      )
    case 'coins':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="2" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    default:
      return null
  }
}

const NavbarComponent = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-nav)] backdrop-blur-md border-b border-[var(--border-color)] py-3 mb-6 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-xl whitespace-nowrap">
          <div className="flex items-center justify-center p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </div>
          <span className="tracking-tight">Novelis</span>
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

        {/* Navbar Content */}
        <div className={`${isMobileOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center justify-between w-full lg:w-auto flex-1 gap-4`}>
          {/* Central Search Bar */}
          <div className="relative w-full lg:w-72 mx-auto">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                placeholder="Tìm kiếm tên truyện, tác giả..."
                className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
              </svg>
            </form>
          </div>

          {/* Main Navigation Links */}
          <nav className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto">
            {customerNavItems.map((item) => {
              if (item.id === 'categories') {
                return (
                  <div key={item.id} className="relative w-full lg:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] rounded-lg whitespace-nowrap w-full lg:w-auto justify-between lg:justify-start transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {renderIcon(item.icon)}
                        {item.label}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="static lg:absolute left-0 mt-2 w-full lg:w-48 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-2xl p-2 z-50">
                        <a href="#tiem-hiep" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-amber-500 hover:bg-amber-500/10 rounded-lg">Tiên Hiệp</a>
                        <a href="#huyen-huyen" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-amber-500 hover:bg-amber-500/10 rounded-lg">Huyền Huyễn</a>
                        <a href="#do-thi" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-amber-500 hover:bg-amber-500/10 rounded-lg">Đô Thị</a>
                        <a href="#khoa-hoc" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-amber-500 hover:bg-amber-500/10 rounded-lg">Khoa Huyễn</a>
                        <div className="border-t border-[var(--border-color)] my-1"></div>
                        <a href="#all" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-amber-500 hover:bg-amber-500/10 rounded-lg font-medium">Tất Cả Thể Loại</a>
                      </div>
                    )}
                  </div>
                )
              }

              const isAccent = item.isAccent

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all w-full lg:w-auto ${
                      isAccent
                        ? 'text-amber-500 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500 hover:text-black hover:border-amber-500'
                        : isActive
                        ? 'text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                    }`
                  }
                >
                  {renderIcon(item.icon)}
                  {item.label}
                </NavLink>
              )
            })}

            {/* Auth Actions + Theme Switcher */}
            <div className="flex items-center gap-2 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-[var(--border-color)]">
              {/* Theme Switcher Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] rounded-lg transition-all"
                title={theme === 'dark' ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </button>

              {/* Conditional Auth Rendering */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2 w-full lg:w-auto">
                  {/* User Profile Info Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-primary)]">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold max-w-[100px] truncate">{user.username}</span>
                    <span className="text-amber-500 font-medium flex items-center gap-1 pl-1 border-l border-[var(--border-color)]">
                      🪙 {user.coins}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={logout}
                    className="px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg whitespace-nowrap transition-all"
                  >
                    Đăng Xuất
                  </button>
                </div>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="flex-1 lg:flex-none text-center px-4 py-2 text-sm font-medium text-[var(--text-primary)] bg-transparent border border-[var(--border-color)] hover:bg-[var(--bg-surface-hover)] rounded-lg whitespace-nowrap transition-all"
                  >
                    Đăng Nhập
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="flex-1 lg:flex-none text-center px-4 py-2 text-sm font-semibold text-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-lg whitespace-nowrap shadow-md shadow-amber-500/20 transition-all"
                  >
                    Đăng Ký
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NavbarComponent