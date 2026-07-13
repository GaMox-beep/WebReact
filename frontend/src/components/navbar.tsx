import { Container, Navbar, Nav, Form } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="navbar-glass sticky-top py-2 mb-4" variant="dark">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4 d-flex align-items-center gap-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.3))' }}
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
          <span style={{ letterSpacing: '-0.03em' }}>Novelis</span>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="novelis-navbar-nav" className="border-0 shadow-none" />

        {/* Navbar Collapse */}
        <Navbar.Collapse id="novelis-navbar-nav" className="justify-content-between align-items-center">
          {/* Central Search Bar */}
          <div className="search-container mx-auto my-2 my-lg-0">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Tìm kiếm truyện..."
                className="search-input"
                aria-label="Search"
              />
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
              </svg>
            </Form>
          </div>

          {/* Navigation Links */}
          <Nav className="align-items-center gap-1">
            <Nav.Link as={NavLink} to="/" className="nav-link-custom d-flex align-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Trang Chủ
            </Nav.Link>

            <Nav.Link as={NavLink} to="/top-truyen" className="nav-link-custom d-flex align-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                <path d="M12 2a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
              </svg>
              Top Truyện
            </Nav.Link>

            <Nav.Link as={NavLink} to="/nap" className="nav-link-custom nav-link-accent d-flex align-items-center gap-2 me-lg-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Nạp Linh Thạch
            </Nav.Link>

            {/* Auth Buttons */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0 pt-2 pt-lg-0 border-top border-secondary border-lg-0 w-100 w-lg-auto justify-content-center">
              <Nav.Link as={NavLink} to="/login" className="btn btn-premium-outline px-3 py-1.5 w-100 w-lg-auto">
                Đăng Nhập
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" className="btn btn-premium-solid px-3 py-1.5 w-100 w-lg-auto">
                Đăng Ký
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent