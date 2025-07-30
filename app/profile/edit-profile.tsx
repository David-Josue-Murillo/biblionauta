import { ScrollView, Text, View, TextInput, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { COLORS } from '../../src/constants/colors'
import { useEditProfile } from '../../src/hooks/useEditProfile'
import { editProfileTexts } from '../../src/constants/editProfileTexts'
import { PrimaryButton } from '../../src/components/ChangePassword/PrimaryButton'
import { SecondaryButton } from '../../src/components/ChangePassword/SecondaryButton'

export default function EditProfileScreen() {
  const {
    form,
    errors,
    isLoading,
    isInitialLoading,
    success,
    handleChange,
    handleSubmit,
    resetForm,
    setSuccess,
  } = useEditProfile()

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
        router.back()
      }, 1200)
    }
  }, [success, setSuccess])

  const handleCancel = () => {
    resetForm()
    router.back()
  }

  if (isInitialLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: COLORS.background.primary }}
      >
        <ActivityIndicator size="large" color={COLORS.accent.primary} />
        <Text className="mt-4 text-white">Cargando perfil...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background.primary }}>
      <StatusBar style="light" />

      {/* Header */}
      <View
        className="flex-row items-center justify-between border-b px-4 py-4"
        style={{ borderColor: COLORS.border.muted }}
      >
        <SecondaryButton onPress={handleCancel}>{editProfileTexts.cancel}</SecondaryButton>

        <Text className="text-xl font-bold text-white">{editProfileTexts.header}</Text>

        <PrimaryButton onPress={handleSubmit} disabled={isLoading}>
          {editProfileTexts.save}
        </PrimaryButton>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View className="mx-4 mb-6 mt-6">
          <View
            className="rounded-2xl p-6"
            style={{
              backgroundColor: COLORS.background.secondary,
              borderWidth: 1,
              borderColor: COLORS.border.muted,
            }}
          >
            <Text className="mb-4 text-lg text-white">{editProfileTexts.avatar}</Text>
            {/* Aquí iría el componente de selección de avatar */}
          </View>
        </View>

        {/* Form Section */}
        <View className="mx-4 mb-8">
          {/* Campo Nombre */}
          <Text className="mb-1 text-sm text-zinc-400">{editProfileTexts.name}</Text>
          <TextInput
            value={form.name}
            onChangeText={text => handleChange('name', text)}
            className="mb-2 rounded-lg bg-zinc-800 px-4 py-2 text-white"
            placeholder={editProfileTexts.placeholderName}
            placeholderTextColor={COLORS.text.muted}
          />
          {errors.name && <Text className="mb-2 text-xs text-red-400">{errors.name}</Text>}

          {/* Campo Email */}
          <Text className="mb-1 text-sm text-zinc-400">{editProfileTexts.email}</Text>
          <TextInput
            value={form.email}
            onChangeText={text => handleChange('email', text)}
            className="mb-2 rounded-lg bg-zinc-800 px-4 py-2 text-white"
            placeholder={editProfileTexts.placeholderEmail}
            placeholderTextColor={COLORS.text.muted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text className="mb-2 text-xs text-red-400">{errors.email}</Text>}

          {/* Error general */}
          {errors.general && <Text className="mb-2 text-xs text-red-400">{errors.general}</Text>}

          {/* Loading indicator */}
          {isLoading && (
            <View className="mt-4 items-center">
              <ActivityIndicator color={COLORS.accent.primary} />
              <Text className="mt-2 text-sm text-zinc-400">Actualizando perfil...</Text>
            </View>
          )}

          {/* Success message */}
          {success && (
            <Text className="mb-2 text-xs text-green-400">{editProfileTexts.success}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
