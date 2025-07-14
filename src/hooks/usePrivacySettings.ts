import { useState, useEffect, useCallback } from 'react'
import { PrivacySetting, PrivacySettingsState, PrivacySettingsActions } from '../types/privacy'
import { getPrivacySettings, updatePrivacySettings } from '../services/privacyService'
import { hasSettingsChanged } from '../utils/privacyUtils'

export function usePrivacySettings() {
  const [settings, setSettings] = useState<PrivacySetting[]>([])
  const [originalSettings, setOriginalSettings] = useState<PrivacySetting[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasChanges = hasSettingsChanged(originalSettings, settings)

  const loadSettings = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const privacySettings = await getPrivacySettings()
      setSettings(privacySettings)
      setOriginalSettings([...privacySettings])
    } catch (err) {
      setError('Error al cargar las configuraciones de privacidad')
      console.error('Error loading privacy settings:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const toggleSetting = useCallback((id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, value: !setting.value } : setting,
      ),
    )
  }, [])

  const saveSettings = useCallback(async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    
    try {
      await updatePrivacySettings(settings)
      setOriginalSettings([...settings])
      return true
    } catch (err) {
      setError('Error al guardar las configuraciones de privacidad')
      console.error('Error saving privacy settings:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [settings])

  const resetSettings = useCallback(() => {
    setSettings([...originalSettings])
    setError(null)
  }, [originalSettings])

  // Cargar configuraciones al montar el componente
  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  const state: PrivacySettingsState = {
    settings,
    isLoading,
    error,
    hasChanges,
  }

  const actions: PrivacySettingsActions = {
    toggleSetting,
    saveSettings,
    loadSettings,
    resetSettings,
  }

  return { state, actions }
} 