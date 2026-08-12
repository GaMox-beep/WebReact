import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { Chapter } from '../types'

export const getChapter = async (id: string): Promise<Chapter> => {
  return apiClient.get<Chapter>(`/chapters/${id}`)
}

export const useChapter = (id: string) => {
  return useQuery({
    queryKey: ['chapter', id],
    queryFn: () => getChapter(id),
    enabled: !!id,
  })
}
