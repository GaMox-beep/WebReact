import type { Chapter } from '../types'

interface ChapterFormModalProps {
  isOpen: boolean
  editingChapter: Chapter | null
  submitting: boolean
  error: string | null
  form: {
    chapterNumber: number | ''
    setChapterNumber: (v: number | '') => void
    title: string
    setTitle: (v: string) => void
    content: string
    setContent: (v: string) => void
    isVip: boolean
    setIsVip: (v: boolean) => void
  }
  actions: {
    close: () => void
    submit: (e: React.FormEvent) => void
  }
}

export const ChapterFormModal = ({
  isOpen,
  editingChapter,
  submitting,
  error,
  form,
  actions,
}: ChapterFormModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
          <h4 className="text-lg font-bold text-[var(--text-primary)]">
            {editingChapter ? 'Chỉnh Sửa Chương' : 'Đăng Chương Mới'}
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Số Chương *
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                required
                value={form.chapterNumber}
                onChange={(e) =>
                  form.setChapterNumber(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder="VD: 1"
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Tiêu Đề Chương *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => form.setTitle(e.target.value)}
                placeholder="VD: Tiết tử / Chương 1: Bắt đầu"
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
              Nội Dung Chương *
            </label>
            <textarea
              rows={12}
              required
              value={form.content}
              onChange={(e) => form.setContent(e.target.value)}
              placeholder="Dán toàn bộ nội dung chương truyện vào đây..."
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl p-3.5 focus:outline-none focus:border-[var(--accent-gold)] font-serif leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl">
            <input
              type="checkbox"
              id="isVipCheck"
              checked={form.isVip}
              onChange={(e) => form.setIsVip(e.target.checked)}
              className="w-4 h-4 accent-[var(--accent-gold)] rounded cursor-pointer"
            />
            <label htmlFor="isVipCheck" className="text-xs font-medium text-[var(--text-secondary)] cursor-pointer">
              Đánh dấu là <span className="text-[var(--accent-gold)] font-bold">Chương VIP</span> (Yêu cầu trả xu để đọc)
            </label>
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
              {submitting ? 'Đang Lưu...' : editingChapter ? 'Cập Nhật' : 'Đăng Chương'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
