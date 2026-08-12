export interface User {
  id: string
  email: string
  username: string
  role: 'USER' | 'AUTHOR' | 'ADMIN'
  avatar?: string
  coins: number
  createdAt?: string
}
