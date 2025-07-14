import { View, Text, TextInput, Pressable } from 'react-native'

interface PasswordFieldProps {
  value: string
  onChange: (text: string) => void
  visible: boolean
  toggleVisibility: () => void
  placeholder: string
  error?: string
  label: string
}

export function PasswordField({
  value,
  onChange,
  visible,
  toggleVisibility,
  placeholder,
  error,
  label,
}: PasswordFieldProps) {
  return (
    <View>
      <Text className="mb-1 text-sm text-zinc-400">{label}</Text>
      <View className="flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChange}
          className="flex-1 text-base text-white"
          placeholder={placeholder}
          placeholderTextColor="#A1A1AA"
          secureTextEntry={!visible}
          style={{ backgroundColor: 'transparent' }}
        />
        <Pressable onPress={toggleVisibility} className="p-2">
          <Text className="text-lg text-zinc-400">{visible ? '🙈' : '👁️'}</Text>
        </Pressable>
      </View>
      {error && <Text className="mt-1 text-xs text-red-400">{error}</Text>}
    </View>
  )
}
