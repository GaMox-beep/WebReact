import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { Novel } from '../types'

export const createNovel = async (formData: FormData): Promise<Novel> => {
  return apiClient.post<Novel>('/novels', formData)
}

export const useCreateNovel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => createNovel(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['novels'] })
    },
  })
}
