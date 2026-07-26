import { Route } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import AdminDashboard from '../pages/admin/Dashboard'
import ProtectedRoute from './ProtectedRoute'

export const AdminRoutes = (
  <Route element={<ProtectedRoute redirectPath="/" />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/novels" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminDashboard />} />
      <Route path="/admin/chapters" element={<AdminDashboard />} />
    </Route>
  </Route>
)

export default AdminRoutes
