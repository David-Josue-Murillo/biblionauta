import { Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'

interface StatsCardProps {
  icon: string
  value: string | number
  label: string
  color?: string
}

export function StatsCard({
  icon,
  value,
  label,
  color = COLORS.accent.primary,
}: StatsCardProps) {
  return (
    <View
      className="flex-1 items-center rounded-2xl border py-4"
      style={{
        backgroundColor: COLORS.background.secondary,
        borderColor: COLORS.border.primary,
      }}
    >
      <View
        className="mb- h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}20` }}
      >
        <Text className="text-2xl">{icon}</Text>
      </View>
      <Text className="mb-1 text-2xl font-bold text-white">{value}</Text>
      <Text className="text-center text-sm text-zinc-400">{label}</Text>
    </View>
  )
}
