export const RechargePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--accent-gold)]"
          >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Nạp Linh Thạch / Coin</h2>
        <p className="text-[var(--text-secondary)] max-w-md text-sm">
          Nạp tiền vào tài khoản để mua chương VIP, ủng hộ tác giả và mở khóa các tính năng đặc quyền khác.
        </p>
        <p className="text-xs font-medium text-[var(--text-muted)] mt-4">
          Tính năng đang được phát triển
        </p>
      </div>
    </div>
  )
}

export default RechargePage
