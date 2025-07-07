import { View, Text, Image } from "react-native";
import { COLORS } from "../../constants/colors";

export function UserHeader({ userData }) {
  return (
    <View
      className="mx-4 mt-8 mb-6 rounded-2xl p-6"
      style={{
        backgroundColor: COLORS.background.secondary,
        borderWidth: 1,
        borderColor: COLORS.border.primary,
      }}
    >
      <View className="flex-row items-center mb-4">
        <Image
          source={{ uri: userData.avatar }}
          className="w-16 h-16 rounded-full mr-4"
          style={{ borderWidth: 2, borderColor: COLORS.accent.primary }}
        />
        <View className="flex-1">
          <Text className="text-xl font-bold text-white mb-1">
            {userData.name}
          </Text>
          <Text className="text-zinc-400 text-sm">{userData.email}</Text>
          <Text className="text-zinc-500 text-xs">
            Miembro desde {userData.memberSince}
          </Text>
        </View>
      </View>

      {/* Estadísticas del usuario */}
      <View className="flex-row justify-around">
        <View className="items-center">
          <Text className="text-2xl font-bold text-white">
            {userData.booksRead}
          </Text>
          <Text className="text-zinc-400 text-xs">Libros leídos</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-white">
            {userData.wishlistItems}
          </Text>
          <Text className="text-zinc-400 text-xs">Lista de deseos</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-white">
            {userData.shelfItems}
          </Text>
          <Text className="text-zinc-400 text-xs">En estantería</Text>
        </View>
      </View>
    </View>
  );
}
