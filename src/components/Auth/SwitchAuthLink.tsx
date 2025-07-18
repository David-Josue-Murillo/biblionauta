import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { colors } from '../../constants/theme'

interface SwitchAuthLinkProps {
  question: string
  actionText: string
  onPress: () => void
}

export function SwitchAuthLink({ question, actionText, onPress }: SwitchAuthLinkProps) {
  return (
    <View className="my-8 flex-row justify-center">
      <Text className="text-sm" style={{ color: colors.textSecondary }}>
        {question}{' '}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
          {actionText}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
