import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'

const ResetPasswordScreen = ({ onSwitchToLogin }) => {
  const { resetPassword, isLoading } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      await resetPassword(data.email)
      Alert.alert(
        'Email enviado',
        'Se ha enviado un email con instrucciones para restablecer tu contraseña.',
        [{ text: 'OK', onPress: onSwitchToLogin }]
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
          Recuperar Contraseña
        </Text>
        <Text className="text-lg text-gray-600 text-center">
          Ingresa tu email para recibir instrucciones
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

        {/* Reset Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || isLoading}
          className="bg-blue-600 rounded-lg py-3 px-4 mt-6"
        >
          <Text className="text-white font-medium text-center text-lg">
            {isSubmitting || isLoading ? 'Enviando...' : 'Enviar Email'}
          </Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={onSwitchToLogin} className="mt-6">
          <Text className="text-blue-600 font-medium text-center">
            Volver al inicio de sesión
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ResetPasswordScreen