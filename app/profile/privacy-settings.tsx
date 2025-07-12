import { View, ScrollView, Text, Pressable, Switch } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { router } from 'expo-router'
import { COLORS } from '../../src/constants/colors'

interface PrivacySetting {
  id: string
  title: string
  description: string
  value: boolean
  category: 'profile' | 'activity' | 'notifications'
}

export default function PrivacySettingsScreen() {
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: 'profile-visible',
      title: 'Perfil público',
      description: 'Permitir que otros usuarios vean tu perfil',
      value: true,
      category: 'profile',
    },
    {
      id: 'reading-activity',
      title: 'Actividad de lectura',
      description: 'Mostrar qué libros estás leyendo',
      value: true,
      category: 'activity',
    },
    {
      id: 'reviews-public',
      title: 'Reseñas públicas',
      description: 'Hacer públicas tus reseñas de libros',
      value: true,
      category: 'activity',
    },
    {
      id: 'email-notifications',
      title: 'Notificaciones por email',
      description: 'Recibir notificaciones por correo electrónico',
      value: true,
      category: 'notifications',
    },
    {
      id: 'push-notifications',
      title: 'Notificaciones push',
      description: 'Recibir notificaciones en el dispositivo',
      value: true,
      category: 'notifications',
    },
  ])

  const handleToggle = (id: string) => {
    setPrivacySettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    )
  }

  const handleCancel = () => {
    router.back()
  }

  const groupedSettings = privacySettings.reduce(
    (acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = []
      }
      acc[setting.category].push(setting)
      return acc
    },
    {} as Record<string, PrivacySetting[]>
  )

  const categoryTitles = {
    profile: 'Perfil',
    activity: 'Actividad',
    notifications: 'Notificaciones',
  }

  const categoryIcons = {
    profile: '👤',
    activity: '📚',
    notifications: '🔔',
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

        <Text className="text-xl font-bold text-white">Privacidad</Text>

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
          >
            Guardar
          </Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-6">
          {Object.entries(groupedSettings).map(([category, settings]) => (
            <View key={category} className="mb-6">
              <View className="mb-3 flex-row items-center">
                <Text className="mr-2 text-2xl">
                  {categoryIcons[category as keyof typeof categoryIcons]}
                </Text>
                <Text className="text-lg font-bold text-white">
                  {categoryTitles[category as keyof typeof categoryTitles]}
                </Text>
              </View>

              <View
                className="overflow-hidden rounded-xl"
                style={{
                  backgroundColor: COLORS.background.secondary,
                  borderWidth: 1,
                  borderColor: COLORS.border.muted,
                }}
              >
                {settings.map((setting, index) => (
                  <View
                    key={setting.id}
                    className={`flex-row items-center justify-between px-4 py-4 ${
                      index < settings.length - 1
                        ? 'border-b border-zinc-700'
                        : ''
                    }`}
                  >
                    <View className="mr-4 flex-1">
                      <Text className="mb-1 text-base font-medium text-white">
                        {setting.title}
                      </Text>
                      <Text className="text-sm text-zinc-400">
                        {setting.description}
                      </Text>
                    </View>

                    <Switch
                      value={setting.value}
                      onValueChange={() => handleToggle(setting.id)}
                      trackColor={{
                        false: COLORS.background.tertiary,
                        true: COLORS.accent.primary,
                      }}
                      thumbColor={
                        setting.value
                          ? COLORS.accent.secondary
                          : COLORS.text.muted
                      }
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Información adicional */}
        <View className="mx-4 mb-8">
          <View
            className="rounded-xl p-4"
            style={{
              backgroundColor: COLORS.background.secondary,
              borderWidth: 1,
              borderColor: COLORS.border.muted,
            }}
          >
            <Text className="text-sm leading-5 text-zinc-400">
              💡 <Text className="font-medium text-white">Consejo:</Text> Puedes
              cambiar estas configuraciones en cualquier momento. Los cambios se
              aplican inmediatamente.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
