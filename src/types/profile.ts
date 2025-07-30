export interface EditProfileForm {
  name: string
  email: string
  avatarUrl?: string
}

export interface EditProfileError {
  name?: string
  email?: string
  avatarUrl?: string
  general?: string
} 