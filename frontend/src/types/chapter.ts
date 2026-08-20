export interface ChapterBase {
  id: string
  novelId: string
  chapterNumber: number
  title: string
  content?: string
  views: number
  isVip: boolean
  price?: number
  isUnlocked?: boolean
  createdAt: string
  updatedAt: string
}

export interface ChapterNavigationItem {
  id: string
  chapterNumber: number
  title: string
  isVip?: boolean
  price?: number
}
