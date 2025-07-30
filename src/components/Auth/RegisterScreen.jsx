import HeaderSign from './HeaderSign'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { colors } from '../../constants/theme'
import { RegisterForm } from './RegisterForm'
import { PrimaryButton } from '../ui/PrimaryButton'
import { SwitchAuthLink } from './SwitchAuthLink'
import { useRegisterForm } from '../../hooks/auth/useRegisterForm'

const RegisterScreen = ({ onSwitchToLogin }) => {
  const { handleSubmit, onSubmit, isSubmitting, isLoading } = useRegisterForm()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView>
        {/* Header con logo y branding */}
        <View className="mb-6 flex-1 items-center justify-center px-6">
          <HeaderSign text={'Únete a Biblionauta'} />

          {/* Formulario */}
          <RegisterForm />

          {/* Register Button */}
          <PrimaryButton
            title="Crear Cuenta"
            loading={isSubmitting || isLoading}
            loadingText="Creando cuenta..."
            onPress={handleSubmit(onSubmit)}
          />

          {/* Switch to Login */}
          <SwitchAuthLink
            question="¿Ya tienes cuenta?"
            actionText="Iniciar sesión"
            onPress={onSwitchToLogin}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
