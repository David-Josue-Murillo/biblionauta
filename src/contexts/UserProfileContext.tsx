import { createContext, useContext, ReactNode } from 'react'
import { useUserProfileState, UserProfileAction } from '../hooks/profile/useUserProfileState'
import { UserData } from '../mocks/profileData'

interface UserProfileState {
  user: UserData | null
  isLoading: boolean
  error: string | null
  isEditing: boolean
}

interface UserProfileContextType {
  state: UserProfileState
  dispatch: React.Dispatch<UserProfileAction>
  updateUser: (updates: Partial<UserData>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  setEditing: (editing: boolean) => void
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined)

interface UserProfileProviderProps {
  children: ReactNode
}

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const value = useUserProfileState()
  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>
}

export function useUserProfile() {
  const context = useContext(UserProfileContext)
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider')
  }
  return context
}
