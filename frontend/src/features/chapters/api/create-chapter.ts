import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { Chapter, CreateChapterPayload } from '../types'

export const createChapter = async (payload: CreateChapterPayload): Promise<Chapter> => {
  return apiClient.post<Chapter>('/chapters', payload)
}

export const useCreateChapter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateChapterPayload) => createChapter(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chapter'] })
      queryClient.invalidateQueries({ queryKey: ['novel', variables.novelId] })
      queryClient.invalidateQueries({ queryKey: ['novels'] })
    },
  })
}
