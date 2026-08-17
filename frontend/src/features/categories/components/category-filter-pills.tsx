import type { Category } from '../types'

interface CategoryFilterPillsProps {
  categories: Category[]
  currentSlug: string
  onSelectCategory: (slug: string) => void
}

export const CategoryFilterPills = ({
  categories,
  currentSlug,
  onSelectCategory,
}: CategoryFilterPillsProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        type="button"
        onClick={() => onSelectCategory('')}
        className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
          !currentSlug
            ? 'bg-[var(--accent-gold)] text-slate-950 font-bold'
            : 'bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-gold)]'
        }`}
      >
        Tất Cả
      </button>
      {categories.map((cat) => {
        const isSelected = cat.slug === currentSlug
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              isSelected
                ? 'bg-[var(--accent-gold)] text-slate-950 font-bold'
                : 'bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-gold)]'
            }`}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
