import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { Novel } from '../types'

export interface UpdateNovelParams {
  id: string
  formData: FormData
}

export const updateNovel = async ({ id, formData }: UpdateNovelParams): Promise<Novel> => {
  return apiClient.patch<Novel>(`/novels/${id}`, formData)
}

export const useUpdateNovel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, formData }: UpdateNovelParams) => updateNovel({ id, formData }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['novels'] })
      queryClient.invalidateQueries({ queryKey: ['novel', variables.id] })
    },
  })
}
