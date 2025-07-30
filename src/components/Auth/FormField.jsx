import { FormFieldController } from '../ui/FormFieldController'
import { InputField } from '../ui/InputField'

export const FormField = props => <FormFieldController {...props} />

export const FormEmailField = ({ control, validationErrors, clearValidationErrors }) => (
  <FormFieldController
    control={control}
    name="email"
    label="Email"
    placeholder="usuario@email.com"
    error={validationErrors?.email}
    clearError={clearValidationErrors}
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
  />
)

export const FormPasswordField = ({
  control,
  validationErrors,
  clearValidationErrors,
  showPassword,
}) => (
  <FormFieldController
    control={control}
    name="password"
    label="Contraseña"
    placeholder="••••••••"
    error={validationErrors?.password}
    clearError={clearValidationErrors}
    secureTextEntry={!showPassword}
  />
)

export default FormField
