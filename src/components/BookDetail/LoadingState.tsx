import { View, Text } from "react-native";

export function LoadingState() {
  return (
    <View className="flex-1 bg-zinc-900 justify-center items-center">
      <Text className="text-white text-lg">Cargando libro...</Text>
    </View>
  );
} 