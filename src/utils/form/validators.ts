import { errorMessages } from '../../constants/form/errorMessages'
import { ValidationRules } from '../../hooks/useFormValidation'

export const validators = {
  email: (value: string, rules: ValidationRules['email']): string | null => {
    if (rules?.required && !value.trim()) {
      return errorMessages.required('email')
    }
    if (value.trim() && rules?.pattern && !rules.pattern.test(value)) {
      return errorMessages.invalidEmail
    }
    return null
  },
  password: (value: string, rules: ValidationRules['password']): string | null => {
    if (rules?.required && !value.trim()) {
      return errorMessages.required('contraseña')
    }
    if (value.trim()) {
      if (rules?.minLength && value.length < rules.minLength) {
        return errorMessages.passwordMinLength(rules.minLength)
      }
      if (rules?.requireUppercase && !/[A-Z]/.test(value)) {
        return errorMessages.passwordUppercase
      }
    }
    return null
  },
  name: (value: string, rules: ValidationRules['name']): string | null => {
    if (rules?.required && !value.trim()) {
      return errorMessages.invalidName
    }
    return null
  },
  confirmPassword: (
    value: string,
    password: string,
    rules: ValidationRules['confirmPassword'],
  ): string | null => {
    if (rules?.required && !value.trim()) {
      return errorMessages.required('confirmación de contraseña')
    }
    if (value.trim() && rules?.matchField && value !== password) {
      return errorMessages.passwordMismatch
    }
    return null
  },
}
