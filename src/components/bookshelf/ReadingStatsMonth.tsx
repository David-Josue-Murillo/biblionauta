import { Text, View } from 'react-native'

interface ReadingStatsMonthProps {
  booksThisMonth: number
  pagesThisMonth: number
  averageRating: number
  formatNumber: (num: number) => string
}

// Estadísticas del mes de lectura
export function ReadingStatsMonth({ booksThisMonth, pagesThisMonth, averageRating, formatNumber }: ReadingStatsMonthProps) {
  return (
    <View className="mt-4 border-t border-zinc-700 pt-4">
      <Text className="mb-2 text-sm text-zinc-300">Este mes:</Text>
      <View className="flex-row justify-between">
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-white">{booksThisMonth}</Text>
          <Text className="text-xs text-zinc-400">Libros</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-white">{formatNumber(pagesThisMonth)}</Text>
          <Text className="text-xs text-zinc-400">Páginas</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-white">{averageRating.toFixed(1)}</Text>
          <Text className="text-xs text-zinc-400">Promedio</Text>
        </View>
      </View>
    </View>
  )
}
