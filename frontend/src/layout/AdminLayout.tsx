import { Outlet, NavLink } from 'react-router-dom'
import { adminNavItems } from '../menu-items/adminMenu'

const renderAdminIcon = (iconName?: string) => {
  switch (iconName) {
    case 'dashboard':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      )
    case 'book':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      )
    case 'users':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'file-text':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
      )
    default:
      return null
  }
}

const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Admin Sidebar */}
      <aside className="d-flex flex-column p-3 border-end border-secondary border-opacity-10" style={{ width: '260px', minWidth: '260px', backgroundColor: 'var(--bg-surface)' }}>
        <div className="d-flex align-items-center gap-2 pb-3 mb-3 border-bottom border-secondary border-opacity-10">
          <div className="p-1.5 rounded-3" style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h6 className="fw-bold mb-0 text-white">Novelis Admin</h6>
            <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Quản trị hệ thống</span>
          </div>
        </div>

        <nav className="nav nav-pills flex-column gap-1">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 text-decoration-none ${
                  isActive
                    ? 'bg-warning bg-opacity-10 text-warning fw-semibold border border-warning border-opacity-25'
                    : 'text-secondary hover-white'
                }`
              }
            >
              {renderAdminIcon(item.icon)}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-3 border-top border-secondary border-opacity-10">
          <NavLink to="/" className="btn btn-premium-outline w-100 d-flex align-items-center justify-content-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" x2="5" y1="12" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Về Trang Chủ
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
