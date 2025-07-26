import { ActivityIndicator, View } from 'react-native'
import { COLORS } from '../../constants/colors'
import { InlineProgressIndicatorProps } from '../../types/ui/progressIndicator'

// Indicador de progreso inline reutilizable
export function InlineProgressIndicator({ isLoading, children }: InlineProgressIndicatorProps) {
  return (
    <View className="relative">
      {children}
      {isLoading && (
        <View className="absolute inset-0 items-center justify-center rounded-xl bg-black bg-opacity-30">
          <ActivityIndicator size="small" color={COLORS.accent.primary} />
        </View>
      )}
    </View>
  )
}
