import { View, ScrollView, Text, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { COLORS } from '../../src/constants/colors'
export default function EditProfileScreen() {
  const handleCancel = () => {
    router.back()
  }

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: COLORS.background.primary }}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View
        className="flex-row items-center justify-between border-b px-4 py-4"
        style={{ borderColor: COLORS.border.muted }}
      >
        <Pressable
          onPress={handleCancel}
          className="rounded-lg p-2"
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? COLORS.background.tertiary
                : 'transparent',
            },
          ]}
        >
          <Text className="text-lg text-white">Cancelar</Text>
        </Pressable>

        <Text className="text-xl font-bold text-white">Editar Perfil</Text>

        <Pressable
          className="rounded-lg p-2"
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? COLORS.background.tertiary
                : 'transparent',
            },
          ]}
        >
          <Text
            className="text-lg font-semibold"
            style={{ color: COLORS.accent.primary }}
          ></Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Estado de red */}

        {/* Avatar Section */}
        <View className="mx-4 mb-6 mt-6">
          <View
            className="rounded-2xl p-6"
            style={{
              backgroundColor: COLORS.background.secondary,
              borderWidth: 1,
              borderColor: COLORS.border.muted,
            }}
          ></View>
        </View>

        {/* Form Section */}
        <View className="mx-4 mb-8"></View>
      </ScrollView>
    </View>
  )
}
