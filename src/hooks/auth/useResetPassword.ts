import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../useAuth'
import { useFormValidation } from '../useFormValidation'
import { resetPasswordService } from '../../services/auth/resetPasswordService'

interface ResetPasswordForm {
  email: string
}

export function useResetPassword() {
  const { isLoading, error, clearError } = useAuth()
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'error' | 'success'>('error')

  const {
    validateForm,
    errors: validationErrors,
    clearErrors: clearValidationErrors,
  } = useFormValidation('reset-password')

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ResetPasswordForm>({
    defaultValues: { email: '' },
  })

  useEffect(() => {
    if (error) {
      setAlertMessage(error)
      setAlertType('error')
      setAlertVisible(true)
      clearError()
    }
  }, [error, clearError])

  function handleAlertClose() {
    setAlertVisible(false)
  }

  async function handleResetPassword(data: ResetPasswordForm) {
    const validation = validateForm(data)
    if (!validation.isValid) return
    try {
      await resetPasswordService(data.email)
      setAlertMessage('Se ha enviado un email con las instrucciones para restablecer tu contraseña.')
      setAlertType('success')
      setAlertVisible(true)
    } catch (e: any) {
      // Error handled by context
    }
  }

  return {
    control,
    handleSubmit,
    validationErrors,
    clearValidationErrors,
    isSubmitting,
    isLoading,
    alertVisible,
    alertMessage,
    alertType,
    handleResetPassword,
    handleAlertClose,
  }
}
