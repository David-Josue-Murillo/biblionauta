import { View, Text } from 'react-native'

interface BookProgressBarProps {
  currentPage: number
  totalPages: number
  progress: number
  color: string
}

// Barra de progreso de lectura del libro
export function BookProgressBar({ currentPage, totalPages, progress, color }: BookProgressBarProps) {
  return (
    <View className="mb-2">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-xs text-zinc-400">
          Página {currentPage} de {totalPages}
        </Text>
        <Text className="text-xs text-zinc-400">{progress}%</Text>
      </View>
      <View className="h-1 overflow-hidden rounded-full bg-zinc-700">
        <View
          className="h-full rounded-full"
          style={{ backgroundColor: color, width: `${progress}%` }}
        />
      </View>
    </View>
  )
}
