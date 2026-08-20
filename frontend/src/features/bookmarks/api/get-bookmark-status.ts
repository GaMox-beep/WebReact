import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'

export interface BookmarkStatusResponse {
  isBookmarked: boolean
}

export const getBookmarkStatus = async (novelId: string): Promise<BookmarkStatusResponse> => {
  return apiClient.get<BookmarkStatusResponse>(`/bookmarks/${novelId}/status`)
}

export const useBookmarkStatus = (novelId: string, enabled = true) => {
  return useQuery({
    queryKey: ['bookmark-status', novelId],
    queryFn: () => getBookmarkStatus(novelId),
    enabled: !!novelId && enabled,
    staleTime: 1000 * 60 * 5,
  })
}
