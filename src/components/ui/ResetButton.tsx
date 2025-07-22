import { TouchableOpacity, Text } from 'react-native'
import { colors } from '../../constants/theme'

interface ResetButtonProps {
  onPress: () => void
  disabled: boolean
  isLoading: boolean
}

// Reusable button for reset password actions
export function ResetButton({ onPress, disabled, isLoading }: ResetButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className="mt-6 rounded-xl px-6 py-4"
      style={{
        backgroundColor: disabled ? colors.disabled : colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text
        className="text-center text-lg font-bold"
        style={{
          color: disabled ? colors.textSecondary : '#000000',
        }}
      >
        {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
      </Text>
    </TouchableOpacity>
  )
}
