import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { BookmarkStatusResponse } from './get-bookmark-status'

export interface ToggleBookmarkResponse {
  isBookmarked: boolean
  message: string
}

export const toggleBookmark = async (novelId: string): Promise<ToggleBookmarkResponse> => {
  return apiClient.post<ToggleBookmarkResponse>(`/bookmarks/${novelId}/toggle`)
}

export const useToggleBookmark = (novelId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => toggleBookmark(novelId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['bookmark-status', novelId] })
      const previousStatus = queryClient.getQueryData<BookmarkStatusResponse>(['bookmark-status', novelId])

      if (previousStatus) {
        queryClient.setQueryData<BookmarkStatusResponse>(['bookmark-status', novelId], {
          isBookmarked: !previousStatus.isBookmarked,
        })
      }

      return { previousStatus }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousStatus) {
        queryClient.setQueryData(['bookmark-status', novelId], context.previousStatus)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark-status', novelId] })
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
    },
  })
}
