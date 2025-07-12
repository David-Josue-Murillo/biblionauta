import { View, Text, ScrollView, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'

interface Collection {
  id: string
  name: string
  description: string
  bookCount: number
  color: string
}

interface PersonalCollectionsProps {
  collections: Collection[]
  onPress?: () => void
  onCollectionPress?: (collectionId: string) => void
}

export function PersonalCollections({
  collections,
  onPress,
  onCollectionPress,
}: PersonalCollectionsProps) {
  if (collections.length === 0) {
    return null
  }

  return (
    <View className="mx-4 mb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">📁 Colecciones</Text>
        <Pressable onPress={onPress}>
          <Text className="text-sm text-zinc-400">Gestionar</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {collections.map(collection => (
          <Pressable
            key={collection.id}
            className="mr-4 min-w-[160px] rounded-xl p-4"
            style={{
              backgroundColor: COLORS.background.secondary,
              borderWidth: 1,
              borderColor: collection.color,
            }}
            onPress={() => onCollectionPress?.(collection.id)}
            accessible
            accessibilityLabel={`Colección: ${collection.name}`}
            accessibilityHint={`${collection.bookCount} libros en esta colección`}
          >
            <View className="mb-2 flex-row items-center justify-between">
              <View
                className="h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: collection.color }}
              >
                <Text className="text-sm font-bold text-white">
                  {collection.name.charAt(0)}
                </Text>
              </View>
              <Text className="text-xs text-zinc-400">
                {collection.bookCount} libros
              </Text>
            </View>

            <Text className="mb-1 text-sm font-semibold text-white">
              {collection.name}
            </Text>
            <Text className="text-xs text-zinc-400">
              {collection.description}
            </Text>
          </Pressable>
        ))}

        {/* Botón para crear nueva colección */}
        <Pressable
          className="mr-4 min-w-[160px] items-center justify-center rounded-xl border-2 border-dashed border-zinc-600 p-4"
          onPress={onPress}
          accessible
          accessibilityLabel="Crear nueva colección"
          accessibilityHint="Toca para crear una nueva colección personalizada"
        >
          <Text className="mb-2 text-4xl">+</Text>
          <Text className="text-center text-sm text-zinc-400">
            Nueva colección
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}
