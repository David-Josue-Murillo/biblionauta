import { Pressable, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'

interface EditProfileButtonProps {
  onPress: () => void
}

export function EditProfileButton({ onPress }: EditProfileButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center rounded-full px-4 py-2"
      style={{ backgroundColor: COLORS.accent.primary }}
    >
      <Ionicons name="create-outline" size={16} color="blank" />
      <Text className="text-blank ml-2 font-medium">Editar Perfil</Text>
    </Pressable>
  )
}
