import { useState } from 'react'

export interface NovelFiltersState {
  search: string
  setSearch: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  resetFilters: () => void
}

export const useNovelFilters = (initial?: {
  search?: string
  categoryId?: string
  status?: string
}): NovelFiltersState => {
  const [search, setSearch] = useState(initial?.search || '')
  const [selectedCategory, setSelectedCategory] = useState(initial?.categoryId || '')
  const [selectedStatus, setSelectedStatus] = useState(initial?.status || '')

  const resetFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedStatus('')
  }

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    resetFilters,
  }
}
