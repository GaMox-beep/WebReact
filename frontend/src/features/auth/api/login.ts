import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../../../lib/api-client'
import type { LoginCredentials, AuthResponse } from '../types'

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  return apiClient.post<AuthResponse>('/auth/login', credentials)
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
  })
}
