export interface LoginFormValues {
  email: string
  password: string
}

export interface UseLoginFormProps {
  onLoginSuccess?: () => void
  onSwitchToRegister: () => void
  onSwitchToReset: () => void
} 