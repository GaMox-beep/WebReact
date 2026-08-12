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
