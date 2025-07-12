import { View, Text, ScrollView, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { Achievement } from '../../mocks/bookshelfData'

interface AchievementsSectionProps {
  achievements: Achievement[]
  onPress?: () => void
}

export function AchievementsSection({
  achievements,
  onPress,
}: AchievementsSectionProps) {
  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const lockedAchievements = achievements.filter(a => !a.unlocked)

  return (
    <View className="mx-4 mb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">🏆 Logros</Text>
        <Pressable onPress={onPress}>
          <Text className="text-sm text-zinc-400">Ver todos</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {/* Logros desbloqueados */}
        {unlockedAchievements.map(achievement => (
          <View
            key={achievement.id}
            className="mr-4 min-w-[120px] rounded-xl p-4"
            style={{
              backgroundColor: COLORS.background.secondary,
              borderWidth: 1,
              borderColor: COLORS.accent.primary,
            }}
            accessible
            accessibilityLabel={`Logro desbloqueado: ${achievement.title}`}
            accessibilityHint={achievement.description}
          >
            <Text className="mb-2 text-center text-2xl">
              {achievement.icon}
            </Text>
            <Text className="mb-1 text-center text-sm font-semibold text-white">
              {achievement.title}
            </Text>
            <Text className="text-center text-xs text-zinc-400">
              {achievement.description}
            </Text>
            {achievement.unlockedDate && (
              <Text className="mt-2 text-center text-xs text-zinc-500">
                {new Date(achievement.unlockedDate).toLocaleDateString('es-ES')}
              </Text>
            )}
          </View>
        ))}

        {/* Logros bloqueados */}
        {lockedAchievements.map(achievement => (
          <View
            key={achievement.id}
            className="mr-4 min-w-[120px] rounded-xl p-4 opacity-50"
            style={{
              backgroundColor: COLORS.background.secondary,
              borderWidth: 1,
              borderColor: COLORS.border.muted,
            }}
            accessible
            accessibilityLabel={`Logro bloqueado: ${achievement.title}`}
            accessibilityHint={achievement.description}
          >
            <Text className="mb-2 text-center text-2xl text-zinc-500">🔒</Text>
            <Text className="mb-1 text-center text-sm font-semibold text-zinc-500">
              {achievement.title}
            </Text>
            <Text className="text-center text-xs text-zinc-600">
              {achievement.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
