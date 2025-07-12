import { View, Text, ActivityIndicator } from 'react-native'
import { COLORS } from '../../constants/colors'

interface ProgressIndicatorProps {
  isLoading: boolean
  message?: string
  size?: 'small' | 'large'
}

export function ProgressIndicator({
  isLoading,
  message = 'Actualizando...',
  size = 'small',
}: ProgressIndicatorProps) {
  if (!isLoading) return null

  return (
    <View className="absolute inset-0 z-50 items-center justify-center bg-black bg-opacity-50">
      <View
        className="items-center rounded-xl bg-zinc-800 p-6"
        style={{
          borderWidth: 1,
          borderColor: COLORS.border.muted,
        }}
      >
        <ActivityIndicator
          size={size}
          color={COLORS.accent.primary}
          className="mb-3"
        />
        <Text className="text-base font-medium text-white">{message}</Text>
      </View>
    </View>
  )
}

interface InlineProgressIndicatorProps {
  isLoading: boolean
  children: React.ReactNode
}

export function InlineProgressIndicator({
  isLoading,
  children,
}: InlineProgressIndicatorProps) {
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
