import { z } from 'zod'

// Zod schema for reset password form validation
export const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Ingresa un email válido.' }),
})

export function validateResetPasswordForm(data: { email: string }) {
  const result = resetPasswordSchema.safeParse(data)
  return {
    isValid: result.success,
    errors: result.success ? {} : result.error.flatten().fieldErrors,
  }
}
