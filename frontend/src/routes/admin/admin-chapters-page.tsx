import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNovels } from '../../features/novels/api/get-novels'
import { useNovel } from '../../features/novels/api/get-novel'
import { useChapterAdmin } from '../../features/chapters/hooks/use-chapter-admin'
import { ChapterTableRow } from '../../features/chapters/components/chapter-table-row'
import { ChapterFormModal } from '../../features/chapters/components/chapter-form-modal'

export const AdminChaptersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlNovelId = searchParams.get('novelId') || ''

  const { data: novelsData, isLoading: isNovelsLoading } = useNovels({ limit: 100 })
  const novels = novelsData?.items || []

  const [localNovelId, setLocalNovelId] = useState<string>(urlNovelId)

  // Derived active novel ID
  const selectedNovelId = localNovelId || (novels.length > 0 ? novels[0].id : '')
  const selectedNovelSummary = novels.find((n) => n.id === selectedNovelId)

  // Fetch full novel detail with chapters
  const {
    data: fullNovelData,
    isLoading: isNovelLoading,
    refetch: refetchNovel,
  } = useNovel(selectedNovelSummary?.slug || '')

  const chapters = fullNovelData?.chapters || []

  const { submitting, error, modal, removeChapter } = useChapterAdmin({
    novelId: selectedNovelId,
    chapters,
    onSuccess: () => {
      refetchNovel()
    },
  })

  const handleNovelChange = (novelId: string) => {
    setLocalNovelId(novelId)
    setSearchParams({ novelId })
  }

  const loading = isNovelsLoading || isNovelLoading

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">Quản Lý Chương Truyện</h3>
          <p className="text-slate-400 text-sm">Đăng chương mới, chỉnh sửa nội dung và phân loại chương VIP</p>
        </div>
        <button
          onClick={modal.actions.openCreate}
          disabled={!selectedNovelId}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Thêm Chương Mới
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Select Novel Selector */}
      <div className="bg-[#11131e] p-4 rounded-2xl border border-white/10 shadow-lg">
        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Chọn Bộ Truyện Cần Quản Lý:</label>
        <select
          value={selectedNovelId}
          onChange={(e) => handleNovelChange(e.target.value)}
          className="w-full bg-[#0a0b10] border border-white/10 text-amber-400 font-semibold text-base rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
        >
          {novels.length === 0 ? (
            <option value="">(Chưa có bộ truyện nào - Hãy tạo truyện trước)</option>
          ) : (
            novels.map((novel) => (
              <option key={novel.id} value={novel.id}>
                {novel.title} ({novel.authorName})
              </option>
            ))
          )}
        </select>
      </div>

      {/* Main Table / Empty State */}
      {loading ? (
        <div className="bg-[#11131e] border border-white/10 rounded-2xl p-12 text-center text-slate-400">
          Đang tải danh sách chương...
        </div>
      ) : !selectedNovelId ? (
        <div className="bg-[#11131e] border border-white/10 rounded-2xl p-12 text-center text-slate-400">
          Vui lòng chọn hoặc tạo một bộ truyện trước.
        </div>
      ) : chapters.length === 0 ? (
        <div className="bg-[#11131e] border border-white/10 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Chưa Có Chương Nào</h4>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            Bộ truyện này hiện chưa được đăng chương nào. Hãy nhấn vào nút bên dưới để thêm chương đầu tiên!
          </p>
          <button
            onClick={modal.actions.openCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
          >
            + Đăng Chương Đầu Tiên
          </button>
        </div>
      ) : (
        <div className="bg-[#11131e] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0a0b10] border-b border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Số Chương</th>
                  <th className="py-3.5 px-4">Tiêu Đề</th>
                  <th className="py-3.5 px-4">Loại Chương</th>
                  <th className="py-3.5 px-4">Lượt Đọc</th>
                  <th className="py-3.5 px-4">Ngày Đăng</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {chapters.map((chapter) => (
                  <ChapterTableRow
                    key={chapter.id}
                    chapter={chapter}
                    onEdit={modal.actions.openEdit}
                    onDelete={removeChapter}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      <ChapterFormModal
        isOpen={modal.isOpen}
        editingChapter={modal.editingChapter}
        submitting={submitting}
        error={error}
        form={modal.form}
        actions={modal.actions}
      />
    </div>
  )
}

export default AdminChaptersPage
