import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../lib/api-client'
import { paths } from '../../config/paths'
import { renderNavIcon } from './NavIcons'

interface CategoryItem {
  id: string
  name: string
  slug: string
  _count?: {
    novels: number
  }
}

interface NavCategoryDropdownProps {
  label: string
  icon?: string
}

export const NavCategoryDropdown = ({ label, icon }: NavCategoryDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data: categories = [], isLoading } = useQuery<CategoryItem[]>({
    queryKey: ['categories'],
    queryFn: () => apiClient.get<CategoryItem[]>('/categories'),
    staleTime: 1000 * 60 * 5, // 5 mins
  })

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div ref={dropdownRef} className="relative w-full lg:w-auto">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--text-nav-secondary)] hover:text-[var(--text-nav-primary)] hover:bg-[var(--bg-nav-hover)] rounded-lg whitespace-nowrap w-full lg:w-auto justify-between lg:justify-start transition-colors"
      >
        <span className="flex items-center gap-2">
          {renderNavIcon(icon)}
          {label}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="static lg:absolute left-0 mt-2 w-full lg:w-72 bg-[var(--bg-nav-fixed)] border border-[var(--border-nav)] rounded-xl shadow-2xl p-2.5 z-50">
          {isLoading ? (
            <div className="p-4 text-center text-xs text-[var(--text-nav-secondary)]">
              Đang tải thể loại...
            </div>
          ) : categories.length === 0 ? (
            <div className="p-4 text-center text-xs text-[var(--text-nav-secondary)]">
              Chưa có thể loại nào
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={paths.novels.categories.getHref(cat.slug)}
                  onClick={() => setIsDropdownOpen(false)}
                  className="px-2.5 py-1.5 text-xs text-[var(--text-nav-secondary)] hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors truncate flex items-center justify-between"
                  title={cat.name}
                >
                  <span className="truncate">{cat.name}</span>
                  {typeof cat._count?.novels === 'number' && cat._count.novels > 0 && (
                    <span className="text-[10px] text-slate-500 font-mono ml-1 shrink-0">
                      {cat._count.novels}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}

          <div className="border-t border-[var(--border-nav)] my-1.5"></div>

          <Link
            to={paths.novels.categories.getHref()}
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
          >
            <span>Tất Cả Thể Loại</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}
