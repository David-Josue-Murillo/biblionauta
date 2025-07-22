// Helper functions for reset password feature
// Add any business logic helpers here as needed

// Example: sanitize email input
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase()
}
