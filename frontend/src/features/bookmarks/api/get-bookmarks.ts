import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { PaginatedBookmarks } from '../types'

export interface GetBookmarksParams {
  page?: number
  limit?: number
}

export const getBookmarks = async (params?: GetBookmarksParams): Promise<PaginatedBookmarks> => {
  const query = new URLSearchParams()
  if (params?.page) query.append('page', params.page.toString())
  if (params?.limit) query.append('limit', params.limit.toString())

  const queryString = query.toString()
  return apiClient.get<PaginatedBookmarks>(`/bookmarks${queryString ? `?${queryString}` : ''}`)
}

export const useBookmarks = (params?: GetBookmarksParams, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['bookmarks', params],
    queryFn: () => getBookmarks(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 1, // 1 minute cache
    enabled: options?.enabled ?? true,
  })
}
