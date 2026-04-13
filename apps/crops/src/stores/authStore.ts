import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../lib/api'

interface AuthState {
  accessToken: string | null
  user: { id: string; role: string } | null
  login: (phone: string, password: string) => Promise<void>
  logout: () => void
  refreshTokens: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,

      login: async (phone, password) => {
        const { data } = await api.post('/auth/login', { phone, password })
        set({ accessToken: data.accessToken, user: data.user })
        localStorage.setItem('refreshToken', data.refreshToken)
      },

      logout: () => {
        set({ accessToken: null, user: null })
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      },

      refreshTokens: async () => {
        try {
          const rt = localStorage.getItem('refreshToken')
          if (!rt) return false
          const { data } = await api.post('/auth/refresh', { refreshToken: rt })
          set({ accessToken: data.accessToken })
          localStorage.setItem('refreshToken', data.refreshToken)
          return true
        } catch {
          return false
        }
      }
    }),
    { name: 'auth-storage', partialize: (s) => ({ user: s.user }) }
  )
)
