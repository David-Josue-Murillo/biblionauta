import { Pressable, Text, View } from 'react-native'

interface PersonalCollectionsHeaderProps {
  onPress?: () => void
}

// Header para la sección de colecciones personales
export function PersonalCollectionsHeader({ onPress }: PersonalCollectionsHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-lg font-bold text-white">📁 Colecciones</Text>
      <Pressable onPress={onPress} accessibilityRole="button">
        <Text className="text-sm text-zinc-400">Gestionar</Text>
      </Pressable>
    </View>
  )
}
