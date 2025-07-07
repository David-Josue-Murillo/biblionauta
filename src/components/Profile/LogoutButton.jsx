import { View, Text, Pressable } from "react-native";

export function LogoutButton() {
  return (
    <View className="mx-4 mb-8">
      <Pressable
        className="bg-red-600/20 border border-red-500 rounded-xl py-4 items-center"
        style={({ pressed }) => [
          { backgroundColor: pressed ? "#dc2626" : "rgba(220, 38, 38, 0.2)" },
        ]}
      >
        <Text className="text-red-400 font-semibold text-base">
          Cerrar sesión
        </Text>
      </Pressable>
    </View>
  );
}
