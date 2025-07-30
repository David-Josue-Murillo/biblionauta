import { Pressable, Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'

export default function BookshelfHeader({ books }) {
  return (
    <View className="mx-4 mb-4 mt-8">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-white">
            📚 Mi Biblioteca
          </Text>
          <Text className="text-sm text-zinc-400">
            {books.length} libros en tu colección
          </Text>
        </View>
        <Pressable
          className="rounded-xl bg-amber-500 px-4 py-2"
          accessible
          accessibilityLabel="Agregar libro"
          accessibilityHint="Toca para buscar y agregar un nuevo libro"
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#d97706' : COLORS.accent.primary },
          ]}
        >
          <Text className="font-semibold text-white">+ Agregar</Text>
        </Pressable>
      </View>
    </View>
  )
}
