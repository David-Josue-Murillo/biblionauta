import { View, Text, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { ReadingStats as ReadingStatsData } from '../../mocks/bookshelfData'

interface ReadingStatsProps {
  stats: ReadingStatsData
  onPress?: () => void
}

export function ReadingStats({ stats, onPress }: ReadingStatsProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString('es-ES')
  }

  const getProgressPercentage = () => {
    return Math.round((stats.goalProgress / stats.readingGoal) * 100)
  }

  return (
    <Pressable
      className="mx-4 mb-6 rounded-2xl p-6"
      style={{
        backgroundColor: COLORS.background.secondary,
        borderWidth: 1,
        borderColor: COLORS.border.primary,
      }}
      onPress={onPress}
      accessible
      accessibilityLabel="Estadísticas de lectura"
      accessibilityHint="Toca para ver estadísticas detalladas"
    >
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">📊 Estadísticas</Text>
        <Text className="text-sm text-zinc-400">Ver más</Text>
      </View>

      {/* Progreso del objetivo anual */}
      <View className="mb-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-sm text-zinc-300">Objetivo anual</Text>
          <Text className="font-semibold text-white">
            {stats.goalProgress}/{stats.readingGoal} libros
          </Text>
        </View>
        <View className="h-2 overflow-hidden rounded-full bg-zinc-700">
          <View
            className="h-full rounded-full"
            style={{
              backgroundColor: COLORS.accent.primary,
              width: `${getProgressPercentage()}%`,
            }}
          />
        </View>
        <Text className="mt-1 text-xs text-zinc-400">
          {getProgressPercentage()}% completado
        </Text>
      </View>

      {/* Estadísticas principales */}
      <View className="flex-row justify-between">
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-white">
            {formatNumber(stats.totalBooks)}
          </Text>
          <Text className="text-center text-xs text-zinc-400">
            Total libros
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-white">
            {formatNumber(stats.totalPages)}
          </Text>
          <Text className="text-center text-xs text-zinc-400">
            Páginas leídas
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-white">
            {stats.readingStreak}
          </Text>
          <Text className="text-center text-xs text-zinc-400">
            Días seguidos
          </Text>
        </View>
      </View>

      {/* Estadísticas del mes */}
      <View className="mt-4 border-t border-zinc-700 pt-4">
        <Text className="mb-2 text-sm text-zinc-300">Este mes:</Text>
        <View className="flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="text-lg font-bold text-white">
              {stats.booksThisMonth}
            </Text>
            <Text className="text-xs text-zinc-400">Libros</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-lg font-bold text-white">
              {formatNumber(stats.pagesThisMonth)}
            </Text>
            <Text className="text-xs text-zinc-400">Páginas</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-lg font-bold text-white">
              {stats.averageRating.toFixed(1)}
            </Text>
            <Text className="text-xs text-zinc-400">Promedio</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
