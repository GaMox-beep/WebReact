import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/api-client'
import type { User } from '../types'

export type { User }

export interface AuthContextType {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoadingUser: boolean
  setAccessToken: (token: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken')
  })

  // Synchronize token state with localStorage
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    } else {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user') // Clear any legacy user key
    }
  }, [accessToken])

  // Single Source of Truth for User Profile & Coins via TanStack Query
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth-user'],
    queryFn: () => apiClient.get<User>('/users/me'),
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 5,
    retry: false,
  })

  const logout = () => {
    setAccessToken(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    queryClient.removeQueries({ queryKey: ['auth-user'] })
  }

  return (
    <AuthContext.Provider
      value={{
        user: accessToken ? (user ?? null) : null,
        accessToken,
        isAuthenticated: Boolean(accessToken && user),
        isLoadingUser,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = useAuth
