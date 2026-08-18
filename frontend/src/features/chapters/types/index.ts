export interface Chapter {
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

export interface CreateChapterPayload {
  novelId: string
  chapterNumber: number
  title: string
  content: string
  isVip?: boolean
  price?: number
}

export interface UpdateChapterPayload {
  chapterNumber?: number
  title?: string
  content?: string
  isVip?: boolean
  price?: number
}

export interface ChapterNavigationItem {
  id: string
  chapterNumber: number
  title: string
  isVip?: boolean
  price?: number
}

export interface ChapterDetailNovel {
  id: string
  title: string
  slug: string
  authorName: string
  coverUrl: string | null
}

export interface ChapterDetailResponse extends Chapter {
  novel: ChapterDetailNovel
  navigation: {
    prevChapter: ChapterNavigationItem | null
    nextChapter: ChapterNavigationItem | null
  }
}

export interface UnlockChapterResponse {
  success: boolean
  message: string
  chapter: ChapterDetailResponse
  remainingCoins: number
}
