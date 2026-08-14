import { useMemo } from 'react'

export type FontSizeOption = 'sm' | 'base' | 'lg' | 'xl' | '2xl'
export type LineHeightOption = 'normal' | 'relaxed' | 'loose'

interface ChapterReaderContentProps {
  content?: string
  fontSize: FontSizeOption
  lineHeight: LineHeightOption
}

const fontSizeClasses: Record<FontSizeOption, string> = {
  sm: 'text-sm sm:text-base',
  base: 'text-base sm:text-lg',
  lg: 'text-lg sm:text-xl',
  xl: 'text-xl sm:text-2xl',
  '2xl': 'text-2xl sm:text-3xl',
}

const lineHeightClasses: Record<LineHeightOption, string> = {
  normal: 'leading-normal space-y-4',
  relaxed: 'leading-relaxed space-y-5 sm:space-y-6',
  loose: 'leading-loose space-y-6 sm:space-y-7',
}

export const ChapterReaderContent = ({
  content,
  fontSize,
  lineHeight,
}: ChapterReaderContentProps) => {
  const paragraphs = useMemo(() => {
    if (!content) return []
    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  }, [content])

  if (!content || paragraphs.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-[var(--text-muted)]">
        Nội dung chương này đang được cập nhật...
      </div>
    )
  }

  return (
    <article
      className={`py-8 text-[var(--text-primary)] transition-all select-text font-serif tracking-normal ${fontSizeClasses[fontSize]} ${lineHeightClasses[lineHeight]}`}
    >
      {paragraphs.map((p, idx) => (
        <p key={idx} className="text-justify text-pretty">
          {p}
        </p>
      ))}
    </article>
  )
}
