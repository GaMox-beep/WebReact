import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { Chapter, UpdateChapterPayload } from '../types'

export interface UpdateChapterParams {
  id: string
  novelId?: string
  payload: UpdateChapterPayload
}

export const updateChapter = async ({ id, payload }: UpdateChapterParams): Promise<Chapter> => {
  return apiClient.patch<Chapter>(`/chapters/${id}`, payload)
}

export const useUpdateChapter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdateChapterParams) => updateChapter({ id, payload }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chapter'] })
      if (variables.novelId) {
        queryClient.invalidateQueries({ queryKey: ['novel', variables.novelId] })
      }
      queryClient.invalidateQueries({ queryKey: ['novels'] })
    },
  })
}
