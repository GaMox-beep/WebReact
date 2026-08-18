export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
}

export interface Novel {
  id: string
  title: string
  slug: string
  description: string
  coverUrl?: string
  authorName: string
  status: 'ONGOING' | 'COMPLETED' | 'PAUSED'
  views: number
  rating: number
  createdAt: string
  updatedAt: string
  categories?: { category: Category }[]
  _count?: { chapters: number }
  chapters?: {
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
  }[]
}

export interface PaginatedNovels {
  items: Novel[]
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
