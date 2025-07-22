import axios from 'axios'

// Service for password reset API call
export async function resetPasswordService(email: string): Promise<void> {
  // Replace with your actual endpoint
  const endpoint = 'https://your-api.com/auth/reset-password'
  await axios.post(endpoint, { email })
}
