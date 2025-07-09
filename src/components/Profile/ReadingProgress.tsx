import { View, Text } from "react-native";
import { COLORS } from "../../constants/colors";

interface ReadingProgressProps {
  current: number;
  goal: number;
  label: string;
}

export function ReadingProgress({ current, goal, label }: ReadingProgressProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-zinc-400 text-sm">{label}</Text>
        <Text className="text-white font-semibold text-sm">
          {current}/{goal}
        </Text>
      </View>
      <View className="w-full h-3 bg-zinc-700 rounded-full overflow-hidden">
        <View 
          className="h-3 rounded-full"
          style={{ 
            backgroundColor: COLORS.accent.primary,
            width: `${percentage}%`
          }}
        />
      </View>
    </View>
  );
} 