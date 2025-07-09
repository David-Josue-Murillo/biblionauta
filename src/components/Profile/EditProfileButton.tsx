import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

interface EditProfileButtonProps {
  onPress: () => void;
}

export function EditProfileButton({ onPress }: EditProfileButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 py-2 rounded-full"
      style={{ backgroundColor: COLORS.accent.primary }}
    >
      <Ionicons name="create-outline" size={16} color="blank" />
      <Text className="text-blank font-medium ml-2">Editar Perfil</Text>
    </Pressable>
  );
} 