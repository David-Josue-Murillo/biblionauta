import { Text, TextInput, TextInputProps, View } from 'react-native'
import { COLORS } from '../../constants/colors'

interface FormFieldProps extends TextInputProps {
  label: string
  error?: string
  containerStyle?: any
}

export function FormField({
  label,
  error,
  containerStyle,
  ...textInputProps
}: FormFieldProps) {
  return (
    <View className="border-b border-zinc-700 px-4 py-3" style={containerStyle}>
      <Text className="mb-1 text-sm text-zinc-400">{label}</Text>
      <TextInput
        className="text-base text-white"
        placeholderTextColor={COLORS.text.muted}
        style={{
          backgroundColor: 'transparent',
        }}
        {...textInputProps}
      />
      {error && <Text className="mt-1 text-xs text-red-400">{error}</Text>}
    </View>
  )
}
