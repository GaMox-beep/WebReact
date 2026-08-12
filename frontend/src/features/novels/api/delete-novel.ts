import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'

export const deleteNovel = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/novels/${id}`)
}

export const useDeleteNovel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteNovel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['novels'] })
    },
  })
}
