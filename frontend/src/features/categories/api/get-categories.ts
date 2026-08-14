import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { Category } from '../types'

export const getCategories = async (): Promise<Category[]> => {
  return apiClient.get<Category[]>('/categories')
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
