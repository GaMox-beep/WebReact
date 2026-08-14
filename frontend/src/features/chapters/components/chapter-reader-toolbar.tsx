import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { paths } from '../../../config/paths'
import type { ChapterNavigationItem } from '../types'
import type { FontSizeOption, LineHeightOption } from './chapter-reader-content'

interface NovelChapterSummary {
  id: string
  chapterNumber: number
  title: string
  isVip?: boolean
}

interface ChapterReaderToolbarProps {
  novelSlug: string
  currentChapterNumber: number
  prevChapter: ChapterNavigationItem | null
  nextChapter: ChapterNavigationItem | null
  allChapters?: NovelChapterSummary[]
  fontSize: FontSizeOption
  onChangeFontSize: (size: FontSizeOption) => void
  lineHeight: LineHeightOption
  onChangeLineHeight: (height: LineHeightOption) => void
}

const fontSizes: FontSizeOption[] = ['sm', 'base', 'lg', 'xl', '2xl']
const lineHeights: { value: LineHeightOption; label: string }[] = [
  { value: 'normal', label: 'Vừa' },
  { value: 'relaxed', label: 'Rộng' },
  { value: 'loose', label: 'Rất rộng' },
]

export const ChapterReaderToolbar = ({
  novelSlug,
  currentChapterNumber,
  prevChapter,
  nextChapter,
  allChapters = [],
  fontSize,
  onChangeFontSize,
  lineHeight,
  onChangeLineHeight,
}: ChapterReaderToolbarProps) => {
  const navigate = useNavigate()
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [chapterSearch, setChapterSearch] = useState('')
  const settingsRef = useRef<HTMLDivElement>(null)

  // Close settings popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setIsSettingsOpen(false)
      }
    }
    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSettingsOpen])

  const filteredChapters = allChapters.filter(
    (c) =>
      c.chapterNumber.toString().includes(chapterSearch.trim()) ||
      c.title.toLowerCase().includes(chapterSearch.trim().toLowerCase()),
  )

  const currentFontSizeIndex = fontSizes.indexOf(fontSize)

  const handleDecreaseFont = () => {
    if (currentFontSizeIndex > 0) {
      onChangeFontSize(fontSizes[currentFontSizeIndex - 1])
    }
  }

  const handleIncreaseFont = () => {
    if (currentFontSizeIndex < fontSizes.length - 1) {
      onChangeFontSize(fontSizes[currentFontSizeIndex + 1])
    }
  }

  return (
    <>
      {/* Main Navigation & Settings Bar */}
      <nav aria-label="Chapter Controls" className="flex items-center justify-between gap-2 p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-sm transition-colors">
        {/* Previous Chapter Button */}
        {prevChapter ? (
          <Link
            to={paths.novels.chapter.getHref(novelSlug, prevChapter.chapterNumber)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-color)] transition-all"
            title={`Chương ${prevChapter.chapterNumber}: ${prevChapter.title}`}
          >
            <span>←</span>
            <span className="hidden sm:inline">Chương trước</span>
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] opacity-50 cursor-not-allowed border border-[var(--border-color)]"
          >
            <span>←</span>
            <span className="hidden sm:inline">Chương trước</span>
          </button>
        )}

        {/* Center Controls: Chapter Selector & Reading Settings */}
        <div className="flex items-center gap-2">
          {/* Chapter Selector Trigger */}
          <button
            onClick={() => setIsChapterModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-color)] transition-all"
          >
            <svg
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
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span>Chương {currentChapterNumber}</span>
          </button>

          {/* Settings Trigger & Dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-color)] transition-all"
              title="Cài đặt đọc truyện"
              aria-label="Cài đặt đọc truyện"
            >
              <svg
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
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span className="hidden sm:inline">Cài đặt</span>
            </button>

            {/* Settings Popup Menu */}
            {isSettingsOpen && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-64 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4 shadow-lg z-30 space-y-4">
                {/* Font Size Setting */}
                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-2">
                    Cỡ chữ ({fontSize.toUpperCase()})
                  </label>
                  <div className="flex items-center justify-between bg-[var(--bg-surface-elevated)] rounded-xl p-1 border border-[var(--border-color)]">
                    <button
                      onClick={handleDecreaseFont}
                      disabled={currentFontSizeIndex === 0}
                      className="px-3 py-1.5 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Giảm cỡ chữ"
                    >
                      A -
                    </button>
                    <span className="text-xs font-semibold text-amber-500">
                      {fontSize}
                    </span>
                    <button
                      onClick={handleIncreaseFont}
                      disabled={currentFontSizeIndex === fontSizes.length - 1}
                      className="px-3 py-1.5 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Tăng cỡ chữ"
                    >
                      A +
                    </button>
                  </div>
                </div>

                {/* Line Spacing Setting */}
                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-2">
                    Giãn dòng
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-[var(--bg-surface-elevated)] rounded-xl p-1 border border-[var(--border-color)]">
                    {lineHeights.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => onChangeLineHeight(item.value)}
                        className={`py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                          lineHeight === item.value
                            ? 'bg-amber-500 text-black font-semibold shadow-xs'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next Chapter Button */}
        {nextChapter ? (
          <Link
            to={paths.novels.chapter.getHref(novelSlug, nextChapter.chapterNumber)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-all shadow-sm"
            title={`Chương ${nextChapter.chapterNumber}: ${nextChapter.title}`}
          >
            <span className="hidden sm:inline">Chương sau</span>
            <span>→</span>
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] opacity-50 cursor-not-allowed border border-[var(--border-color)]"
          >
            <span className="hidden sm:inline">Chương sau</span>
            <span>→</span>
          </button>
        )}
      </nav>

      {/* Chapter Selection Modal */}
      {isChapterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Danh Sách Chương ({allChapters.length})
              </h3>
              <button
                onClick={() => setIsChapterModalOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-lg transition-colors"
                aria-label="Đóng danh sách"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="pt-3 pb-2">
              <input
                type="text"
                placeholder="Tìm theo số chương hoặc tiêu đề..."
                value={chapterSearch}
                onChange={(e) => setChapterSearch(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Scrollable Chapters List */}
            <div className="flex-1 overflow-y-auto py-2 space-y-1.5 pr-1">
              {filteredChapters.length === 0 ? (
                <p className="text-center py-8 text-xs text-[var(--text-muted)]">
                  Không tìm thấy chương phù hợp
                </p>
              ) : (
                filteredChapters.map((chap) => {
                  const isCurrent = chap.chapterNumber === currentChapterNumber
                  return (
                    <button
                      key={chap.id}
                      onClick={() => {
                        setIsChapterModalOpen(false)
                        navigate(paths.novels.chapter.getHref(novelSlug, chap.chapterNumber))
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all ${
                        isCurrent
                          ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30'
                          : 'bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-amber-500 font-medium">#{chap.chapterNumber}</span>
                        <span className="truncate">{chap.title || `Chương ${chap.chapterNumber}`}</span>
                      </div>
                      {chap.isVip && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
                          VIP
                        </span>
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
