import { Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'

interface ReadingGoalProgressProps {
  goalProgress: number
  readingGoal: number
}

// Barra de progreso del objetivo anual de lectura
export function ReadingGoalProgress({ goalProgress, readingGoal }: ReadingGoalProgressProps) {
  const progress = Math.round((goalProgress / readingGoal) * 100)
  return (
    <View className="mb-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm text-zinc-300">Objetivo anual</Text>
        <Text className="font-semibold text-white">
          {goalProgress}/{readingGoal} libros
        </Text>
      </View>
      <View className="h-2 overflow-hidden rounded-full bg-zinc-700">
        <View
          className="h-full rounded-full"
          style={{ backgroundColor: COLORS.accent.primary, width: `${progress}%` }}
        />
      </View>
      <Text className="mt-1 text-xs text-zinc-400">{progress}% completado</Text>
    </View>
  )
}
