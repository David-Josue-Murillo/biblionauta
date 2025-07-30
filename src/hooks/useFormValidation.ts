import { useCallback, useState } from 'react'
import { validators } from '../utils/form/validators'

// Tipos de formularios soportados
export type FormType = 'login' | 'register' | 'reset-password'

// Estructura de datos para cada formulario
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordFormData {
  email: string
}

// Unión de tipos de formularios
export type FormData = LoginFormData | RegisterFormData | ResetPasswordFormData

// Estructura de errores
export interface ValidationErrors {
  [key: string]: string
}

// Reglas de validación personalizables
export interface ValidationRules {
  email?: {
    required?: boolean
    pattern?: RegExp
  }
  password?: {
    required?: boolean
    minLength?: number
    requireUppercase?: boolean
  }
  name?: {
    required?: boolean
  }
  confirmPassword?: {
    required?: boolean
    matchField?: string
  }
}

// Configuración por defecto para cada tipo de formulario
const defaultValidationRules: Record<FormType, ValidationRules> = {
  login: {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 6,
      requireUppercase: true,
    },
  },
  register: {
    name: {
      required: true,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 6,
      requireUppercase: true,
    },
    confirmPassword: {
      required: true,
      matchField: 'password',
    },
  },
  'reset-password': {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
}


export const useFormValidation = <T extends FormData>(
  formType: FormType,
  customRules?: ValidationRules,
) => {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isValidating, setIsValidating] = useState(false)

  // Combinar reglas por defecto con reglas personalizadas
  const validationRules = {
    ...defaultValidationRules[formType],
    ...customRules,
  }

  // Función principal de validación
  const validateForm = useCallback(
    (data: T): { isValid: boolean; errors: ValidationErrors } => {
      setIsValidating(true)
      const newErrors: ValidationErrors = {}

      try {
        // Validar email si existe en el formulario
        if ('email' in data && validationRules.email) {
          const emailError = validators.email(data.email, validationRules.email)
          if (emailError) {
            newErrors.email = emailError
          }
        }

        // Validar contraseña si existe en el formulario
        if ('password' in data && validationRules.password) {
          const passwordError = validators.password(
            data.password,
            validationRules.password,
          )
          if (passwordError) {
            newErrors.password = passwordError
          }
        }

        // Validar nombre si existe en el formulario
        if ('name' in data && validationRules.name) {
          const nameError = validators.name(data.name, validationRules.name)
          if (nameError) {
            newErrors.name = nameError
          }
        }

        // Validar confirmación de contraseña si existe en el formulario
        if ('confirmPassword' in data && validationRules.confirmPassword) {
          const confirmPasswordError = validators.confirmPassword(
            data.confirmPassword,
            (data as RegisterFormData).password,
            validationRules.confirmPassword,
          )
          if (confirmPasswordError) {
            newErrors.confirmPassword = confirmPasswordError
          }
        }

        setErrors(newErrors)
        return {
          isValid: Object.keys(newErrors).length === 0,
          errors: newErrors,
        }
      } finally {
        setIsValidating(false)
      }
    },
    [validationRules],
  )

  // Validar un campo específico
  const validateField = useCallback(
    (field: keyof T, value: string, allData?: T): string | null => {
      switch (field) {
        case 'email':
          return validators.email(value, validationRules.email)

        case 'password':
          return validators.password(value, validationRules.password)

        case 'name':
          return validators.name(value, validationRules.name)

        case 'confirmPassword':
          // Para confirmPassword necesitamos acceso a la contraseña actual
          if (allData && 'password' in allData) {
            return validators.confirmPassword(
              value,
              (allData as RegisterFormData).password,
              validationRules.confirmPassword,
            )
          }
          return null

        default:
          return null
      }
    },
    [validationRules],
  )

  // Limpiar errores
  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  // Limpiar error de un campo específico
  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  // Verificar si hay errores
  const hasErrors = Object.keys(errors).length > 0

  // Obtener el primer error (útil para mostrar en alertas generales)
  const getFirstError = (): string | null => {
    const firstErrorKey = Object.keys(errors)[0]
    return firstErrorKey ? errors[firstErrorKey] : null
  }

  return {
    // Estado
    errors,
    isValidating,
    hasErrors,

    // Funciones
    validateForm,
    validateField,
    clearErrors,
    clearFieldError,
    getFirstError,

    // Utilidades
    validationRules,
  }
}
