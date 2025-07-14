export interface PrivacySetting {
  id: string
  title: string
  description: string
  value: boolean
  category: 'profile' | 'activity' | 'notifications'
}

export interface PrivacySettingsState {
  settings: PrivacySetting[]
  isLoading: boolean
  error: string | null
  hasChanges: boolean
}

export interface PrivacySettingsActions {
  toggleSetting: (id: string) => void
  saveSettings: () => Promise<boolean>
  loadSettings: () => Promise<void>
  resetSettings: () => void
}

export interface GroupedPrivacySettings {
  [category: string]: PrivacySetting[]
} 