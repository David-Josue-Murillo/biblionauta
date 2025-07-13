import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface StarRatingProps {
  rating: number
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={15}
          color="#FFD700"
          style={{ marginRight: 1 }}
        />
      ))}
    </View>
  )
}
