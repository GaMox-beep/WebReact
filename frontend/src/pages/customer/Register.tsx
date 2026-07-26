import { useState } from 'react'
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '85vh' }}>
      <Card style={{ maxWidth: '440px', width: '100%' }} className="auth-card p-3 p-sm-4">
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            </div>
            <h3 className="fw-bold mb-1 text-white">Tạo Tài Khoản</h3>
            <p className="text-muted small">Đăng ký để lưu truyện yêu thích và tham gia bình luận</p>
          </div>

          {/* Form */}
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3" controlId="regUsername">
              <Form.Label className="text-secondary small fw-medium">Tên người dùng / Biệt danh</Form.Label>
              <InputGroup>
                <InputGroup.Text className="input-group-text-custom">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Nguyễn Văn A"
                  autoComplete="username"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="regEmail">
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

            <Form.Group className="mb-3" controlId="regPassword">
              <Form.Label className="text-secondary small fw-medium">Mật khẩu</Form.Label>
              <InputGroup>
                <InputGroup.Text className="input-group-text-custom">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tối thiểu 6 ký tự"
                  autoComplete="new-password"
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

            <Form.Group className="mb-3" controlId="regConfirmPassword">
              <Form.Label className="text-secondary small fw-medium">Xác nhận mật khẩu</Form.Label>
              <InputGroup>
                <InputGroup.Text className="input-group-text-custom">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 12 2 2 4-4" />
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  className="input-group-btn-custom px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
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

            <Form.Group className="mb-4" controlId="termsCheck">
              <Form.Check
                type="checkbox"
                id="termsAgreement"
                label={
                  <span className="text-secondary small ms-1">
                    Tôi đồng ý với <a href="#terms" onClick={(e) => e.preventDefault()} className="text-decoration-none" style={{ color: 'var(--accent-gold)' }}>Điều khoản dịch vụ</a>
                  </span>
                }
              />
            </Form.Group>

            <Button type="submit" className="w-100 py-2.5 btn-premium-gold fw-bold mb-3">
              Tạo Tài Khoản
            </Button>
          </Form>

          {/* Footer Link */}
          <div className="text-center mt-3 pt-3 border-top border-secondary border-opacity-10">
            <span className="text-muted small">Đã có tài khoản? </span>
            <Link to="/login" className="small text-decoration-none fw-semibold" style={{ color: 'var(--accent-gold)' }}>
              Đăng nhập ngay
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register
