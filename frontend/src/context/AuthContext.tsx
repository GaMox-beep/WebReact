import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface User {
  id: string
  email: string
  username: string
  role: 'USER' | 'AUTHOR' | 'ADMIN'
  avatar?: string
  coins: number
}

interface AuthContextType {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  login: (data: any) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => Promise<void>
}

const API_BASE_URL = 'http://localhost:3000/api'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken')
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    } else {
      localStorage.removeItem('accessToken')
    }
  }, [accessToken])

  const login = async (credentials: { email: string; password: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Đăng nhập thất bại')
    }

    setUser(data.user)
    setAccessToken(data.accessToken)
  }

  const register = async (credentials: { email: string; username: string; password: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Đăng ký thất bại')
    }

    setUser(data.user)
    setAccessToken(data.accessToken)
  }

  const logout = async () => {
    if (accessToken) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
      } catch (err) {
        console.error('Logout error:', err)
      }
    }

    setUser(null)
    setAccessToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user && !!accessToken,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
