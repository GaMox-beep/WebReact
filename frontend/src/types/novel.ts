export interface NovelCategoryItem {
  id: string
  name: string
  slug: string
  description?: string | null
}

export interface NovelBase {
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
  categories?: { category: NovelCategoryItem }[]
  _count?: { chapters: number }
}
