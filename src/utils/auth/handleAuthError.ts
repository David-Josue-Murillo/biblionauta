import { authErrorMessages } from '../../constants/auth/authErrorMessages'

export function handleAuthError(error: any): Error {
  return new Error(authErrorMessages[error.code] || 'Error desconocido')
}
