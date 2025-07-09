import { View, Text } from "react-native";
import { COLORS } from "../../constants/colors";

interface StatsCardProps {
  icon: string;
  value: string | number;
  label: string;
  color?: string;
}

export function StatsCard({ icon, value, label, color = COLORS.accent.primary }: StatsCardProps) {
  return (
    <View 
      className="flex-1 items-center py-4 rounded-xl"
      style={{ backgroundColor: COLORS.background.secondary }}
    >
      <View 
        className="w-12 h-12 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor: color + '20' }}
      >
        <Text className="text-2xl">{icon}</Text>
      </View>
      <Text className="text-2xl font-bold text-white mb-1">{value}</Text>
      <Text className="text-zinc-400 text-sm text-center">{label}</Text>
    </View>
  );
} 