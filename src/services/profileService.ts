import { EditProfileForm } from '../types/profile'

export async function updateProfile(data: EditProfileForm): Promise<void> {
  // Aquí iría la llamada real a la API
  // Por ahora simulamos una llamada asíncrona
  // TODO: Usar data para enviar al servidor
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulamos éxito en la actualización
      // En caso de error, se llamaría a reject(new Error('Error message'))
      resolve()
    }, 1000)
  })
}

export async function getProfile(): Promise<EditProfileForm> {
  // Aquí iría la llamada real para obtener el perfil actual
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Usuario Ejemplo',
        email: 'usuario@ejemplo.com',
        avatarUrl: undefined,
      })
    }, 500)
  })
} 