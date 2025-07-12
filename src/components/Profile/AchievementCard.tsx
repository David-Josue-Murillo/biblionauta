import { View, Text, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'

interface AchievementCardProps {
  achievement: {
    id: string
    title: string
    description: string
    icon: string
    unlockedAt: Date
  }
  onPress?: () => void
}

export function AchievementCard({
  achievement,
  onPress,
}: AchievementCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <Pressable onPress={onPress} className="items-center">
      <View
        className="relative mb-2 h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: COLORS.accent.primary }}
      >
        <Text className="text-2xl">{achievement.icon}</Text>
        <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-green-500">
          <Text className="text-xs text-white">✓</Text>
        </View>
      </View>
      <Text
        className="mb-1 text-center text-xs font-medium text-white"
        numberOfLines={2}
      >
        {achievement.title}
      </Text>
      <Text className="text-center text-xs text-zinc-500" numberOfLines={1}>
        {formatDate(achievement.unlockedAt)}
      </Text>
    </Pressable>
  )
}
