import { Text, View } from 'react-native'

interface ReadingStatsMainProps {
  totalBooks: number
  totalPages: number
  readingStreak: number
  formatNumber: (num: number) => string
}

// Estadísticas principales de lectura
export function ReadingStatsMain({ totalBooks, totalPages, readingStreak, formatNumber }: ReadingStatsMainProps) {
  return (
    <View className="flex-row justify-between">
      <View className="flex-1 items-center">
        <Text className="text-2xl font-bold text-white">{formatNumber(totalBooks)}</Text>
        <Text className="text-center text-xs text-zinc-400">Total libros</Text>
      </View>
      <View className="flex-1 items-center">
        <Text className="text-2xl font-bold text-white">{formatNumber(totalPages)}</Text>
        <Text className="text-center text-xs text-zinc-400">Páginas leídas</Text>
      </View>
      <View className="flex-1 items-center">
        <Text className="text-2xl font-bold text-white">{readingStreak}</Text>
        <Text className="text-center text-xs text-zinc-400">Días seguidos</Text>
      </View>
    </View>
  )
}
