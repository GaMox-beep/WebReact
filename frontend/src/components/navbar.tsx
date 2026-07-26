import { Container, Navbar, Nav, Form, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="navbar-glass sticky-top py-2.5 mb-4" variant="dark">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4 d-flex align-items-center gap-2 text-white me-lg-4">
          <div className="d-flex align-items-center justify-content-center p-1.5 rounded-3" style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.4))' }}
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </div>
          <span style={{ letterSpacing: '-0.03em' }}>Novelis</span>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="novelis-navbar-nav" className="border-0 shadow-none p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Navbar.Toggle>

        {/* Navbar Collapse */}
        <Navbar.Collapse id="novelis-navbar-nav" className="justify-content-between align-items-center mt-3 mt-lg-0">
          {/* Central Search Bar */}
          <div className="search-container mx-lg-auto my-2 my-lg-0">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Tìm kiếm tên truyện, tác giả..."
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

          {/* Main Navigation Links */}
          <Nav className="align-items-lg-center gap-1 my-2 my-lg-0">
            <Nav.Link as={NavLink} to="/" end className="nav-link-custom d-flex align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Trang Chủ
            </Nav.Link>

            {/* Thể loại Dropdown Preview */}
            <NavDropdown
              title={
                <span className="d-inline-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                  Thể Loại
                </span>
              }
              id="category-dropdown"
              className="nav-link-custom-dropdown"
            >
              <NavDropdown.Item href="#tiem-hiep" onClick={(e) => e.preventDefault()}>Tiên Hiệp</NavDropdown.Item>
              <NavDropdown.Item href="#huyen-huyen" onClick={(e) => e.preventDefault()}>Huyền Huyễn</NavDropdown.Item>
              <NavDropdown.Item href="#do-thi" onClick={(e) => e.preventDefault()}>Đô Thị</NavDropdown.Item>
              <NavDropdown.Item href="#khoa-hoc" onClick={(e) => e.preventDefault()}>Khoa Huyễn</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#all" onClick={(e) => e.preventDefault()}>Tất Cả Thể Loại</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/top-truyen" className="nav-link-custom d-flex align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                <path d="M12 2a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
              </svg>
              Top Truyện
            </Nav.Link>

            <Nav.Link as={NavLink} to="/nap" className="nav-link-accent d-flex align-items-center gap-2 mx-lg-1 my-1 my-lg-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Nạp Linh Thạch
            </Nav.Link>

            {/* Auth Actions Group */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0 pt-3 pt-lg-0 border-top border-secondary border-opacity-10 border-lg-0 w-100 w-lg-auto">
              <Nav.Link as={NavLink} to="/login" className="btn btn-premium-outline px-3 py-1.5 w-50 w-lg-auto text-center">
                Đăng Nhập
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" className="btn btn-premium-gold px-3 py-1.5 w-50 w-lg-auto text-center">
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