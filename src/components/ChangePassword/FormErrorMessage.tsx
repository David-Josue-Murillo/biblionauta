import { Text } from 'react-native'

interface FormErrorMessageProps {
  message?: string
}

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) return null
  return <Text className="mt-1 text-xs text-red-400">{message}</Text>
}
