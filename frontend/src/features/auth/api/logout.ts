import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'

export const logoutApi = async (): Promise<void> => {
  try {
    await apiClient.post<void>('/auth/logout')
  } catch (err) {
    console.error('Logout error:', err)
  }
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
  })
}
