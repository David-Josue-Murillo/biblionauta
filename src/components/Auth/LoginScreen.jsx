import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { colors } from '../../constants/theme'
import BotonSubmit from './BotonSubmit'
import { useFormValidation } from '../../hooks/useFormValidation'
import AuthLayout from './AuthLayout'
import { FormEmailField, FormPasswordField } from './FormField'
import SubmitButton from './SubmitButton'
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const LoginScreen = ({ onSwitchToRegister, onSwitchToReset }) => {
  const { signIn, isLoading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)


  // Hook de validación
  const {
    validateForm,
    errors: validationErrors,
    clearErrors: clearValidationErrors
  } = useFormValidation('login')

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // Mostrar alerta cuando hay un error del contexto
  useEffect(() => {
    if (error) {
      // Mostrar error como alerta nativa para errores de Firebase
      Alert.alert('Error', error, [{ text: 'OK' }])
      clearError()
    }
  }, [error, clearError])



  const onSubmit = async (data) => {
    // Validar formulario antes de enviar
    const validation = validateForm(data)

    if (!validation.isValid) {
      // Los errores se muestran debajo de cada campo
      return
    }

    try {
      await signIn(data.email, data.password)
    } catch (error) {
      // El error ya se maneja en el contexto, no necesitamos hacer nada aquí
      console.log('Error capturado en pantalla:', error.message)
    }
  }

  return (
    <ScrollView>
      <AuthLayout headerText="Tu biblioteca personal en el bolsillo">
        {/* Formulario */}
        <View className="w-full space-y-16">
          {/* Email y Password*/}
          <FormEmailField control={control} validationErrors={validationErrors} clearValidationErrors={clearValidationErrors} />
          <FormPasswordField control={control} validationErrors={validationErrors} clearValidationErrors={clearValidationErrors} showPassword={showPassword} />

          {/* Forgot Password */}
          <TouchableOpacity onPress={onSwitchToReset} className="self-end">
            <Text
              className="text-sm font-medium"
              style={{ color: colors.primary }}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <SubmitButton
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isLoading}
            loadingText="Iniciando sesión..."
            defaultText="Iniciar Sesión"
          />

          {/* Switch to Register */}
          <View className="flex-row justify-center mt-8">
            <Text
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              ¿No tienes cuenta?{' '}
            </Text>
            <BotonSubmit action={onSwitchToRegister} text={'Crear cuenta'} />
          </View>
        </View>
      </AuthLayout>
    </ScrollView>
  )
}

export default LoginScreen