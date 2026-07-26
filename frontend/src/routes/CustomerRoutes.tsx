import { Route } from 'react-router-dom'
import CustomerLayout from '../layout/CustomerLayout'
import Home from '../pages/customer/Home'
import TopNovels from '../pages/customer/TopNovels'
import Recharge from '../pages/customer/Recharge'
import Login from '../pages/customer/Login'
import Register from '../pages/customer/Register'

export const CustomerRoutes = (
  <Route element={<CustomerLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/top-truyen" element={<TopNovels />} />
    <Route path="/nap" element={<Recharge />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Route>
)

export default CustomerRoutes
