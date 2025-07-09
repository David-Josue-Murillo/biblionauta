import { View, ScrollView, Text, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../src/constants/colors";
import { mockUserProfile } from "../../src/mocks/profileData";
import { Ionicons } from "@expo/vector-icons";
import {
  EditProfileButton,
  StatsCard,
  ReadingProgress,
  RecentBookCard,
  AchievementCard,
  ContactInfo
} from "../../src/components/Profile";
import HeaderProfile from "../../src/components/Profile/HeaderProfile";

export default function ProfileScreen() {
  const profile = mockUserProfile;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };



  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background.primary }}>
      <StatusBar style="light" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header con foto de perfil */}
        <HeaderProfile profile={profile}/>

        {/* Estadísticas rápidas */}
        <View className="px-4 mt-4 mb-6">
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
          <View className="px-4 mb-6">
            <View
              className="rounded-2xl p-4"
              style={{ backgroundColor: COLORS.background.secondary }}
            >
              <Text className="text-white text-base leading-6">{profile.bio}</Text>
            </View>
          </View>
        )}

        {/* Estadísticas de lectura */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-bold text-white mb-4">Estadísticas de Lectura</Text>
          <View
            className="rounded-2xl p-4"
            style={{ backgroundColor: COLORS.background.secondary }}
          >
            <ReadingProgress
              current={profile.readingStats.monthlyProgress}
              goal={profile.readingStats.monthlyGoal}
              label="Meta mensual"
            />

            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-white font-bold text-lg">{profile.readingStats.totalPages.toLocaleString()}</Text>
                <Text className="text-zinc-400 text-xs">Páginas leídas</Text>
              </View>
              <View className="items-center">
                <Text className="text-white font-bold text-lg">{profile.readingStats.averageRating}</Text>
                <Text className="text-zinc-400 text-xs">Rating promedio</Text>
              </View>
              <View className="items-center">
                <Text className="text-white font-bold text-lg">{profile.readingStats.readingStreak}</Text>
                <Text className="text-zinc-400 text-xs">Días seguidos</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Géneros favoritos */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-bold text-white mb-4">Géneros Favoritos</Text>
          <View className="flex-row flex-wrap gap-2">
            {profile.readingStats.favoriteGenres.map((genre, index) => (
              <View
                key={index}
                className="px-3 py-2 rounded-full"
                style={{ backgroundColor: COLORS.accent.primary }}
              >
                <Text className="text-black font-medium text-sm">{genre}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Libros recientes */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-white">Libros Recientes</Text>
            <Pressable>
              <Text className="text-zinc-400">Ver todos</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {profile.recentBooks.map((book) => (
              <RecentBookCard key={book.id} book={book} />
            ))}
          </ScrollView>
        </View>

        {/* Logros */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-4">
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
              {profile.achievements.slice(0, 6).map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </View>
          </View>
        </View>

        {/* Información de contacto */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Información de Contacto</Text>
          <ContactInfo
            email={profile.email}
            phoneNumber={profile.phoneNumber}
            website={profile.website}
          />
        </View>
      </ScrollView>
    </View>
  );
}
