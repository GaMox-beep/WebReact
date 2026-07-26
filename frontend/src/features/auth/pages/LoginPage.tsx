import { useState } from 'react'
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '80vh' }}>
      <Card style={{ maxWidth: '420px', width: '100%' }} className="auth-card p-3 p-sm-4">
        <Card.Body>
          {/* Header */}
          <div className="text-center mb-4">
            <div className="d-inline-flex p-3 rounded-circle mb-3 auth-badge-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent-gold)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
            </div>
            <h3 className="fw-bold mb-1 text-white">Đăng Nhập</h3>
            <p className="text-muted small">Chào mừng bạn quay trở lại với Novelis</p>
          </div>

          {/* Form */}
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label className="text-secondary small fw-medium">Địa chỉ Email</Form.Label>
              <InputGroup>
                <InputGroup.Text className="input-group-text-custom">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <Form.Label className="text-secondary small mb-0 fw-medium">Mật khẩu</Form.Label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="small text-decoration-none text-secondary hover-gold">
                  Quên mật khẩu?
                </a>
              </div>
              <InputGroup>
                <InputGroup.Text className="input-group-text-custom">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  className="input-group-btn-custom px-3"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4 d-flex align-items-center" controlId="rememberMe">
              <Form.Check
                type="checkbox"
                id="rememberCheck"
                label={<span className="text-secondary small ms-1">Ghi nhớ đăng nhập</span>}
              />
            </Form.Group>

            <Button type="submit" className="w-100 py-2.5 btn-premium-gold fw-bold mb-3">
              Đăng Nhập
            </Button>
          </Form>

          {/* Footer Link */}
          <div className="text-center mt-3 pt-3 border-top border-secondary border-opacity-10">
            <span className="text-muted small">Chưa có tài khoản? </span>
            <Link to="/register" className="small text-decoration-none fw-semibold" style={{ color: 'var(--accent-gold)' }}>
              Đăng ký ngay
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginPage
