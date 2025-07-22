import { Text, TouchableOpacity } from 'react-native'
import { colors } from '../../constants/theme'

const SubmitButton = ({
  onPress,
  disabled,
  loadingText,
  defaultText,
  ...props
}) => {
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
      {...props}
    >
      <Text
        className="text-center text-lg font-bold"
        style={{
          color: disabled ? colors.textSecondary : '#000000',
        }}
      >
        {disabled ? loadingText : defaultText}
      </Text>
    </TouchableOpacity>
  )
}

export default SubmitButton
