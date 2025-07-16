import { useEffect, useState, useCallback } from 'react'
import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { useFormValidation } from '../hooks/useFormValidation'
import { LoginFormValues, UseLoginFormProps } from '../types/auth'

export function useLoginForm({ onLoginSuccess, onSwitchToRegister, onSwitchToReset }: UseLoginFormProps) {
  const { signIn, isLoading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  // Validación
  const {
    validateForm,
    errors: validationErrors,
    clearErrors: clearValidationErrors,
  } = useFormValidation('login')

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
  })

  // Mostrar alerta cuando hay un error del contexto
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK' }])
      clearError()
    }
  }, [error, clearError])

  const onSubmit = useCallback(
    async (data: LoginFormValues) => {
      const validation = validateForm(data)
      if (!validation.isValid) return
      try {
        await signIn(data.email, data.password)
        onLoginSuccess?.()
      } catch (err: any) {
        // El error ya se maneja en el contexto
        console.log('Error capturado en pantalla:', err.message)
      }
    },
    [signIn, validateForm, onLoginSuccess]
  )

  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isLoading,
    validationErrors,
    clearValidationErrors,
    showPassword,
    setShowPassword,
    onSwitchToRegister,
    onSwitchToReset,
  }
} 