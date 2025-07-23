import { Text, View } from 'react-native'

interface ReadingStatsHeaderProps {
  onPress?: () => void
}

// Header para la sección de estadísticas de lectura
export function ReadingStatsHeader({ onPress }: ReadingStatsHeaderProps) {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Text className="text-xl font-bold text-white">📊 Estadísticas</Text>
      <Text className="text-sm text-zinc-400" onPress={onPress} accessibilityRole="button">Ver más</Text>
    </View>
  )
}
