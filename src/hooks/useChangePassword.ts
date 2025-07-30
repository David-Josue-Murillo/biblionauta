import { useState } from 'react'
import { changePasswordTexts } from '../constants/changePasswordTexts'

interface FormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface ShowPasswords {
  current: boolean
  new: boolean
  confirm: boolean
}

export function useChangePassword() {
  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
    current: false,
    new: false,
    confirm: false,
  })

  function updateField(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  function togglePasswordVisibility(field: keyof ShowPasswords) {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  function validateForm() {
    const newErrors: Record<string, string> = {}
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = changePasswordTexts.errors.currentPasswordRequired
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = changePasswordTexts.errors.passwordsDontMatch
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function resetForm() {
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setErrors({})
    setShowPasswords({ current: false, new: false, confirm: false })
  }

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    showPasswords,
    updateField,
    togglePasswordVisibility,
    validateForm,
    resetForm,
  }
} 