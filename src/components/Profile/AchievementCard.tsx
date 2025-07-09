import { View, Text, Pressable } from "react-native";
import { COLORS } from "../../constants/colors";

interface AchievementCardProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: Date;
  };
  onPress?: () => void;
}

export function AchievementCard({ achievement, onPress }: AchievementCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Pressable 
      onPress={onPress}
      className="items-center"
    >
      <View 
        className="w-16 h-16 rounded-full items-center justify-center mb-2 relative"
        style={{ backgroundColor: COLORS.accent.primary }}
      >
        <Text className="text-2xl">{achievement.icon}</Text>
        <View className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full items-center justify-center">
          <Text className="text-white text-xs">✓</Text>
        </View>
      </View>
      <Text className="text-white text-xs text-center font-medium mb-1" numberOfLines={2}>
        {achievement.title}
      </Text>
      <Text className="text-zinc-500 text-xs text-center" numberOfLines={1}>
        {formatDate(achievement.unlockedAt)}
      </Text>
    </Pressable>
  );
} 