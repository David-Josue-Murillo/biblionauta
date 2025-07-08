import { View, Text, ScrollView, Pressable } from "react-native";
import { COLORS } from '../../constants/colors';

interface Collection {
  id: string;
  name: string;
  description: string;
  bookCount: number;
  color: string;
}

interface PersonalCollectionsProps {
  collections: Collection[];
  onPress?: () => void;
  onCollectionPress?: (collectionId: string) => void;
}

export function PersonalCollections({ 
  collections, 
  onPress, 
  onCollectionPress 
}: PersonalCollectionsProps) {
  if (collections.length === 0) {
    return null;
  }

  return (
    <View className="mx-4 mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-white">📁 Colecciones</Text>
        <Pressable onPress={onPress}>
          <Text className="text-zinc-400 text-sm">Gestionar</Text>
        </Pressable>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {collections.map((collection) => (
          <Pressable
            key={collection.id}
            className="mr-4 rounded-xl p-4 min-w-[160px]"
            style={{ 
              backgroundColor: COLORS.background.secondary, 
              borderWidth: 1, 
              borderColor: collection.color 
            }}
            onPress={() => onCollectionPress?.(collection.id)}
            accessible
            accessibilityLabel={`Colección: ${collection.name}`}
            accessibilityHint={`${collection.bookCount} libros en esta colección`}
          >
            <View className="flex-row items-center justify-between mb-2">
              <View 
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: collection.color }}
              >
                <Text className="text-white text-sm font-bold">
                  {collection.name.charAt(0)}
                </Text>
              </View>
              <Text className="text-zinc-400 text-xs">
                {collection.bookCount} libros
              </Text>
            </View>
            
            <Text className="text-white text-sm font-semibold mb-1">
              {collection.name}
            </Text>
            <Text className="text-zinc-400 text-xs">
              {collection.description}
            </Text>
          </Pressable>
        ))}

        {/* Botón para crear nueva colección */}
        <Pressable
          className="mr-4 rounded-xl p-4 min-w-[160px] border-2 border-dashed border-zinc-600 items-center justify-center"
          onPress={onPress}
          accessible
          accessibilityLabel="Crear nueva colección"
          accessibilityHint="Toca para crear una nueva colección personalizada"
        >
          <Text className="text-4xl mb-2">+</Text>
          <Text className="text-zinc-400 text-sm text-center">
            Nueva colección
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
} 