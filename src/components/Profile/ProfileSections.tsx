import { Pressable, ScrollView, Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'
import { mockUserProfile } from '../../mocks/profileData'
import {
  AchievementCard,
  ContactInfo,
  ReadingProgress,
  RecentBookCard,
  StatsCard,
} from './'

const MAX_ACHIEVEMENTS_DISPLAY = 6

export function ProfileStats({ profile }: { profile: typeof mockUserProfile }) {
  return (
    <View className="mb-6 mt-4 px-4">
      <View className="flex-row gap-3">
        <StatsCard icon="📚" value={profile.booksRead} label="Libros leídos" />
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
  )
}

export function ProfileBio({ profile }: { profile: typeof mockUserProfile }) {
  if (!profile.bio) return null

  return (
    <View className="mb-6 px-4">
      <View
        className="rounded-2xl border p-4"
        style={{
          backgroundColor: COLORS.background.secondary,
          borderColor: COLORS.border.secondary,
        }}
      >
        <Text className="text-base leading-6 text-white">{profile.bio}</Text>
      </View>
    </View>
  )
}

export function ReadingStatsSection({
  profile,
}: {
  profile: typeof mockUserProfile
}) {
  return (
    <View className="mb-6 px-4">
      <Text className="mb-4 text-xl font-bold text-white">
        Estadísticas de Lectura
      </Text>
      <View
        className="rounded-2xl border p-4"
        style={{
          backgroundColor: COLORS.background.secondary,
          borderColor: COLORS.status.success,
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
  )
}

export function FavoriteGenres({
  profile,
}: {
  profile: typeof mockUserProfile
}) {
  return (
    <View className="mb-6 px-4">
      <Text className="mb-4 text-xl font-bold text-white">
        Géneros Favoritos
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {profile.readingStats.favoriteGenres.map(genre => (
          <View
            key={genre}
            className="rounded-full px-3 py-2"
            style={{ backgroundColor: COLORS.accent.primary }}
          >
            <Text className="text-sm font-medium text-black">{genre}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export function RecentBooks({ profile }: { profile: typeof mockUserProfile }) {
  return (
    <View className="mb-6 px-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Libros Recientes</Text>
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
  )
}

export function AchievementsSection({
  profile,
}: {
  profile: typeof mockUserProfile
}) {
  return (
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
          {profile.achievements
            .slice(0, MAX_ACHIEVEMENTS_DISPLAY)
            .map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
        </View>
      </View>
    </View>
  )
}

export function ContactSection({
  profile,
}: {
  profile: typeof mockUserProfile
}) {
  return (
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
  )
}
