import { useState, useEffect } from 'react'
import { AuthContext, AuthContextProps } from './AuthContext'
import { AuthUser } from '../services/authService'
import * as authService from '../services/authService'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      setUser(user)
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const user = await authService.signIn(email, password)
      setUser(user)
      return user
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createAccount = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      setIsLoading(true)
      setError(null)
      const user = await authService.createAccount(email, password, displayName)
      setUser(user)
      return user
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await authService.signOut()
      setUser(null)
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      await authService.resetPassword(email)
      return true
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const clearError = () => setError(null)

  const value: AuthContextProps = {
    user,
    isLoading,
    error,
    signIn,
    createAccount,
    signOut,
    resetPassword,
    clearError,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
