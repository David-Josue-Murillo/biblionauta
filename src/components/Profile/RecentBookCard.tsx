import { View, Text, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface RecentBookCardProps {
  book: {
    id: string
    title: string
    author: string
    coverURL: string
    rating: number
    readAt: Date
  }
  onPress?: () => void
}

export function RecentBookCard({ book, onPress }: RecentBookCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? 'star' : 'star-outline'}
        size={10}
        color={i < rating ? '#FFD700' : '#666'}
      />
    ))
  }

  return (
    <Pressable onPress={onPress} className="mr-4 w-32">
      <View className="relative">
        <Image
          source={{ uri: book.coverURL }}
          className="mb-2 h-48 w-32 rounded-lg"
        />
        <View className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1">
          <Text className="text-xs font-medium text-white">
            {book.rating}/5
          </Text>
        </View>
      </View>

      <Text className="mb-1 text-sm font-semibold text-white" numberOfLines={2}>
        {book.title}
      </Text>
      <Text className="mb-2 text-xs text-zinc-400" numberOfLines={1}>
        {book.author}
      </Text>
      <View className="mb-1 flex-row items-center">
        {renderStars(book.rating)}
      </View>
      <Text className="text-xs text-zinc-500">{formatDate(book.readAt)}</Text>
    </Pressable>
  )
}
