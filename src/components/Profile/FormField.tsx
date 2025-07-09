import { View, Text, TextInput, TextInputProps } from "react-native";
import { COLORS } from "../../constants/colors";

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: any;
}

export function FormField({ 
  label, 
  error, 
  containerStyle, 
  ...textInputProps 
}: FormFieldProps) {
  return (
    <View className="px-4 py-3 border-b border-zinc-700" style={containerStyle}>
      <Text className="text-zinc-400 text-sm mb-1">{label}</Text>
      <TextInput
        className="text-white text-base"
        placeholderTextColor={COLORS.text.muted}
        style={{
          backgroundColor: "transparent",
        }}
        {...textInputProps}
      />
      {error && (
        <Text className="text-red-400 text-xs mt-1">{error}</Text>
      )}
    </View>
  );
} 