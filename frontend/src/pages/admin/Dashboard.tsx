import { Card, Row, Col } from 'react-bootstrap'

const AdminDashboard = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="fw-bold text-white mb-1">Bảng Điều Khiển Quản Trị</h3>
        <p className="text-muted small">Tổng quan thông số hệ thống Novelis</p>
      </div>

      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="p-3">
            <span className="text-muted small">Tổng số truyện</span>
            <h4 className="fw-bold text-white mb-0 mt-1">128</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3">
            <span className="text-muted small">Tổng số người dùng</span>
            <h4 className="fw-bold text-white mb-0 mt-1">1,450</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3">
            <span className="text-muted small">Lượt đọc hôm nay</span>
            <h4 className="fw-bold text-warning mb-0 mt-1">24,500</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3">
            <span className="text-muted small">Linh Thạch đã nạp</span>
            <h4 className="fw-bold text-warning mb-0 mt-1">89,000</h4>
          </Card>
        </Col>
      </Row>

      <Card className="p-4 text-center">
        <p className="text-muted mb-0">Các mô hình quản lý chi tiết (Truyện, User, Chương) sẽ được phát triển ở các bước tiếp theo.</p>
      </Card>
    </div>
  )
}

export default AdminDashboard
