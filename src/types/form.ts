import { Control, FieldValues } from 'react-hook-form'
import { KeyboardTypeOptions } from 'react-native'

export interface InputFieldProps {
  label: string
  placeholder?: string
  value: string
  onChange: (text: string) => void
  onBlur?: () => void
  error?: string
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoCorrect?: boolean
  [key: string]: any
}

export interface FormFieldControllerProps {
  control: Control<FieldValues, any>
  name: string
  label: string
  placeholder?: string
  error?: string
  clearError?: () => void
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoCorrect?: boolean
  [key: string]: any
} 