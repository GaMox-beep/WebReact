import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-secondary w-100">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <span className="fw-bold fs-5 text-white">React App</span>
            <p className="text-muted mb-0 small">Building better interfaces, together.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0 text-muted small">
              &copy; {currentYear} All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;