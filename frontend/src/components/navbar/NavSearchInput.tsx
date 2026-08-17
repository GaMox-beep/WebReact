export const NavSearchInput = () => {
  return (
    <div className="relative w-full lg:w-48 xl:w-60 focus-within:lg:w-60 xl:focus-within:w-72 transition-all">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="Tìm kiếm..."
          className="w-full bg-[var(--bg-nav-elevated)] border border-[var(--border-nav)] text-[var(--text-nav-primary)] placeholder-[var(--text-nav-muted)] rounded-full pl-8 pr-3 py-1.5 text-xs xl:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-nav-muted)] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
      </form>
    </div>
  )
}
