import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'
import { colors } from '../../constants/theme'

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string
  loading?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary'
}

export function PrimaryButton({
  title,
  loading = false,
  loadingText = 'Cargando...',
  variant = 'primary',
  disabled,
  style,
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading

  const buttonStyle = {
    backgroundColor: isDisabled
      ? colors.disabled
      : variant === 'primary'
        ? colors.primary
        : colors.card,
    shadowColor: variant === 'primary' ? colors.primary : colors.card,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  }

  const textColor = isDisabled
    ? colors.textSecondary
    : variant === 'primary'
      ? '#000000'
      : colors.text

  return (
    <TouchableOpacity
      disabled={isDisabled}
      className="w-full rounded-xl py-4"
      style={[buttonStyle, style]}
      {...props}
    >
      <Text className="text-center text-lg font-bold" style={{ color: textColor }}>
        {loading ? loadingText : title}
      </Text>
    </TouchableOpacity>
  )
}
