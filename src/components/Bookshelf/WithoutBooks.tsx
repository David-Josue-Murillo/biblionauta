import { Pressable, Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'

export default function WithoutBooks({ books }) {
  const bookLength = books.length === 0 && (
    <View className="mx-4 mt-8 items-center">
      <Text className="mb-4 text-6xl">📚</Text>
      <Text className="mb-2 text-lg font-semibold text-white">
        Tu biblioteca está vacía
      </Text>
      <Text className="mb-6 text-center text-zinc-400">
        Comienza agregando libros a tu colección personal. Busca tus títulos
        favoritos y organízalos como prefieras.
      </Text>
      <Pressable
        className="rounded-xl bg-amber-500 px-6 py-3"
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#d97706' : COLORS.accent.primary },
        ]}
      >
        <Text className="font-semibold text-white">Buscar libros</Text>
      </Pressable>
    </View>
  )
  return bookLength
}
