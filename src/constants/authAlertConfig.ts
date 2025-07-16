import { colors } from '../constants/theme'
import { AuthAlertType } from '../types/authAlert'

export const AUTH_ALERT_CONFIG: Record<AuthAlertType, {
  background: string
  border: string
  text: string
  icon: string
}> = {
  success: {
    background: `${colors.success}40`,
    border: colors.success,
    text: colors.text,
    icon: '✅',
  },
  warning: {
    background: `${colors.warning}40`,
    border: colors.warning,
    text: colors.text,
    icon: '⚠️',
  },
  error: {
    background: `${colors.error}40`,
    border: colors.error,
    text: colors.text,
    icon: '❌',
  },
} 