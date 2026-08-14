import type { Category } from '../types'

interface CategoryFormModalProps {
  isOpen: boolean
  editingCategory: Category | null
  submitting: boolean
  error: string | null
  form: {
    name: string
    setName: (v: string) => void
    slug: string
    setSlug: (v: string) => void
    description: string
    setDescription: (v: string) => void
  }
  actions: {
    close: () => void
    submit: (e: React.FormEvent) => void
  }
}

export const CategoryFormModal = ({
  isOpen,
  editingCategory,
  submitting,
  error,
  form,
  actions,
}: CategoryFormModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#11131e] border border-white/10 rounded-2xl w-full max-w-lg overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <h4 className="text-lg font-bold text-white">
            {editingCategory ? 'Chỉnh Sửa Thể Loại' : 'Thêm Thể Loại Mới'}
          </h4>
          <button
            type="button"
            onClick={actions.close}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={actions.submit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Tên Thể Loại <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => form.setName(e.target.value)}
              placeholder="VD: Tiên Hiệp, Huyền Huyễn..."
              className="w-full px-3.5 py-2.5 bg-[#0a0b10] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Slug Đường Dẫn <span className="text-slate-500 text-xs normal-case">(Tự động tạo nếu để trống)</span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => form.setSlug(e.target.value)}
              placeholder="VD: tien-hiep, huyen-huyen..."
              className="w-full px-3.5 py-2.5 bg-[#0a0b10] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Mô Tả Thể Loại
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => form.setDescription(e.target.value)}
              placeholder="Mô tả ngắn về nội dung, đặc trưng của thể loại..."
              className="w-full px-3.5 py-2.5 bg-[#0a0b10] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 text-sm resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-6">
            <button
              type="button"
              onClick={actions.close}
              disabled={submitting}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {submitting && (
                <svg
                  className="animate-spin h-4 w-4 text-slate-950"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {editingCategory ? 'Lưu Thay Đổi' : 'Tạo Thể Loại'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
