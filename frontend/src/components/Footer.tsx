import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 mt-auto border-top w-100" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color) !important' }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <span className="fw-bold fs-5 text-white">Novelis</span>
            <p className="text-muted mb-0 small">Nền tảng đọc truyện chữ trực tuyến cao cấp và mượt mà.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0 text-muted small">
              &copy; {currentYear} Novelis. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;