import { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { colors } from '../../constants/theme'
import { AuthAlert } from './AuthAlert'
import BotonSubmit from './BotonSubmit'
import { useFormValidation } from '../../hooks/useFormValidation'
import HeaderSign from './HeaderSign'
import { FormEmailField } from './FormField'
import { ScrollView } from 'react-native'

const ResetPasswordScreen = ({ onSwitchToLogin }) => {
  const { resetPassword, isLoading, error, clearError } = useAuth()
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('error')

  // Hook de validación
  const {
    validateForm,
    errors: validationErrors,
    clearErrors: clearValidationErrors,
  } = useFormValidation('reset-password')

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
    },
  })

  // Mostrar alerta cuando hay un error del contexto
  useEffect(() => {
    if (error) {
      // Mostrar error como alerta nativa para errores de Firebase
      Alert.alert('Error', error, [{ text: 'OK' }])
      clearError()
    }
  }, [error, clearError])

  const showSuccessAlert = message => {
    setAlertMessage(message)
    setAlertType('success')
    setAlertVisible(true)
  }

  const onSubmit = async data => {
    // Validar formulario antes de enviar
    const validation = validateForm(data)

    if (!validation.isValid) {
      // Los errores se muestran debajo del campo
      return
    }

    try {
      await resetPassword(data.email)
      showSuccessAlert(
        'Se ha enviado un email con las instrucciones para restablecer tu contraseña.'
      )
    } catch (error) {
      // El error ya se maneja en el contexto, no necesitamos hacer nada aquí
      console.log('Error capturado en pantalla:', error.message)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      {/* AuthAlert para errores y éxito */}
      <ScrollView>
        <AuthAlert
          visible={alertVisible}
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertVisible(false)}
          autoHide={true}
          duration={alertType === 'success' ? 6000 : 5000}
        />

        {/* Header con logo y branding */}
        <View className="mb-6 flex-1 items-center justify-center px-6">
          <HeaderSign text={'Restablecer Contraseña'} />

          {/* Formulario */}
          <View className="w-full space-y-16">
            <FormEmailField
              control={control}
              validationErrors={validationErrors}
              clearValidationErrors={clearValidationErrors}
            />

            {/* Reset Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || isLoading}
              className="mt-6 rounded-xl px-6 py-4"
              style={{
                backgroundColor:
                  isSubmitting || isLoading ? colors.disabled : colors.primary,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text
                className="text-center text-lg font-bold"
                style={{
                  color:
                    isSubmitting || isLoading
                      ? colors.textSecondary
                      : '#000000',
                }}
              >
                {isSubmitting || isLoading
                  ? 'Enviando...'
                  : 'Enviar Instrucciones'}
              </Text>
            </TouchableOpacity>

            {/* Switch to Login */}
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

export default ResetPasswordScreen
