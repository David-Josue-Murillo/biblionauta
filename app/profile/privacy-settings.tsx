import { ScrollView, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { COLORS } from '../../src/constants/colors'
import { privacyTexts } from '../../src/constants/privacyTexts'
import { usePrivacySettings } from '../../src/hooks/usePrivacySettings'
import { groupSettingsByCategory } from '../../src/utils/privacyUtils'
import { HeaderBar, SectionCard, SwitchRow, InfoCard } from '../../src/components/ui'

export default function PrivacySettingsScreen() {
  const { state, actions } = usePrivacySettings()
  const { settings, isLoading, hasChanges } = state
  const { toggleSetting, saveSettings } = actions

  const handleCancel = () => {
    router.back()
  }

  const handleSave = async () => {
    const success = await saveSettings()
    if (success) {
      router.back()
    }
  }

  const groupedSettings = groupSettingsByCategory(settings)

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background.primary }}>
      <StatusBar style="light" />

      <HeaderBar
        title={privacyTexts.header}
        leftButton={{
          text: privacyTexts.cancel,
          onPress: handleCancel,
        }}
        rightButton={{
          text: privacyTexts.save,
          onPress: handleSave,
          disabled: !hasChanges || isLoading,
          variant: 'primary',
        }}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-6">
          {Object.entries(groupedSettings).map(([category, categorySettings]) => (
            <SectionCard
              key={category}
              icon={privacyTexts.icons[category as keyof typeof privacyTexts.icons]}
              title={privacyTexts.categories[category as keyof typeof privacyTexts.categories]}
            >
              {categorySettings.map((setting, index) => (
                <SwitchRow
                  key={setting.id}
                  title={setting.title}
                  description={setting.description}
                  value={setting.value}
                  onValueChange={() => toggleSetting(setting.id)}
                  isLast={index === categorySettings.length - 1}
                />
              ))}
            </SectionCard>
          ))}
        </View>

        {/* Información adicional */}
        <View className="mx-4 mb-8">
          <InfoCard variant="filled">
            <Text className="text-sm leading-5 text-zinc-400">
              💡 <Text className="font-medium text-white">{privacyTexts.tip.title}</Text>{' '}
              {privacyTexts.tip.content}
            </Text>
          </InfoCard>
        </View>
      </ScrollView>
    </View>
  )
}
