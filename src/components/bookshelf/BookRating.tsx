import { View, Text } from 'react-native'

interface BookRatingProps {
  rating?: number
}

// Muestra la calificación personal del libro
export function BookRating({ rating }: BookRatingProps) {
  if (!rating) return null
  return (
    <View className="flex-row items-center">
      <Text className="mr-1 text-xs text-yellow-400">★</Text>
      <Text className="text-xs text-white">{rating}</Text>
    </View>
  )
}
