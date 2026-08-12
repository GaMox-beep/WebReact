import type { User } from '../../../types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  username: string
  password: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}
