import { Pressable, Text, View } from 'react-native'

interface BooksSectionHeaderProps {
  title: string
  icon: string
  count: number
  onPress?: () => void
}

// Header para cada sección de libros
export function BooksSectionHeader({ title, icon, count, onPress }: BooksSectionHeaderProps) {
  return (
    <View className="mx-4 mb-3 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Text className="mr-2 text-2xl">{icon}</Text>
        <Text className="text-lg font-bold text-white">{title}</Text>
        <Text className="ml-2 text-sm text-zinc-400">({count})</Text>
      </View>
      {onPress && (
        <Pressable onPress={onPress} accessibilityRole="button">
          <Text className="text-sm text-zinc-400">Ver todos</Text>
        </Pressable>
      )}
    </View>
  )
}
