import { EditProfileForm, EditProfileError } from '../types/profile'
import { editProfileTexts } from '../constants/editProfileTexts'

export function validateEditProfile(form: EditProfileForm): EditProfileError {
  const errors: EditProfileError = {}
  
  if (!form.name.trim()) {
    errors.name = editProfileTexts.errorRequired
  }
  
  if (!form.email.trim()) {
    errors.email = editProfileTexts.errorRequired
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
    errors.email = editProfileTexts.errorInvalidEmail
  }
  
  return errors
} 