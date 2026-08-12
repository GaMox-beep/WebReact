import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { Novel } from '../types'

export const getNovel = async (slug: string): Promise<Novel> => {
  return apiClient.get<Novel>(`/novels/${slug}`)
}

export const useNovel = (slug: string) => {
  return useQuery({
    queryKey: ['novel', slug],
    queryFn: () => getNovel(slug),
    enabled: !!slug,
  })
}
