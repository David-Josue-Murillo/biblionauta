import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'


const RegisterScreen = ({ onSwitchToLogin }) => {
  const { createAccount, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

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

  const onSubmit = async (data) => {
    try {
      await createAccount(data.email, data.password, data.name)
      Alert.alert(
        'Cuenta creada',
        'Se ha enviado un email de verificación. Por favor, verifica tu cuenta.',
        [{ text: 'OK' }]
      )
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
          Crear Cuenta
        </Text>
        <Text className="text-lg text-gray-600 text-center">
          Únete a Biblionauta
        </Text>
      </View>

      <View className="space-y-4">
        {/* Name */}
        <View>
          <Text className="text-gray-700 font-medium mb-2">Nombre</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Tu nombre"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm mt-1">{errors.name.message}</Text>
          )}
        </View>

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

        {/* Confirm Password */}
        <View>
          <Text className="text-gray-700 font-medium mb-2">Confirmar Contraseña</Text>
          <Controller
            control={control}
            name="confirmPassword"
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
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</Text>
          )}
        </View>

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || isLoading}
          className="bg-blue-600 rounded-lg py-3 px-4 mt-6"
        >
          <Text className="text-white font-medium text-center text-lg">
            {isSubmitting || isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Text>
        </TouchableOpacity>

        {/* Switch to Login */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={onSwitchToLogin}>
            <Text className="text-blue-600 font-medium">Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen