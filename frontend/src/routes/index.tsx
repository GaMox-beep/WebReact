import { Routes } from 'react-router-dom'
import CustomerRoutes from './CustomerRoutes'
import AdminRoutes from './AdminRoutes'

export const AppRoutes = () => {
  return (
    <Routes>
      {CustomerRoutes}
      {AdminRoutes}
    </Routes>
  )
}

export default AppRoutes
