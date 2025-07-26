import { AuthContext, AuthContextProps } from './AuthContext'
import { useAuthProvider } from '../hooks/auth/useAuthProvider'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value: AuthContextProps = useAuthProvider()
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
