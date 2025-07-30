import { Pressable, Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'

interface CollectionCardProps {
  id: string
  name: string
  description: string
  bookCount: number
  color: string
  onPress?: (id: string) => void
}

// Card para mostrar una colección individual
export function CollectionCard({ id, name, description, bookCount, color, onPress }: CollectionCardProps) {
  return (
    <Pressable
      className="mr-4 min-w-[160px] rounded-xl p-4"
      style={{ backgroundColor: COLORS.background.secondary, borderWidth: 1, borderColor: color }}
      onPress={() => onPress?.(id)}
      accessible
      accessibilityLabel={`Colección: ${name}`}
      accessibilityHint={`${bookCount} libros en esta colección`}
    >
      <View className="mb-2 flex-row items-center justify-between">
        <View className="h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: color }}>
          <Text className="text-sm font-bold text-white">{name.charAt(0)}</Text>
        </View>
        <Text className="text-xs text-zinc-400">{bookCount} libros</Text>
      </View>
      <Text className="mb-1 text-sm font-semibold text-white">{name}</Text>
      <Text className="text-xs text-zinc-400">{description}</Text>
    </Pressable>
  )
}
