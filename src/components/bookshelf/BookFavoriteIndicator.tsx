import { View, Text } from 'react-native'

interface BookFavoriteIndicatorProps {
  isFavorite: boolean
}

// Muestra un indicador de favorito en la tarjeta del libro
export function BookFavoriteIndicator({ isFavorite }: BookFavoriteIndicatorProps) {
  if (!isFavorite) return null
  return (
    <View
      className="absolute right-2 top-2 h-6 w-6 items-center justify-center rounded-full"
      style={{ backgroundColor: 'rgba(255, 105, 180, 0.9)', zIndex: 3 }}
    >
      <Text className="text-xs text-white">❤️</Text>
    </View>
  )
}
