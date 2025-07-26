import { ActivityIndicator, Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'
import { ProgressIndicatorProps } from '../../types/ui/progressIndicator'
import { progressIndicatorMessages } from '../../constants/ui/progressIndicatorMessages'

// Modal de indicador de progreso reutilizable
export function ProgressIndicatorModal({ isLoading, message = progressIndicatorMessages.default, size = 'small' }: ProgressIndicatorProps) {
  if (!isLoading) return null
  return (
    <View className="absolute inset-0 z-50 items-center justify-center bg-black bg-opacity-50">
      <View
        className="items-center rounded-xl bg-zinc-800 p-6"
        style={{ borderWidth: 1, borderColor: COLORS.border.muted }}
      >
        <ActivityIndicator size={size} color={COLORS.accent.primary} className="mb-3" />
        <Text className="text-base font-medium text-white">{message}</Text>
      </View>
    </View>
  )
}
