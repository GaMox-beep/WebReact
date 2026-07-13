import { Container, Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <Card style={{ maxWidth: '400px', width: '100%', background: 'var(--bg-surface)' }} className="p-4 shadow-lg border-0">
        <Card.Body>
          <div className="text-center mb-4">
            <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
            </div>
            <h3 className="fw-bold mb-1">Đăng Nhập</h3>
            <p className="text-muted small">Chào mừng bạn quay trở lại với Novelis</p>
          </div>

          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-secondary small fw-medium">Địa chỉ Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  color: 'white',
                  borderRadius: '8px'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <Form.Label className="text-secondary small mb-0 fw-medium">Mật khẩu</Form.Label>
                <a href="#forgot" className="small text-decoration-none" style={{ color: 'var(--text-secondary)' }}>
                  Quên mật khẩu?
                </a>
              </div>
              <Form.Control
                type="password"
                placeholder="••••••••"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  color: 'white',
                  borderRadius: '8px'
                }}
              />
            </Form.Group>

            <Button variant="light" type="submit" className="w-100 py-2 fw-semibold mb-3 btn-premium-solid">
              Đăng Nhập
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span className="text-muted small">Chưa có tài khoản? </span>
            <Link to="/register" className="small text-white text-decoration-none fw-semibold">
              Đăng ký ngay
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
