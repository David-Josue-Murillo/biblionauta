import { Controller } from 'react-hook-form'
import { InputField } from './InputField'
import { FormFieldControllerProps } from '../../types/form'

export function FormFieldController<T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder,
  error,
  clearError,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  ...props
}: FormFieldControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <InputField
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={text => {
            onChange(text)
            if (error && clearError) clearError()
          }}
          onBlur={onBlur}
          error={error}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          {...props}
        />
      )}
    />
  )
}
