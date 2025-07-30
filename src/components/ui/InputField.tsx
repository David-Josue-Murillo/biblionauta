import { Text, TextInput, View, TextInputProps } from 'react-native'
import { colors } from '../../constants/theme'
import { InputFieldProps } from '../../types/form'

export function InputField({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  ...props
}: InputFieldProps & TextInputProps) {
  return (
    <View style={{ marginVertical: 8 }}>
      <Text
        style={{
          marginBottom: 8,
          fontSize: 16,
          fontWeight: '600',
          color: colors.text,
        }}
      >
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        style={{
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 16,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          color: colors.text,
        }}
        {...props}
      />
      {error && <Text style={{ marginTop: 8, fontSize: 14, color: colors.error }}>{error}</Text>}
    </View>
  )
}
