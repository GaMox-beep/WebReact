import { Route } from 'react-router-dom'
import CustomerLayout from '../layout/CustomerLayout'
import { HomePage } from './landing/home-page'
import { TopNovelsPage } from './landing/top-novels-page'
import { RechargePage } from './user/recharge-page'
import { LoginPage } from './auth/login-page'
import { RegisterPage } from './auth/register-page'
import { ProfilePage } from './user/profile-page'
import { NovelDetailPage } from './novels/novel-detail-page'
import { paths } from '../config/paths'

export const CustomerRoutes = (
  <Route element={<CustomerLayout />}>
    <Route path={paths.home.path} element={<HomePage />} />
    <Route path={paths.novels.top.path} element={<TopNovelsPage />} />
    <Route path={paths.novels.detail.path} element={<NovelDetailPage />} />
    <Route path={paths.payments.recharge.path} element={<RechargePage />} />
    <Route path={paths.auth.login.path} element={<LoginPage />} />
    <Route path={paths.auth.register.path} element={<RegisterPage />} />
    <Route path={paths.users.profile.path} element={<ProfilePage />} />
  </Route>
)

export default CustomerRoutes
