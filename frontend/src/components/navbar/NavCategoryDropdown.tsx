import { useState } from 'react'
import { renderNavIcon } from './NavIcons'

interface NavCategoryDropdownProps {
  label: string
  icon?: string
}

export const NavCategoryDropdown = ({ label, icon }: NavCategoryDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="relative w-full lg:w-auto">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--text-nav-secondary)] hover:text-[var(--text-nav-primary)] hover:bg-[var(--bg-nav-hover)] rounded-lg whitespace-nowrap w-full lg:w-auto justify-between lg:justify-start transition-colors"
      >
        <span className="flex items-center gap-2">
          {renderNavIcon(icon)}
          {label}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="static lg:absolute left-0 mt-2 w-full lg:w-48 bg-[var(--bg-nav-fixed)] border border-[var(--border-nav)] rounded-xl shadow-2xl p-2 z-50">
          <a href="#tiem-hiep" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-[var(--text-nav-secondary)] hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors">Tiên Hiệp</a>
          <a href="#huyen-huyen" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-[var(--text-nav-secondary)] hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors">Huyền Huyễn</a>
          <a href="#do-thi" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-[var(--text-nav-secondary)] hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors">Đô Thị</a>
          <a href="#khoa-hoc" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-[var(--text-nav-secondary)] hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors">Khoa Huyễn</a>
          <div className="border-t border-[var(--border-nav)] my-1"></div>
          <a href="#all" onClick={(e) => e.preventDefault()} className="block px-3 py-2 text-sm text-amber-400 hover:bg-amber-500/10 rounded-lg font-medium transition-colors">Tất Cả Thể Loại</a>
        </div>
      )}
    </div>
  )
}
