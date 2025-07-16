import { ScrollView, View, Text } from 'react-native'
import AuthLayout from './AuthLayout'
import { FormEmailField, FormPasswordField } from './FormField'
import SubmitButton from './SubmitButton'
import BotonSubmit from './BotonSubmit'
import { ActionLink } from '../ui/ActionLink'
import { useLoginForm } from '../../hooks/useLoginForm'
import { colors } from '../../constants/theme'

const LoginScreen = ({ onSwitchToRegister, onSwitchToReset }) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isLoading,
    validationErrors,
    clearValidationErrors,
    showPassword,
    setShowPassword,
    onSwitchToRegister: handleSwitchToRegister,
    onSwitchToReset: handleSwitchToReset,
  } = useLoginForm({
    onSwitchToRegister,
    onSwitchToReset,
  })

  return (
    <ScrollView>
      <AuthLayout headerText="Tu biblioteca personal en el bolsillo">
        <View className="w-full space-y-16">
          <FormEmailField
            control={control}
            validationErrors={validationErrors}
            clearValidationErrors={clearValidationErrors}
          />
          <FormPasswordField
            control={control}
            validationErrors={validationErrors}
            clearValidationErrors={clearValidationErrors}
            showPassword={showPassword}
          />

          <ActionLink onPress={handleSwitchToReset}>¿Olvidaste tu contraseña?</ActionLink>

          <SubmitButton
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isLoading}
            loadingText="Iniciando sesión..."
            defaultText="Iniciar Sesión"
          />

          <View className="mt-8 flex-row justify-center">
            <Text className="text-sm" style={{ color: colors.textSecondary }}>
              ¿No tienes cuenta?{' '}
            </Text>
            <BotonSubmit action={handleSwitchToRegister} text={'Crear cuenta'} />
          </View>
        </View>
      </AuthLayout>
    </ScrollView>
  )
}

export default LoginScreen
