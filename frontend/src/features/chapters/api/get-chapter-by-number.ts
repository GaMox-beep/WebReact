import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { ChapterDetailResponse } from '../types'

export const getChapterByNumber = async (
  slug: string,
  chapterNumber: number | string,
): Promise<ChapterDetailResponse> => {
  return apiClient.get<ChapterDetailResponse>(
    `/chapters/novel/${slug}/${chapterNumber}`,
  )
}

export const useChapterByNumber = (
  slug: string,
  chapterNumber: number | string,
) => {
  return useQuery({
    queryKey: ['chapter', slug, String(chapterNumber)],
    queryFn: () => getChapterByNumber(slug, chapterNumber),
    enabled: Boolean(slug && chapterNumber !== undefined && chapterNumber !== ''),
  })
}
