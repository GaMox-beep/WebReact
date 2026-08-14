import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { Category, CreateCategoryPayload } from '../types'

export const createCategory = async (payload: CreateCategoryPayload): Promise<Category> => {
  return apiClient.post<Category>('/categories', payload)
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
