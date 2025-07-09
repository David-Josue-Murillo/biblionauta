import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { colors } from '../../constants/theme'

import BotonSubmit from './BotonSubmit'
import { useFormValidation } from '../../hooks/useFormValidation'
import HeaderSign from './HeaderSign'

const RegisterScreen = ({ onSwitchToLogin }) => {
  const { createAccount, isLoading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  // Hook de validación
  const {
    validateForm,
    errors: validationErrors,
    clearErrors: clearValidationErrors
  } = useFormValidation('register')

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
      await createAccount(data.email, data.password, data.name)
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
        {/* Header con logo y branding */}
        <View className="flex-1 justify-center items-center px-6 mb-6">
          <HeaderSign text={'Únete a Biblionauta'}/>

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
                    onChangeText={(text) => {
                      onChange(text)
                      // Limpiar error de validación cuando el usuario empiece a escribir
                      if (validationErrors.name) {
                        clearValidationErrors()
                      }
                    }}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    style={{
                      backgroundColor: colors.card,
                      borderWidth: 1,
                      borderColor: validationErrors.name ? colors.error : colors.border,
                      color: colors.text
                    }}
                  />
                )}
              />
              {validationErrors.name && (
                <Text 
                  className="text-sm mt-2"
                  style={{ color: colors.error }}
                >
                  {validationErrors.name}
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
                    placeholder="usuario@email.com"
                    placeholderTextColor={colors.textSecondary}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                      // Limpiar error de validación cuando el usuario empiece a escribir
                      if (validationErrors.email) {
                        clearValidationErrors()
                      }
                    }}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{
                      backgroundColor: colors.card,
                      borderWidth: 1,
                      borderColor: validationErrors.email ? colors.error : colors.border,
                      color: colors.text
                    }}
                  />
                )}
              />
              {validationErrors.email && (
                <Text 
                  className="text-sm mt-2"
                  style={{ color: colors.error }}
                >
                  {validationErrors.email}
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
                    onChangeText={(text) => {
                      onChange(text)
                      // Limpiar error de validación cuando el usuario empiece a escribir
                      if (validationErrors.password) {
                        clearValidationErrors()
                      }
                    }}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    style={{
                      backgroundColor: colors.card,
                      borderWidth: 1,
                      borderColor: validationErrors.password ? colors.error : colors.border,
                      color: colors.text
                    }}
                  />
                )}
              />
              {validationErrors.password && (
                <Text 
                  className="text-sm mt-2"
                  style={{ color: colors.error }}
                >
                  {validationErrors.password}
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
                    onChangeText={(text) => {
                      onChange(text)
                      // Limpiar error de validación cuando el usuario empiece a escribir
                      if (validationErrors.confirmPassword) {
                        clearValidationErrors()
                      }
                    }}
                    onBlur={onBlur}
                    secureTextEntry={!showConfirmPassword}
                    style={{
                      backgroundColor: colors.card,
                      borderWidth: 1,
                      borderColor: validationErrors.confirmPassword ? colors.error : colors.border,
                      color: colors.text
                    }}
                  />
                )}
              />
              {validationErrors.confirmPassword && (
                <Text 
                  className="text-sm mt-2"
                  style={{ color: colors.error }}
                >
                  {validationErrors.confirmPassword}
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
            <View className="flex-row justify-center my-8">
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