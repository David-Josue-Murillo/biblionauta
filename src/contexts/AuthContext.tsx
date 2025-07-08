import { createContext } from 'react'
import { AuthUser } from '../services/authService'

export interface AuthContextProps {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<AuthUser>
  createAccount: (email: string, password: string, displayName: string) => Promise<AuthUser>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<boolean>
  clearError: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined) 