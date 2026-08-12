const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export class ApiError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  const headers = new Headers(options.headers || {})

  // Attach Auth Token automatically from localStorage if available
  const token = localStorage.getItem('accessToken')
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // Handle JSON content-type if body is an object and not FormData
  if (options.body && !(options.body instanceof FormData) && typeof options.body === 'object') {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    options.body = JSON.stringify(options.body)
  }

  const config: RequestInit = {
    ...options,
    headers,
  }

  const res = await fetch(url, config)

  if (!res.ok) {
    let errorMessage = `HTTP Error ${res.status}`
    let errorData: unknown = null

    try {
      errorData = await res.json()
      if (errorData && typeof errorData === 'object' && 'message' in errorData) {
        const msg = (errorData as { message: unknown }).message
        errorMessage = Array.isArray(msg) ? msg.join(', ') : String(msg)
      }
    } catch {
      // Failed to parse JSON error, keep status message
    }

    throw new ApiError(errorMessage, res.status, errorData)
  }

  // Handle empty responses (204 No Content)
  if (res.status === 204) {
    return null as T
  }

  return res.json()
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'POST', body: body as BodyInit }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body: body as BodyInit }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
}
