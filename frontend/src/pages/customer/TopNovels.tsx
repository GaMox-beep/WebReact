import { Container } from 'react-bootstrap'

const TopNovels = () => {
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
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
            <path d="M12 2a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
          </svg>
        </div>
        <h2 className="mb-2 text-white">Bảng Xếp Hạng</h2>
        <p className="text-secondary max-w-md">
          Khám phá những bộ truyện hot nhất, được đọc nhiều nhất và đánh giá cao nhất bởi các độc giả khác.
        </p>
        <span className="badge bg-dark text-warning border border-warning px-3 py-2 mt-3">
          Tính năng đang được phát triển
        </span>
      </div>
    </Container>
  )
}

export default TopNovels
