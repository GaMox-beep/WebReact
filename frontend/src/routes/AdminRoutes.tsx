import { Route } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import { AdminDashboardPage } from './admin/admin-dashboard-page'
import { AdminNovelsPage } from './admin/admin-novels-page'
import { AdminCategoriesPage } from './admin/admin-categories-page'
import { AdminChaptersPage } from './admin/admin-chapters-page'
import ProtectedRoute from './ProtectedRoute'
import { paths } from '../config/paths'

export const AdminRoutes = (
  <Route element={<ProtectedRoute redirectPath={paths.home.path} />}>
    <Route element={<AdminLayout />}>
      <Route path={paths.admin.dashboard.path} element={<AdminDashboardPage />} />
      <Route path={paths.admin.novels.path} element={<AdminNovelsPage />} />
      <Route path={paths.admin.categories.path} element={<AdminCategoriesPage />} />
      <Route path={paths.admin.users.path} element={<AdminDashboardPage />} />
      <Route path={paths.admin.chapters.path} element={<AdminChaptersPage />} />
    </Route>
  </Route>
)

export default AdminRoutes
