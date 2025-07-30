import { ScrollView, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { COLORS } from '../../src/constants/colors'
import { useChangePassword } from '../../src/hooks/useChangePassword'
import { changePasswordTexts } from '../../src/constants/changePasswordTexts'
import { PasswordField } from '../../src/components/ChangePassword/PasswordField'
import { PasswordStrengthIndicator } from '../../src/components/ChangePassword/PasswordStrengthIndicator'
import { PasswordRequirements } from '../../src/components/ChangePassword/PasswordRequirements'
import { PrimaryButton } from '../../src/components/ChangePassword/PrimaryButton'
import { SecondaryButton } from '../../src/components/ChangePassword/SecondaryButton'

export default function ChangePasswordScreen() {
  const {
    formData,
    errors,
    showPasswords,
    updateField,
    togglePasswordVisibility,
    validateForm,
    resetForm,
  } = useChangePassword()

  const handleCancel = () => {
    resetForm()
    router.back()
  }

  const handleSave = () => {
    if (validateForm()) {
      // Aquí iría la lógica para cambiar la contraseña
      console.log('Formulario válido, cambiando contraseña...')
    }
  }

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background.primary }}>
      <StatusBar style="light" />
      {/* Header */}
      <View
        className="flex-row items-center justify-between border-b px-4 py-4"
        style={{ borderColor: COLORS.border.muted }}
      >
        <SecondaryButton onPress={handleCancel}>{changePasswordTexts.cancel}</SecondaryButton>
        <Text className="text-xl font-bold text-white">{changePasswordTexts.header}</Text>
        <PrimaryButton onPress={handleSave}>{changePasswordTexts.save}</PrimaryButton>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-6">
          {/* Información */}
          <View className="mb-6">
            <View
              className="rounded-xl p-4"
              style={{
                backgroundColor: COLORS.background.secondary,
                borderWidth: 1,
                borderColor: COLORS.border.muted,
              }}
            >
              <Text className="text-sm leading-5 text-zinc-400">
                🔒 <Text className="font-medium text-white">Importante:</Text>{' '}
                {changePasswordTexts.info}
              </Text>
            </View>
          </View>
          {/* Formulario */}
          <View className="mb-6">
            <View className="mb-3 flex-row items-center">
              <Text className="mr-2 text-2xl">🔐</Text>
              <Text className="text-lg font-bold text-white">
                {changePasswordTexts.newPassword}
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
              {/* Contraseña actual */}
              <View className="border-b border-zinc-700 px-4 py-3">
                <PasswordField
                  value={formData.currentPassword}
                  onChange={text => updateField('currentPassword', text)}
                  visible={showPasswords.current}
                  toggleVisibility={() => togglePasswordVisibility('current')}
                  placeholder={changePasswordTexts.placeholderCurrent}
                  error={errors.currentPassword}
                  label={changePasswordTexts.currentPassword}
                />
              </View>
              {/* Nueva contraseña */}
              <View className="border-b border-zinc-700 px-4 py-3">
                <PasswordField
                  value={formData.newPassword}
                  onChange={text => updateField('newPassword', text)}
                  visible={showPasswords.new}
                  toggleVisibility={() => togglePasswordVisibility('new')}
                  placeholder={changePasswordTexts.placeholderNew}
                  error={errors.newPassword}
                  label={changePasswordTexts.newPassword}
                />
                <PasswordStrengthIndicator password={formData.newPassword} />
              </View>
              {/* Confirmar contraseña */}
              <View className="px-4 py-3">
                <PasswordField
                  value={formData.confirmPassword}
                  onChange={text => updateField('confirmPassword', text)}
                  visible={showPasswords.confirm}
                  toggleVisibility={() => togglePasswordVisibility('confirm')}
                  placeholder={changePasswordTexts.placeholderConfirm}
                  error={errors.confirmPassword}
                  label={changePasswordTexts.confirmPassword}
                />
              </View>
            </View>
          </View>
          {/* Requisitos */}
          <View className="mb-8">
            <View className="mb-3 flex-row items-center">
              <Text className="mr-2 text-2xl">📋</Text>
              <Text className="text-lg font-bold text-white">
                {changePasswordTexts.requirementsTitle}
              </Text>
            </View>
            <View
              className="rounded-xl p-4"
              style={{
                backgroundColor: COLORS.background.secondary,
                borderWidth: 1,
                borderColor: COLORS.border.muted,
              }}
            >
              <PasswordRequirements password={formData.newPassword} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
