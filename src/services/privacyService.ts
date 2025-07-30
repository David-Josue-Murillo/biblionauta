import { PrivacySetting } from '../types/privacy'

export async function getPrivacySettings(): Promise<PrivacySetting[]> {
  // Aquí iría la llamada real a la API
  // Por ahora simulamos una llamada asíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'profile-visible',
          title: 'Perfil público',
          description: 'Permitir que otros usuarios vean tu perfil',
          value: true,
          category: 'profile',
        },
        {
          id: 'reading-activity',
          title: 'Actividad de lectura',
          description: 'Mostrar qué libros estás leyendo',
          value: true,
          category: 'activity',
        },
        {
          id: 'reviews-public',
          title: 'Reseñas públicas',
          description: 'Hacer públicas tus reseñas de libros',
          value: true,
          category: 'activity',
        },
        {
          id: 'email-notifications',
          title: 'Notificaciones por email',
          description: 'Recibir notificaciones por correo electrónico',
          value: true,
          category: 'notifications',
        },
        {
          id: 'push-notifications',
          title: 'Notificaciones push',
          description: 'Recibir notificaciones en el dispositivo',
          value: true,
          category: 'notifications',
        },
      ])
    }, 500)
  })
}

export async function updatePrivacySettings(settings: PrivacySetting[]): Promise<void> {
  // Aquí iría la llamada real a la API
  // Por ahora simulamos una llamada asíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulamos éxito en la actualización
      // En caso de error, se llamaría a reject(new Error('Error message'))
      console.log('Configuraciones de privacidad actualizadas:', settings)
      resolve()
    }, 1000)
  })
} 