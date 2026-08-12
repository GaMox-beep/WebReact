import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { User } from '../../../types'

export const getProfile = async (): Promise<User> => {
  return apiClient.get<User>('/users/me')
}

export const useProfile = (enabled = true) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled,
    staleTime: 1000 * 60 * 5,
  })
}
