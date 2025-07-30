import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useAuth } from '../../src/hooks/useAuth'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../../src/constants/colors'
import { mockUserProfile } from '../../src/mocks/profileData'
import HeaderProfile from '../../src/components/Profile/HeaderProfile'
import {
  AchievementsSection,
  ContactSection,
  FavoriteGenres,
  ProfileBio,
  ProfileStats,
  ReadingStatsSection,
  RecentBooks,
} from '../../src/components/Profile/ProfileSections'

export default function ProfileScreen() {
  const profile = mockUserProfile
  const { signOut, isLoading } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (_e) {
      // Puedes mostrar un toast o alerta si lo deseas
      // console.error('Error al cerrar sesión', e)
      throw new Error('Error al cerrar sesión', { cause: _e })
    }
  }

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: COLORS.background.primary }}
    >
      <StatusBar style="light" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <HeaderProfile profile={profile} />
        <ProfileStats profile={profile} />
        <ProfileBio profile={profile} />
        <ReadingStatsSection profile={profile} />
        <FavoriteGenres profile={profile} />
        <RecentBooks profile={profile} />
        <AchievementsSection profile={profile} />
        <ContactSection profile={profile} />

        {/* Botón cerrar sesión */}
        <View className="mb-8 mt-2 w-full items-center">
          <TouchableOpacity
            onPress={handleSignOut}
            disabled={isLoading}
            className="w-11/12 rounded-xl bg-red-400 px-8 py-3"
          >
            <Text className="text-center text-lg font-bold text-white">
              {isLoading ? 'Cerrando sesión...' : 'Cerrar sesión'}
            </Text>
            {isLoading && (
              <ActivityIndicator color="#fff" size={18} className="ml-2.5" />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
