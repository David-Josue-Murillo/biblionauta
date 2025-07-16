export type AuthAlertType = 'error' | 'success' | 'warning'

export interface AuthAlertProps {
  visible: boolean
  message: string
  type?: AuthAlertType
  onClose?: () => void
  autoHide?: boolean
  duration?: number
} 