import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'

const LoginScreen = ({ onSwitchToRegister, onSwitchToReset }) => {
  const { signIn, isLoading, error } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

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

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password)
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-center bg-white px-6"
    >
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Biblionauta
        </Text>
        <Text className="text-lg text-gray-600 text-center">
          Inicia sesión para continuar
        </Text>
      </View>

      <View className="space-y-4">
        {/* Email */}
        <View>
          <Text className="text-gray-700 font-medium mb-2">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="tu@email.com"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>
          )}
        </View>

        {/* Password */}
        <View>
          <Text className="text-gray-700 font-medium mb-2">Contraseña</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="••••••••"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showPassword}
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
          )}
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={onSwitchToReset} className="self-end">
          <Text className="text-blue-600 font-medium">¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || isLoading}
          className="bg-blue-600 rounded-lg py-3 px-4 mt-6"
        >
          <Text className="text-white font-medium text-center text-lg">
            {isSubmitting || isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>

        {/* Error Message */}
        {error && (
          <Text className="text-red-500 text-sm text-center mt-2">
            {error}
          </Text>
        )}

        {/* Switch to Register */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={onSwitchToRegister}>
            <Text className="text-blue-600 font-medium">Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen