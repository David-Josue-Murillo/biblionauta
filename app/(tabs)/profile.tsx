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
        <View className="relative">
          {/* Banner de fondo con gradiente */}
          <View className="h-56 w-full relative">
            <View 
              className="absolute inset-0"
              style={{ backgroundColor: COLORS.background.secondary }}
            />
          </View>
          
          {/* Información del perfil */}
          <View className="absolute bottom-0 left-0 right-0 px-4 pb-6">
            <View className="flex-row items-end">
              {/* Foto de perfil */}
              <View className="relative">
                <Image
                  source={{ uri: profile.photoURL ? profile.photoURL : require('../../assets/img/avatar.webp') }}
                  className="w-28 h-28 rounded-full border-4"
                  style={{ borderColor: COLORS.background.primary }}
                />
                <View 
                  className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.accent.primary,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5
                  }}
                >
                  <Ionicons name="camera" size={18} color="white" />
                </View>
              </View>
              
              <View className="flex-1 ml-5">
                <Text className="text-3xl font-bold text-white mb-2 shadow-sm">
                  {profile.displayName}
                </Text>
                <View className="flex-row items-center mb-3">
                  <View 
                    className="px-3 py-1 rounded-full mr-3"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Text className="text-white font-medium text-sm">
                      Miembro desde {profile.memberSince}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center mb-4">
                  <View 
                    className="w-8 h-8 rounded-full items-center justify-center mr-2"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Ionicons name="location" size={16} color="white" />
                  </View>
                  <Text className="text-white font-medium text-base">
                    {profile.location}
                  </Text>
                </View>
                <EditProfileButton onPress={() => {}} />
              </View>
            </View>
          </View>
        </View>

        {/* Estadísticas rápidas */}
        <View className="px-4 -mt-4 mb-6">
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
