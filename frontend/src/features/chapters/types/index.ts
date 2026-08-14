export interface Chapter {
  id: string
  novelId: string
  chapterNumber: number
  title: string
  content?: string
  views: number
  isVip: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateChapterPayload {
  novelId: string
  chapterNumber: number
  title: string
  content: string
  isVip?: boolean
}

export interface UpdateChapterPayload {
  chapterNumber?: number
  title?: string
  content?: string
  isVip?: boolean
}

export interface ChapterNavigationItem {
  id: string
  chapterNumber: number
  title: string
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

