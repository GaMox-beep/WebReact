import { Outlet } from 'react-router-dom'
import NavbarComponent from '../components/Navbar'
import FooterComponent from '../components/Footer'

const CustomerLayout = () => {
  return (
    <main className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <FooterComponent />
    </main>
  )
}

export default CustomerLayout
