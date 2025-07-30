export const errorMessages = {
  required: (field: string) => `El campo ${field} es obligatorio`,
  invalidEmail: 'El formato del email no es válido',
  passwordMinLength: (minLength: number) =>
    `La contraseña debe tener al menos ${minLength} caracteres`,
  passwordUppercase: 'La contraseña debe contener al menos una letra mayúscula',
  passwordMismatch: 'Las contraseñas no coinciden',
  invalidName: 'El nombre no puede estar vacío',
}
