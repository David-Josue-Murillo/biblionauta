import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useAuth } from '../useAuth'
import { useFormValidation } from '../useFormValidation'
import { RegisterFormData } from '../useFormValidation'

export function useRegisterForm() {
  const { createAccount, isLoading, error, clearError } = useAuth()
  
  const {
    validateForm,
    errors: validationErrors,
    clearErrors: clearValidationErrors,
  } = useFormValidation('register')

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  // Mostrar alerta cuando hay un error del contexto
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK' }])
      clearError()
    }
  }, [error, clearError])

  const onSubmit = async (data: RegisterFormData) => {
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
      console.log('Error capturado en pantalla:', error instanceof Error ? error.message : 'Error desconocido')
    }
  }

  const handleFieldChange = (fieldName: keyof RegisterFormData) => {
    // Limpiar error de validación cuando el usuario empiece a escribir
    if (validationErrors[fieldName]) {
      clearValidationErrors()
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    handleFieldChange,
    validationErrors,
    isSubmitting,
    isLoading,
  }
} 