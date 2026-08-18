import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { UnlockChapterResponse } from '../types'

export interface UnlockChapterParams {
  chapterId: string
  novelSlug?: string
  chapterNumber?: number | string
}

export const unlockChapter = async (
  chapterId: string,
): Promise<UnlockChapterResponse> => {
  return apiClient.post<UnlockChapterResponse>(`/chapters/${chapterId}/unlock`)
}

export const useUnlockChapter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ chapterId }: UnlockChapterParams) => unlockChapter(chapterId),
    onSuccess: (_, variables) => {
      // Invalidate the active chapter query to immediately load full content
      if (variables.novelSlug && variables.chapterNumber !== undefined) {
        queryClient.invalidateQueries({
          queryKey: ['chapter', variables.novelSlug, String(variables.chapterNumber)],
        })
      } else {
        queryClient.invalidateQueries({ queryKey: ['chapter'] })
      }

      // Invalidate novel cache
      if (variables.novelSlug) {
        queryClient.invalidateQueries({
          queryKey: ['novel', variables.novelSlug],
        })
      }

      // Invalidate auth-user cache to synchronize coins across navbar and user profile
      queryClient.invalidateQueries({ queryKey: ['auth-user'] })
    },
  })
}
