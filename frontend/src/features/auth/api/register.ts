import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { RegisterCredentials, AuthResponse } from '../types'

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  return apiClient.post<AuthResponse>('/auth/register', credentials)
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => register(credentials),
  })
}
