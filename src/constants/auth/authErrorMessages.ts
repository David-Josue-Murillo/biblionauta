// Mensajes de error para autenticación
export const authErrorMessages: Record<string, string> = {
  'auth/user-not-found': 'No existe una cuenta con este email',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/email-already-in-use': 'Ya existe una cuenta con este email',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
  'auth/invalid-email': 'Email inválido',
  'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
  'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
  'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
}
