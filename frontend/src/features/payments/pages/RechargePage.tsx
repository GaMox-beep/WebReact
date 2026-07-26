import { Container } from 'react-bootstrap'

export const RechargePage = () => {
  return (
    <Container>
      <div className="placeholder-page">
        <div className="placeholder-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <h2 className="mb-2 text-white">Nạp Linh Thạch / Coin</h2>
        <p className="text-secondary max-w-md">
          Nạp tiền vào tài khoản để mua chương VIP, ủng hộ tác giả và mở khóa các tính năng đặc quyền khác.
        </p>
        <span className="badge bg-dark text-warning border border-warning px-3 py-2 mt-3">
          Tính năng đang được phát triển
        </span>
      </div>
    </Container>
  )
}

export default RechargePage
