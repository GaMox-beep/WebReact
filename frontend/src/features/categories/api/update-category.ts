import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { Category, UpdateCategoryPayload } from '../types'

interface UpdateCategoryParams {
  id: string
  payload: UpdateCategoryPayload
}

export const updateCategory = async ({ id, payload }: UpdateCategoryParams): Promise<Category> => {
  return apiClient.patch<Category>(`/categories/${id}`, payload)
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
