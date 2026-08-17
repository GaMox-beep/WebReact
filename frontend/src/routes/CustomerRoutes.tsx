import { Route } from 'react-router-dom'
import CustomerLayout from '../layout/CustomerLayout'
import { HomePage } from './landing/home-page'
import { TopNovelsPage } from './landing/top-novels-page'
import { RechargePage } from './user/recharge-page'
import { PaymentResultPage } from './user/payment-result-page'
import { LoginPage } from './auth/login-page'
import { RegisterPage } from './auth/register-page'
import { GoogleOAuthCallbackPage } from './auth/google-oauth-callback-page'
import { ProfilePage } from './user/profile-page'
import { NovelDetailPage } from './novels/novel-detail-page'
import { ChapterReaderPage } from './novels/chapter-reader-page'
import { NovelsByCategoryPage } from './novels/novels-by-category-page'
import { paths } from '../config/paths'

export const CustomerRoutes = (
  <Route element={<CustomerLayout />}>
    <Route path={paths.home.path} element={<HomePage />} />
    <Route path={paths.novels.categories.path} element={<NovelsByCategoryPage />} />
    <Route path={paths.novels.top.path} element={<TopNovelsPage />} />
    <Route path={paths.novels.detail.path} element={<NovelDetailPage />} />
    <Route path={paths.novels.chapter.path} element={<ChapterReaderPage />} />
    <Route path={paths.payments.recharge.path} element={<RechargePage />} />
    <Route path={paths.payments.result.path} element={<PaymentResultPage />} />
    <Route path={paths.auth.login.path} element={<LoginPage />} />
    <Route path={paths.auth.register.path} element={<RegisterPage />} />
    <Route path={paths.auth.googleCallback.path} element={<GoogleOAuthCallbackPage />} />
    <Route path={paths.users.profile.path} element={<ProfilePage />} />
  </Route>
)

export default CustomerRoutes