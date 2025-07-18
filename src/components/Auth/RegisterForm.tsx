import { View, Text } from 'react-native'
import { FormFieldController } from '../ui/FormFieldController'
import { useRegisterForm } from '../../hooks/auth/useRegisterForm'
import { colors } from '../../constants/theme'

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    onSubmit,
    handleFieldChange,
    validationErrors,
    isSubmitting,
    isLoading,
  } = useRegisterForm()

  return (
    <View className="w-full space-y-4">
      {/* Name */}
      <FormFieldController
        control={control}
        name="name"
        label="Nombre"
        placeholder="Tu nombre"
        error={validationErrors.name}
        clearError={() => handleFieldChange('name')}
        autoCapitalize="words"
      />

      {/* Email */}
      <FormFieldController
        control={control}
        name="email"
        label="Email"
        placeholder="usuario@email.com"
        error={validationErrors.email}
        clearError={() => handleFieldChange('email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password */}
      <FormFieldController
        control={control}
        name="password"
        label="Contraseña"
        placeholder="••••••••"
        error={validationErrors.password}
        clearError={() => handleFieldChange('password')}
        secureTextEntry={true}
      />

      {/* Confirm Password */}
      <FormFieldController
        control={control}
        name="confirmPassword"
        label="Confirmar Contraseña"
        placeholder="••••••••"
        error={validationErrors.confirmPassword}
        clearError={() => handleFieldChange('confirmPassword')}
        secureTextEntry={true}
      />
    </View>
  )
}
