import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow py-3 mb-4 sticky-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4 d-flex align-items-center gap-2">
          <div className="bg-primary rounded-circle" style={{ width: '12px', height: '12px' }}></div>
          React App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" className="px-3 fw-medium">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/features" className="px-3 fw-medium">Features</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="px-3 fw-medium">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent