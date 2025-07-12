import { useEffect } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { useAuth } from '../../hooks/useAuth'
import { router } from 'expo-router'

const AuthWrapper = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Usuario autenticado, ir a la app principal
        router.replace('/(tabs)')
      } else {
        // Usuario no autenticado, ir a pantalla de auth
        router.replace('/auth')
      }
    }
  }, [isLoading, isAuthenticated])

  // Mostrar loading mientras se verifica el estado de autenticación
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-lg text-gray-600">Cargando...</Text>
      </View>
    )
  }

  return children
}

export default AuthWrapper
