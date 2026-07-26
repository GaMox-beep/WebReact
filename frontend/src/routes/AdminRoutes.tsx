import { Route } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import { AdminDashboardPage } from '../features/admin'
import ProtectedRoute from './ProtectedRoute'

export const AdminRoutes = (
  <Route element={<ProtectedRoute redirectPath="/" />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/novels" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<AdminDashboardPage />} />
      <Route path="/admin/chapters" element={<AdminDashboardPage />} />
    </Route>
  </Route>
)

export default AdminRoutes
