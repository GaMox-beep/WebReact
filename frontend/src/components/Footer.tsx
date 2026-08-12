const FooterComponent = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 mt-auto border-t border-[var(--border-nav)] w-full bg-[var(--bg-footer-fixed)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="flex items-center justify-center p-1 rounded-md bg-amber-500/10 border border-amber-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
            </div>
            <span className="font-bold text-lg text-[var(--text-nav-primary)] tracking-tight">Novelis</span>
          </div>
          <p className="text-[var(--text-nav-secondary)] text-xs mb-0">
            Nền tảng đọc truyện chữ trực tuyến cao cấp, mượt mà và tối ưu tốc độ.
          </p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[var(--text-nav-muted)] text-xs mb-0">
            &copy; {currentYear} Novelis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent