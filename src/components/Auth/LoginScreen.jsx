import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { colors } from '../../constants/theme'
import { BiblionautaLogo } from '../LogoApp'
import { AuthAlert } from './AuthAlert'
import BotonSubmit from './BotonSubmit'

const LoginScreen = ({ onSwitchToRegister, onSwitchToReset }) => {
  const { signIn, isLoading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

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
      setAlertMessage(error)
      setAlertVisible(true)
      // Limpiar el error después de mostrarlo
      setTimeout(() => {
        clearError()
      }, 100)
    }
  }, [error, clearError])

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password)
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
      {/* AuthAlert para errores */}
      <AuthAlert
        visible={alertVisible}
        message={alertMessage}
        type="error"
        onClose={() => setAlertVisible(false)}
        autoHide={true}
        duration={5000}
      />

      {/* Header con logo y branding */}
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center mb-6">
          <Text 
            className="text-2xl text-center font-semibold mt-4 leading-6"
            style={{ color: colors.textSecondary }}
          >
            Tu biblioteca personal en el bolsillo
          </Text>
        </View>

        {/* Ilustración */}
        <View className="mb-8">
          <Image 
            source={require("../../../assets/logoBiblionauta.png")}
            className="w-64 h-64 opacity-80"
            resizeMode="contain"
          />
        </View>

        {/* Formulario */}
        <View className="w-full space-y-16">
          {/* Email */}
          <View className='my-4'>
            <Text 
              className="text-base font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Email
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-xl py-4 px-4 text-base"
                  placeholder="tu@email.com"
                  placeholderTextColor={colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
              )}
            />
            {errors.email && (
              <Text 
                className="text-sm mt-2"
                style={{ color: colors.error }}
              >
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Password */}
          <View className='my-4'>
            <Text 
              className="text-base font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Contraseña
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-xl py-4 px-4 text-base"
                  placeholder="••••••••"
                  placeholderTextColor={colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  style={{
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
              )}
            />
            {errors.password && (
              <Text 
                className="text-sm mt-2"
                style={{ color: colors.error }}
              >
                {errors.password.message}
              </Text>
            )}
          </View>

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
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isLoading}
            className="rounded-xl py-4 px-6 mt-6"
            style={{
              backgroundColor: isSubmitting || isLoading ? colors.disabled : colors.primary,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8
            }}
          >
            <Text 
              className="font-bold text-center text-lg"
              style={{ 
                color: isSubmitting || isLoading ? colors.textSecondary : '#000000'
              }}
            >
              {isSubmitting || isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>

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
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen