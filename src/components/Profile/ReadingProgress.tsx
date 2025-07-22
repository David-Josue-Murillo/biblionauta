import { Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'

interface ReadingProgressProps {
  current: number
  goal: number
  label: string
}

export function ReadingProgress({
  current,
  goal,
  label,
}: ReadingProgressProps) {
  const percentage = Math.min((current / goal) * 100, 100)

  return (
    <View className="mb-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm text-zinc-400">{label}</Text>
        <Text className="text-sm font-semibold text-white">
          {current}/{goal}
        </Text>
      </View>
      <View className="h-3 w-full overflow-hidden rounded-full bg-zinc-700">
        <View
          className="h-3 rounded-full"
          style={{
            backgroundColor: COLORS.accent.primary,
            width: `${percentage}%`,
          }}
        />
      </View>
    </View>
  )
}
