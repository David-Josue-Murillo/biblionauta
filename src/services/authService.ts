import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  User
} from 'firebase/auth'
import { auth } from '../config/firebase'

// Tipos auxiliares
export interface AuthUser extends User {}

const errorMessages: Record<string, string> = {
  'auth/user-not-found': 'No existe una cuenta con este email',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/email-already-in-use': 'Ya existe una cuenta con este email',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
  'auth/invalid-email': 'Email inválido',
  'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
  'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
  'auth/network-request-failed': 'Error de conexión. Verifica tu internet'
}

function handleAuthError(error: any): Error {
  return new Error(errorMessages[error.code] || 'Error desconocido')
}

// Crear cuenta con email y contraseña
export async function createAccount(email: string, password: string, displayName: string): Promise<AuthUser> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await updateProfile(user, { displayName })
    await sendEmailVerification(user)
    return user as AuthUser
  } catch (error: any) {
    console.error('Error al crear cuenta:', error)
    throw handleAuthError(error)
  }
}

// Iniciar sesión con email y contraseña
export async function signIn(email: string, password: string): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user as AuthUser
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error)
    throw handleAuthError(error)
  }
}

// Cerrar sesión
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    throw error
  }
}

// Recuperar contraseña
export async function resetPassword(email: string): Promise<boolean> {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (error: any) {
    console.error('Error al enviar email de recuperación:', error)
    throw handleAuthError(error)
  }
}

// Observar cambios de autenticación
export function onAuthStateChanged(callback: (user: AuthUser | null) => void) {
  return firebaseOnAuthStateChanged(auth, callback)
}

// Obtener usuario actual
export function getCurrentUser(): AuthUser | null {
  return auth.currentUser as AuthUser | null
} 