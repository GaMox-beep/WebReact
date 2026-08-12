import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { PaginatedNovels } from '../types'

export interface GetNovelsParams {
  search?: string
  categoryId?: string
  status?: string
  page?: number
  limit?: number
}

export const getNovels = async (params?: GetNovelsParams): Promise<PaginatedNovels> => {
  const query = new URLSearchParams()
  if (params?.search) query.append('search', params.search)
  if (params?.categoryId) query.append('categoryId', params.categoryId)
  if (params?.status) query.append('status', params.status)
  if (params?.page) query.append('page', params.page.toString())
  if (params?.limit) query.append('limit', params.limit.toString())

  const queryString = query.toString()
  return apiClient.get<PaginatedNovels>(`/novels${queryString ? `?${queryString}` : ''}`)
}

export const useNovels = (params?: GetNovelsParams) => {
  return useQuery({
    queryKey: ['novels', params],
    queryFn: () => getNovels(params),
  })
}
