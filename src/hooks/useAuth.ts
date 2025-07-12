import { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../contexts/AuthContext'

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
