import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/customer/Home'
import TopNovels from './pages/customer/TopNovels'
import Recharge from './pages/customer/Recharge'
import Login from './pages/customer/Login'
import Register from './pages/customer/Register'
import FooterComponent from './components/footer'
import NavbarComponent from './components/navbar'

function App() {
  return (
    <main className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-truyen" element={<TopNovels />} />
          <Route path="/nap" element={<Recharge />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <FooterComponent />
    </main>
  );
}

export default App
