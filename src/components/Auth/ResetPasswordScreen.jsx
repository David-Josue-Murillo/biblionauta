import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { colors } from '../../constants/theme'
import BotonSubmit from './BotonSubmit'

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
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header con branding */}
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center mb-6">
          <Text 
            className="text-2xl text-center font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Recuperar Contraseña
          </Text>
          <Text 
            className="text-lg text-center leading-6"
            style={{ color: colors.textSecondary }}
          >
            Ingresa tu email para recibir instrucciones
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

          {/* Reset Button */}
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
              {isSubmitting || isLoading ? 'Enviando...' : 'Enviar Email'}
            </Text>
          </TouchableOpacity>

          <BotonSubmit action={onSwitchToLogin} text={'Volver al inicio de sesión'}/>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ResetPasswordScreen