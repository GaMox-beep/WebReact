import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { customerNavItems } from '../config/navigation'
import { paths } from '../config/paths'
import { renderNavIcon } from './navbar/NavIcons'
import { NavSearchInput } from './navbar/NavSearchInput'
import { NavCategoryDropdown } from './navbar/NavCategoryDropdown'
import { NavThemeToggle } from './navbar/NavThemeToggle'
import { NavUserBadge } from './navbar/NavUserBadge'

export const NavbarComponent = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-nav)] backdrop-blur-md border-b border-[var(--border-nav)] py-3 mb-6 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <NavLink to={paths.home.getHref()} className="flex items-center gap-2 text-[var(--text-nav-primary)] font-bold text-xl whitespace-nowrap">
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
          className="lg:hidden p-2 text-[var(--text-nav-secondary)] hover:text-[var(--text-nav-primary)] focus:outline-none"
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
          <NavSearchInput />

          {/* Main Navigation Links */}
          <nav className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto">
            {customerNavItems.map((item) => {
              if (item.id === 'categories') {
                return <NavCategoryDropdown key={item.id} label={item.label} icon={item.icon} />
              }

              const isAccent = item.isAccent

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === paths.home.getHref()}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all w-full lg:w-auto ${isAccent
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-semibold'
                      : isActive
                        ? 'text-[var(--text-nav-primary)] bg-[var(--bg-nav-elevated)] font-semibold'
                        : 'text-[var(--text-nav-secondary)] hover:text-[var(--text-nav-primary)] hover:bg-[var(--bg-nav-hover)]'
                    }`
                  }
                >
                  {renderNavIcon(item.icon)}
                  {item.label}
                </NavLink>
              )
            })}

            {/* Admin Shortcut Link if user.role === 'ADMIN' */}
            {user?.role === 'ADMIN' && (
              <NavLink
                to={paths.admin.dashboard.getHref()}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all w-full lg:w-auto ${
                    isActive
                      ? 'text-[var(--text-nav-primary)] bg-[var(--bg-nav-elevated)] font-semibold'
                      : 'text-[var(--text-nav-secondary)] hover:text-[var(--text-nav-primary)] hover:bg-[var(--bg-nav-hover)]'
                  }`
                }
              >
                Quản Trị
              </NavLink>
            )}

            {/* Auth Actions + Theme Switcher */}
            <div className="flex items-center gap-2 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-[var(--border-nav)]">
              <NavThemeToggle />
              <NavUserBadge />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NavbarComponent