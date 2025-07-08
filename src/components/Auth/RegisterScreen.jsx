import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { colors } from '../../constants/theme'
import { AuthAlert } from './AuthAlert'
import BotonSubmit from './BotonSubmit'

const RegisterScreen = ({ onSwitchToLogin }) => {
  const { createAccount, isLoading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('error')

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  // Mostrar alerta cuando hay un error del contexto
  useEffect(() => {
    if (error) {
      setAlertMessage(error)
      setAlertType('error')
      setAlertVisible(true)
      // Limpiar el error después de mostrarlo
      setTimeout(() => {
        clearError()
      }, 100)
    }
  }, [error, clearError])

  const showSuccessAlert = (message) => {
    setAlertMessage(message)
    setAlertType('success')
    setAlertVisible(true)
  }

  const onSubmit = async (data) => {
    try {
      await createAccount(data.email, data.password, data.name)
      showSuccessAlert('Se ha enviado un email de verificación. Por favor, verifica tu cuenta.')
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
      <ScrollView>


        {/* AuthAlert para errores y éxito */}
        <AuthAlert
          visible={alertVisible}
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertVisible(false)}
          autoHide={true}
          duration={alertType === 'success' ? 6000 : 5000}
        />

        {/* Header con logo y branding */}
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center">
            <Text
              className="text-2xl text-center font-semibold mt-4 leading-6"
              style={{ color: colors.textSecondary }}
            >
              Únete a Biblionauta
            </Text>
          </View>

          {/* Ilustración */}
          <View>
            <Image
              source={require("../../../assets/logoBiblionauta.png")}
              className="w-64 h-64 opacity-80"
              resizeMode="contain"
            />
          </View>

          {/* Formulario */}
          <View className="w-full space-y-4">
            {/* Name */}
            <View className='my-2'>
              <Text
                className="text-base font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Nombre
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="rounded-xl py-4 px-4 text-base"
                    placeholder="Tu nombre"
                    placeholderTextColor={colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    style={{
                      backgroundColor: colors.card,
                      borderWidth: 1,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  />
                )}
              />
              {errors.name && (
                <Text
                  className="text-sm mt-2"
                  style={{ color: colors.error }}
                >
                  {errors.name.message}
                </Text>
              )}
            </View>

            {/* Email */}
            <View className='my-2'>
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
            <View className='my-2'>
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

            {/* Confirm Password */}
            <View className='my-2'>
              <Text
                className="text-base font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Confirmar Contraseña
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
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
              {errors.confirmPassword && (
                <Text
                  className="text-sm mt-2"
                  style={{ color: colors.error }}
                >
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            {/* Register Button */}
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
                {isSubmitting || isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Text>
            </TouchableOpacity>

            {/* Switch to Login */}
            <View className="flex-row justify-center mt-8">
              <Text
                className="text-sm"
                style={{ color: colors.textSecondary }}
              >
                ¿Ya tienes cuenta?{' '}
              </Text>
              <BotonSubmit action={onSwitchToLogin} text={'Iniciar sesión'} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen