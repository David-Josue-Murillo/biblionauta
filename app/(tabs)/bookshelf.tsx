import { View, ScrollView, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../src/constants/colors";

// Components
import { 
  ReadingStats, 
  AchievementsSection, 
  BookshelfOverview,
  PersonalCollections
} from "../../src/components/Bookshelf";

// Data
import { 
  userBooks, 
  readingStats, 
  userAchievements,
  personalCollections
} from "../../src/mocks/bookshelfData";

export default function Bookshelf() {
  const handleStatsPress = () => {
    console.log('Ver estadísticas detalladas');
    // TODO: Navegar a pantalla de estadísticas detalladas
  };

  const handleAchievementsPress = () => {
    console.log('Ver todos los logros');
    // TODO: Navegar a pantalla de logros
  };

  const handleSectionPress = (sectionId: string) => {
    console.log('Sección presionada:', sectionId);
    // TODO: Navegar a pantalla específica de la sección
  };

  const handleAddBookPress = () => {
    console.log('Agregar nuevo libro');
    // TODO: Navegar a búsqueda de libros
  };

  const handleCollectionsPress = () => {
    console.log('Gestionar colecciones');
    // TODO: Navegar a gestión de colecciones
  };

  const handleCollectionPress = (collectionId: string) => {
    console.log('Colección presionada:', collectionId);
    // TODO: Navegar a vista de colección específica
  };

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background.primary }}>
      <StatusBar style="light" />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="mx-4 mt-8 mb-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-white">📚 Mi Biblioteca</Text>
              <Text className="text-zinc-400 text-sm">
                {userBooks.length} libros en tu colección
              </Text>
            </View>
            <Pressable
              className="bg-amber-500 px-4 py-2 rounded-xl"
              onPress={handleAddBookPress}
              accessible
              accessibilityLabel="Agregar libro"
              accessibilityHint="Toca para buscar y agregar un nuevo libro"
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#d97706' : COLORS.accent.primary }
              ]}
            >
              <Text className="text-white font-semibold">+ Agregar</Text>
            </Pressable>
          </View>
        </View>

        {/* Estadísticas de lectura */}
        <ReadingStats 
          stats={readingStats} 
          onPress={handleStatsPress}
        />

        {/* Logros */}
        <AchievementsSection 
          achievements={userAchievements}
          onPress={handleAchievementsPress}
        />

        {/* Colecciones personalizadas */}
        <PersonalCollections
          collections={personalCollections}
          onPress={handleCollectionsPress}
          onCollectionPress={handleCollectionPress}
        />

        {/* Secciones de libros */}
        <BookshelfOverview 
          books={userBooks}
          onSectionPress={handleSectionPress}
        />

        {/* Mensaje si no hay libros */}
        {userBooks.length === 0 && (
          <View className="mx-4 mt-8 items-center">
            <Text className="text-6xl mb-4">📚</Text>
            <Text className="text-white text-lg font-semibold mb-2">
              Tu biblioteca está vacía
            </Text>
            <Text className="text-zinc-400 text-center mb-6">
              Comienza agregando libros a tu colección personal. 
              Busca tus títulos favoritos y organízalos como prefieras.
            </Text>
            <Pressable
              className="bg-amber-500 px-6 py-3 rounded-xl"
              onPress={handleAddBookPress}
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#d97706' : COLORS.accent.primary }
              ]}
            >
              <Text className="text-white font-semibold">Buscar libros</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}