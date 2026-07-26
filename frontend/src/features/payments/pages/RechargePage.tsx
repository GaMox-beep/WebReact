export const RechargePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Nạp Linh Thạch / Coin</h2>
        <p className="text-slate-400 max-w-md text-sm">
          Nạp tiền vào tài khoản để mua chương VIP, ủng hộ tác giả và mở khóa các tính năng đặc quyền khác.
        </p>
        <span className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold px-4 py-2 rounded-full mt-4">
          Tính năng đang được phát triển
        </span>
      </div>
    </div>
  )
}

export default RechargePage
