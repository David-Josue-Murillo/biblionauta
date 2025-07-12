import { View, Text, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import { colors } from '../../constants/theme'

export const FormField = ({
  control,
  name,
  label,
  placeholder,
  validationErrors,
  clearValidationErrors,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  ...props
}) => {
  return (
    <View className="my-2">
      <Text
        className="mb-2 text-base font-semibold"
        style={{ color: colors.text }}
      >
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="rounded-xl px-4 py-4 text-base"
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            value={value}
            onChangeText={text => {
              onChange(text)
              // Limpiar error de validación cuando el usuario empiece a escribir
              if (validationErrors[name]) {
                clearValidationErrors()
              }
            }}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: validationErrors[name]
                ? colors.error
                : colors.border,
              color: colors.text,
            }}
            {...props}
          />
        )}
      />
      {validationErrors[name] && (
        <Text className="mt-2 text-sm" style={{ color: colors.error }}>
          {validationErrors[name]}
        </Text>
      )}
    </View>
  )
}

export const FormEmailField = ({
  control,
  validationErrors,
  clearValidationErrors,
}) => (
  <FormField
    control={control}
    name="email"
    label="Email"
    placeholder="usuario@email.com"
    validationErrors={validationErrors}
    clearValidationErrors={clearValidationErrors}
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
  />
)

export const FormPasswordField = ({
  control,
  validationErrors,
  clearValidationErrors,
  showPassword,
}) => (
  <FormField
    control={control}
    name="password"
    label="Contraseña"
    placeholder="••••••••"
    validationErrors={validationErrors}
    clearValidationErrors={clearValidationErrors}
    secureTextEntry={!showPassword}
  />
)

export default FormField
