import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'

export interface DeleteChapterParams {
  id: string
  novelId?: string
}

export const deleteChapter = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/chapters/${id}`)
}

export const useDeleteChapter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: DeleteChapterParams) => deleteChapter(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chapter'] })
      if (variables.novelId) {
        queryClient.invalidateQueries({ queryKey: ['novel', variables.novelId] })
      }
      queryClient.invalidateQueries({ queryKey: ['novels'] })
    },
  })
}
