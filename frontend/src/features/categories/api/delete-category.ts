import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'

export const deleteCategory = async (id: string): Promise<{ message: string; id: string }> => {
  return apiClient.delete<{ message: string; id: string }>(`/categories/${id}`)
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
