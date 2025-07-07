import { View, Text, ScrollView, Pressable } from "react-native";
import { COLORS } from '../../constants/colors';
import { Achievement } from '../../mocks/bookshelfData';

interface AchievementsSectionProps {
  achievements: Achievement[];
  onPress?: () => void;
}

export function AchievementsSection({ achievements, onPress }: AchievementsSectionProps) {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <View className="mx-4 mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-white">🏆 Logros</Text>
        <Pressable onPress={onPress}>
          <Text className="text-zinc-400 text-sm">Ver todos</Text>
        </Pressable>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {/* Logros desbloqueados */}
        {unlockedAchievements.map((achievement) => (
          <View
            key={achievement.id}
            className="mr-4 rounded-xl p-4 min-w-[120px]"
            style={{ 
              backgroundColor: COLORS.background.secondary, 
              borderWidth: 1, 
              borderColor: COLORS.accent.primary 
            }}
            accessible
            accessibilityLabel={`Logro desbloqueado: ${achievement.title}`}
            accessibilityHint={achievement.description}
          >
            <Text className="text-2xl mb-2 text-center">{achievement.icon}</Text>
            <Text className="text-white text-sm font-semibold text-center mb-1">
              {achievement.title}
            </Text>
            <Text className="text-zinc-400 text-xs text-center">
              {achievement.description}
            </Text>
            {achievement.unlockedDate && (
              <Text className="text-zinc-500 text-xs text-center mt-2">
                {new Date(achievement.unlockedDate).toLocaleDateString('es-ES')}
              </Text>
            )}
          </View>
        ))}

        {/* Logros bloqueados */}
        {lockedAchievements.map((achievement) => (
          <View
            key={achievement.id}
            className="mr-4 rounded-xl p-4 min-w-[120px] opacity-50"
            style={{ 
              backgroundColor: COLORS.background.secondary, 
              borderWidth: 1, 
              borderColor: COLORS.border.muted 
            }}
            accessible
            accessibilityLabel={`Logro bloqueado: ${achievement.title}`}
            accessibilityHint={achievement.description}
          >
            <Text className="text-2xl mb-2 text-center text-zinc-500">🔒</Text>
            <Text className="text-zinc-500 text-sm font-semibold text-center mb-1">
              {achievement.title}
            </Text>
            <Text className="text-zinc-600 text-xs text-center">
              {achievement.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
} 