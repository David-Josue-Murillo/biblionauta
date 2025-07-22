import { KeyboardAvoidingView, Platform, View, ScrollView, Text } from 'react-native'
import { useResetPassword } from '../../hooks/auth/useResetPassword'
import { colors } from '../../constants/theme'
import { AuthAlert } from './AuthAlert'
import { HeaderSign } from './HeaderSign'
import { FormEmailField } from './FormField'
import { ResetButton } from '../ui/ResetButton'
import { BotonSubmit } from '../ui/BotonSubmit'
import { Text } from 'react-native'

// Main screen only composes UI and delegates logic to hooks
export function ResetPasswordScreen({ onSwitchToLogin }) {
  const {
    control,
    handleSubmit,
    validationErrors,
    clearValidationErrors,
    isSubmitting,
    isLoading,
    alertVisible,
    alertMessage,
    alertType,
    handleResetPassword,
    handleAlertClose,
  } = useResetPassword()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView>
        <AuthAlert
          visible={alertVisible}
          message={alertMessage}
          type={alertType}
          onClose={handleAlertClose}
          autoHide
          duration={alertType === 'success' ? 6000 : 5000}
        />
        <View className="mb-6 flex-1 items-center justify-center px-6">
          <HeaderSign text={'Restablecer Contraseña'} />
          <View className="w-full space-y-16">
            <FormEmailField
              control={control}
              validationErrors={validationErrors}
              clearValidationErrors={clearValidationErrors}
            />
            <ResetButton
              onPress={handleSubmit(handleResetPassword)}
              disabled={isSubmitting || isLoading}
              isLoading={isSubmitting || isLoading}
            />
            <View className="mt-8 flex-row justify-center">
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                ¿Recordaste tu contraseña?{' '}
              </Text>
              <BotonSubmit action={onSwitchToLogin} text={'Iniciar sesión'} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
