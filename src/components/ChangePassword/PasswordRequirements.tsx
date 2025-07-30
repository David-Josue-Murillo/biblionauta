import { View, Text } from 'react-native'
import { changePasswordTexts } from '../../constants/changePasswordTexts'

interface PasswordRequirementsProps {
  password: string
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = [
    {
      text: changePasswordTexts.requirements[0],
      met: password.length >= 8,
    },
    {
      text: changePasswordTexts.requirements[1],
      met: /[a-z]/.test(password),
    },
    {
      text: changePasswordTexts.requirements[2],
      met: /[A-Z]/.test(password),
    },
    {
      text: changePasswordTexts.requirements[3],
      met: /\d/.test(password),
    },
    {
      text: changePasswordTexts.requirements[4],
      met: /[@$!%*?&]/.test(password),
    },
  ]
  return (
    <View>
      <Text className="mb-2 text-sm text-zinc-400">{changePasswordTexts.requirementsIntro}</Text>
      <View className="space-y-1">
        {requirements.map((req, idx) => (
          <View key={idx} className="flex-row items-center">
            <Text className={`mr-2 text-sm ${req.met ? 'text-green-400' : 'text-zinc-500'}`}>
              {req.met ? '✅' : '⭕'}
            </Text>
            <Text className={`text-sm ${req.met ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {req.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}
