import { PrivacySetting, GroupedPrivacySettings } from '../types/privacy'

export function groupSettingsByCategory(settings: PrivacySetting[]): GroupedPrivacySettings {
  return settings.reduce(
    (acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = []
      }
      acc[setting.category].push(setting)
      return acc
    },
    {} as GroupedPrivacySettings,
  )
}

export function hasSettingsChanged(originalSettings: PrivacySetting[], currentSettings: PrivacySetting[]): boolean {
  if (originalSettings.length !== currentSettings.length) {
    return true
  }

  return originalSettings.some((original, index) => {
    const current = currentSettings[index]
    return original.id !== current.id || original.value !== current.value
  })
} 