import type { Category, Novel } from '../types'

interface NovelFormModalProps {
  isOpen: boolean
  editingNovel: Novel | null
  categories: Category[]
  submitting: boolean
  error: string | null
  form: {
    title: string
    setTitle: (v: string) => void
    authorName: string
    setAuthorName: (v: string) => void
    description: string
    setDescription: (v: string) => void
    status: 'ONGOING' | 'COMPLETED' | 'PAUSED'
    setStatus: (v: 'ONGOING' | 'COMPLETED' | 'PAUSED') => void
    categoryIds: string[]
    coverPreview: string | null
  }
  actions: {
    close: () => void
    handleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    toggleCategory: (catId: string) => void
    submit: (e: React.FormEvent) => void
  }
}

export const NovelFormModal = ({
  isOpen,
  editingNovel,
  categories,
  submitting,
  error,
  form,
  actions,
}: NovelFormModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
          <h4 className="text-lg font-bold text-[var(--text-primary)]">
            {editingNovel ? 'Chỉnh Sửa Bộ Truyện' : 'Thêm Bộ Truyện Mới'}
          </h4>
          <button
            type="button"
            onClick={actions.close}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
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
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
              Tên Truyện *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => form.setTitle(e.target.value)}
              placeholder="VD: Phàm Nhân Tu Tiên"
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
              Tác Giả *
            </label>
            <input
              type="text"
              required
              value={form.authorName}
              onChange={(e) => form.setAuthorName(e.target.value)}
              placeholder="VD: Vong Ngữ"
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
              Mô Tả / Giới Thiệu
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => form.setDescription(e.target.value)}
              placeholder="Nội dung tóm tắt của bộ truyện..."
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Trạng Thái
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  form.setStatus(e.target.value as 'ONGOING' | 'COMPLETED' | 'PAUSED')
                }
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[var(--accent-gold)]"
              >
                <option value="ONGOING">Đang ra</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="PAUSED">Tạm dừng</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Ảnh Bìa (Tùy chọn)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={actions.handleCoverChange}
                className="w-full text-xs text-[var(--text-secondary)] file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--accent-gold)]/10 file:text-[var(--accent-gold)] hover:file:bg-amber-500/20"
              />
              {form.coverPreview && (
                <img
                  src={form.coverPreview}
                  alt="Preview"
                  className="mt-2 w-16 h-20 object-cover rounded-lg border border-[var(--border-color)]"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-2">
              Thể Loại
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--border-color)] max-h-36 overflow-y-auto">
              {categories.map((cat) => {
                const checked = form.categoryIds.includes(cat.id)
                return (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-2 p-1.5 rounded-lg text-xs cursor-pointer select-none transition-colors ${
                      checked
                        ? 'bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => actions.toggleCategory(cat.id)}
                      className="accent-[var(--accent-gold)] rounded"
                    />
                    <span>{cat.name}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border-color)] mt-6">
            <button
              type="button"
              onClick={actions.close}
              className="px-4 py-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--bg-surface-hover)] transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition-all"
            >
              {submitting ? 'Đang Lưu...' : editingNovel ? 'Cập Nhật' : 'Tạo Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
