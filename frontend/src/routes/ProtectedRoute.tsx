import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  redirectPath?: string
}

const ProtectedRoute = ({ redirectPath = '/' }: ProtectedRouteProps) => {
  // Check admin role from localStorage or mock auth state
  // Currently defaults to true for preview/development unless explicitly restricted
  const userRole = localStorage.getItem('user_role') ?? 'ADMIN'
  const isAdmin = userRole === 'ADMIN'

  if (!isAdmin) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
