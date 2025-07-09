import { View, ScrollView, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { COLORS } from "../../src/constants/colors";
import { NetworkStatus } from "../../src/components/NetworkStatus";
import { useAuth } from "../../src/hooks/useAuth";

export default function EditProfileScreen() {
  const { user } = useAuth()

  const handleCancel = () => {
    router.back();
  };

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: COLORS.background.primary }}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-4 border-b"
        style={{ borderColor: COLORS.border.muted }}
      >
        <Pressable
          onPress={handleCancel}
          className="p-2 rounded-lg"
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.background.tertiary : "transparent",
            },
          ]}
        >
          <Text className="text-white text-lg">Cancelar</Text>
        </Pressable>

        <Text className="text-xl font-bold text-white">Editar Perfil</Text>

        <Pressable
          className="p-2 rounded-lg"
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.background.tertiary : "transparent",
            },
          ]}
        >
          <Text 
            className="text-lg font-semibold"
            style={{ color: COLORS.accent.primary }}
          >
          </Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Estado de red */}
        <NetworkStatus showDetails={false} />

        {/* Avatar Section */}
        <View className="mx-4 mt-6 mb-6">
          <View
            className="rounded-2xl p-6"
            style={{
              backgroundColor: COLORS.background.secondary,
              borderWidth: 1,
              borderColor: COLORS.border.muted,
            }}
          >
          </View>
        </View>

        {/* Form Section */}
        <View className="mx-4 mb-8">
        </View>
      </ScrollView>
    </View>
  );
} 