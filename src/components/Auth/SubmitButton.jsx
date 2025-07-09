import { TouchableOpacity, Text } from 'react-native'
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
      className="rounded-xl py-4 px-6 mt-6"
      style={{
        backgroundColor: disabled ? colors.disabled : colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
      }}
      {...props}
    >
      <Text 
        className="font-bold text-center text-lg"
        style={{ 
          color: disabled ? colors.textSecondary : '#000000'
        }}
      >
        {disabled ? loadingText : defaultText}
      </Text>
    </TouchableOpacity>
  )
}

export default SubmitButton 