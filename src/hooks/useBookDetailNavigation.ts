import { useNavigation } from 'expo-router'
import { COLORS } from '../constants/colors'

export const useBookDetailNavigation = (bookTitle?: string) => {
  const navigation = useNavigation()

  const handleGoBack = () => navigation.goBack()

  const getHeaderOptions = () => ({
    headerStyle: { backgroundColor: COLORS.accent.primary },
    headerTintColor: COLORS.background.primary,
    headerTitle: bookTitle || 'Detalles del libro',
  })

  return {
    handleGoBack,
    getHeaderOptions,
  }
}