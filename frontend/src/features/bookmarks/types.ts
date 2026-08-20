import type { NovelBase } from '../../types/novel'

export interface BookmarkedNovelItem extends NovelBase {
  bookmarkId: string
  bookmarkedAt: string
}

export interface PaginatedBookmarks {
  items: BookmarkedNovelItem[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
