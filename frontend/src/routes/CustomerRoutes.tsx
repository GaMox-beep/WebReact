import { Route } from 'react-router-dom'
import CustomerLayout from '../layout/CustomerLayout'
import { HomePage, TopNovelsPage } from '../features/novels'
import { RechargePage } from '../features/payments'
import { LoginPage, RegisterPage } from '../features/auth'

export const CustomerRoutes = (
  <Route element={<CustomerLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/top-truyen" element={<TopNovelsPage />} />
    <Route path="/nap" element={<RechargePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
)

export default CustomerRoutes
