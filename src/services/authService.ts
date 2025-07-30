import {
  createUserWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth'
import { auth } from '../config/firebase' 
import { handleAuthError } from '../utils/auth/handleAuthError'

// Tipos auxiliares
export interface AuthUser extends User {}

// Crear cuenta con email y contraseña
export async function createAccount(
  email: string,
  password: string,
  displayName: string,
): Promise<AuthUser> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
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
export async function signIn(
  email: string,
  password: string,
): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
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
