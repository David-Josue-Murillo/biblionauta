import { Image, Pressable, Text, View } from 'react-native'
import { BookRatingStars } from '../ui/BookRatingStars'
import { formatRecentBookDate } from '../../utils/profile/recentBookHelpers'
import { RecentBookCardProps } from '../../types/profile/recentBookCard'

export function RecentBookCard({ book, onPress }: RecentBookCardProps) {
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
        <BookRatingStars rating={book.rating} />
      </View>
      <Text className="text-xs text-zinc-500">{formatRecentBookDate(book.readAt)}</Text>
    </Pressable>
  )
}
