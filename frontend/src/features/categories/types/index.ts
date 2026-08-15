export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  createdAt: string
  _count?: {
    novels: number
  }
}

export interface CreateCategoryPayload {
  name: string
  slug?: string
  description?: string
}

export interface UpdateCategoryPayload {
  name?: string
  slug?: string
  description?: string
}
