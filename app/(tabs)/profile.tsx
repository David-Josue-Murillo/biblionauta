import {
  View,
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useAuth } from '../../src/hooks/useAuth'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../../src/constants/colors'
import { mockUserProfile } from '../../src/mocks/profileData'
import {
  StatsCard,
  ReadingProgress,
  RecentBookCard,
  AchievementCard,
  ContactInfo,
} from '../../src/components/Profile'
import HeaderProfile from '../../src/components/Profile/HeaderProfile'

export default function ProfileScreen() {
  const profile = mockUserProfile
  const { signOut, isLoading } = useAuth()
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (e) {
      // Puedes mostrar un toast o alerta si lo deseas
      console.error('Error al cerrar sesión', e)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: COLORS.background.primary }}
    >
      <StatusBar style="light" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header con foto de perfil */}
        <HeaderProfile profile={profile} />

        {/* Estadísticas rápidas */}
        <View className="mb-6 mt-4 px-4">
          <View className="flex-row gap-3">
            <StatsCard
              icon="📚"
              value={profile.booksRead}
              label="Libros leídos"
            />
            <StatsCard
              icon="❤️"
              value={profile.wishlistItems}
              label="Lista de deseos"
              color="#FF6B6B"
            />
            <StatsCard
              icon="📖"
              value={profile.shelfItems}
              label="En biblioteca"
              color="#4ECDC4"
            />
          </View>
        </View>

        {/* Bio */}
        {profile.bio && (
          <View className="mb-6 px-4">
            <View
              className="rounded-2xl border p-4"
              style={{
                backgroundColor: COLORS.background.secondary,
                borderColor: COLORS.border.secondary,
              }}
            >
              <Text className="text-base leading-6 text-white">
                {profile.bio}
              </Text>
            </View>
          </View>
        )}

        {/* Estadísticas de lectura */}
        <View className="mb-6 px-4">
          <Text className="mb-4 text-xl font-bold text-white">
            Estadísticas de Lectura
          </Text>
          <View
            className="rounded-2xl border p-4"
            style={{
              backgroundColor: COLORS.background.secondary,
              borderColor: '#10B981',
            }}
          >
            <ReadingProgress
              current={profile.readingStats.monthlyProgress}
              goal={profile.readingStats.monthlyGoal}
              label="Meta mensual"
            />

            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-lg font-bold text-white">
                  {profile.readingStats.totalPages.toLocaleString()}
                </Text>
                <Text className="text-xs text-zinc-400">Páginas leídas</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-bold text-white">
                  {profile.readingStats.averageRating}
                </Text>
                <Text className="text-xs text-zinc-400">Rating promedio</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-bold text-white">
                  {profile.readingStats.readingStreak}
                </Text>
                <Text className="text-xs text-zinc-400">Días seguidos</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Géneros favoritos */}
        <View className="mb-6 px-4">
          <Text className="mb-4 text-xl font-bold text-white">
            Géneros Favoritos
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {profile.readingStats.favoriteGenres.map((genre, index) => (
              <View
                key={index}
                className="rounded-full px-3 py-2"
                style={{ backgroundColor: COLORS.accent.primary }}
              >
                <Text className="text-sm font-medium text-black">{genre}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Libros recientes */}
        <View className="mb-6 px-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-white">
              Libros Recientes
            </Text>
            <Pressable>
              <Text className="text-zinc-400">Ver todos</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {profile.recentBooks.map(book => (
              <RecentBookCard key={book.id} book={book} />
            ))}
          </ScrollView>
        </View>

        {/* Logros */}
        <View className="mb-6 px-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-white">Logros</Text>
            <Pressable>
              <Text className="text-zinc-400">Ver todos</Text>
            </Pressable>
          </View>

          <View
            className="rounded-2xl p-4"
            style={{ backgroundColor: COLORS.background.secondary }}
          >
            <View className="flex-row flex-wrap gap-3">
              {profile.achievements.slice(0, 6).map(achievement => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Información de contacto */}
        <View className="mb-8 px-4">
          <Text className="mb-4 text-xl font-bold text-white">
            Información de Contacto
          </Text>
          <ContactInfo
            email={profile.email}
            phoneNumber={profile.phoneNumber}
            website={profile.website}
          />
        </View>

        {/* Botón cerrar sesión (parte inferior) */}
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
              <ActivityIndicator
                color="#fff"
                size={18}
                style={{ marginLeft: 10 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
