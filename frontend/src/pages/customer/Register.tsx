import { Container, Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            </div>
            <h3 className="fw-bold mb-1">Tạo Tài Khoản</h3>
            <p className="text-muted small">Đăng ký để lưu truyện yêu thích và bình luận</p>
          </div>

          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="text-secondary small fw-medium">Tên hiển thị</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyễn Văn A"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  color: 'white',
                  borderRadius: '8px'
                }}
              />
            </Form.Group>

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
              <Form.Label className="text-secondary small fw-medium">Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Tối thiểu 6 ký tự"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  color: 'white',
                  borderRadius: '8px'
                }}
              />
            </Form.Group>

            <Button variant="light" type="submit" className="w-100 py-2 fw-semibold mb-3 btn-premium-solid">
              Đăng Ký
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span className="text-muted small">Đã có tài khoản? </span>
            <Link to="/login" className="small text-white text-decoration-none fw-semibold">
              Đăng nhập
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register
