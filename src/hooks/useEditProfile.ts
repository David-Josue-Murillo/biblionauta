import { useState, useEffect } from 'react'
import { EditProfileForm, EditProfileError } from '../types/profile'
import { validateEditProfile } from '../validation/editProfileValidation'
import { updateProfile, getProfile } from '../services/profileService'

export function useEditProfile() {
  const [form, setForm] = useState<EditProfileForm>({
    name: '',
    email: '',
    avatarUrl: undefined,
  })
  const [errors, setErrors] = useState<EditProfileError>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [success, setSuccess] = useState(false)

  // Cargar datos iniciales del perfil
  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const profileData = await getProfile()
      setForm(profileData)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setIsInitialLoading(false)
    }
  }

  function handleChange(field: keyof EditProfileForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(): Promise<boolean> {
    const validation = validateEditProfile(form)
    setErrors(validation)
    
    if (Object.keys(validation).length > 0) {
      return false
    }

    setIsLoading(true)
    try {
      await updateProfile(form)
      setSuccess(true)
      return true
    } catch (error) {
      setErrors({ general: 'Error al actualizar el perfil' })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  function resetForm() {
    setForm({ name: '', email: '', avatarUrl: undefined })
    setErrors({})
    setSuccess(false)
  }

  return {
    form,
    errors,
    isLoading,
    isInitialLoading,
    success,
    handleChange,
    handleSubmit,
    resetForm,
    setSuccess,
  }
} 