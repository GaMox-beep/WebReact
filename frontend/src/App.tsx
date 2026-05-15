import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Features from './pages/Features'
import Contact from './pages/Contact'
import FooterComponent from './components/footer'
import NavbarComponent from './components/navbar'

function App() {
  return (
    <main className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <FooterComponent />
    </main>
  );
}


export default App
