import { View, Text } from 'react-native'
import { COLORS } from '../../constants/colors'
import { changePasswordTexts } from '../../constants/changePasswordTexts'

interface PasswordStrengthIndicatorProps {
  password: string
}

function getPasswordStrength(password: string) {
  if (!password) return { strength: 0, color: COLORS.text.muted, text: '' }
  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[@$!%*?&]/.test(password)) strength++
  const colors = [COLORS.text.muted, '#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a']
  const texts = [
    '',
    changePasswordTexts.passwordStrength.veryWeak,
    changePasswordTexts.passwordStrength.weak,
    changePasswordTexts.passwordStrength.medium,
    changePasswordTexts.passwordStrength.strong,
    changePasswordTexts.passwordStrength.veryStrong,
  ]
  return {
    strength,
    color: colors[strength],
    text: texts[strength],
  }
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { strength, color, text } = getPasswordStrength(password)
  if (!password) return null
  return (
    <View className="mt-2">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-xs text-zinc-400">Fortaleza:</Text>
        <Text className="text-xs font-medium" style={{ color }}>
          {text}
        </Text>
      </View>
      <View className="h-1 overflow-hidden rounded-full bg-zinc-700">
        <View
          className="h-full rounded-full"
          style={{ backgroundColor: color, width: `${(strength / 5) * 100}%` }}
        />
      </View>
    </View>
  )
}
