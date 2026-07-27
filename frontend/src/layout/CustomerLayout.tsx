import { Outlet } from 'react-router-dom'
import NavbarComponent from '../components/Navbar'
import FooterComponent from '../components/Footer'

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors">
      <NavbarComponent />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  )
}

export default CustomerLayout
