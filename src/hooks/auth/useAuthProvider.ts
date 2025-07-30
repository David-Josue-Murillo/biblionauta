import { useEffect, useState } from 'react'
import { AuthUser } from '../../services/authService'
import * as authService from '../../services/authService'

export function useAuthProvider() {
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

  async function signIn(email: string, password: string) {
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

  async function createAccount(email: string, password: string, displayName: string) {
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

  async function signOut() {
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

  async function resetPassword(email: string) {
    try {
      setError(null)
      await authService.resetPassword(email)
      return true
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  function clearError() {
    setError(null)
  }

  return {
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
}
