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

import { readingStats, userAchievements, personalCollections } from "../../src/mocks/bookshelfData";
import { useUserBooks } from '../../src/contexts/UserBooksContext';
import BookshelfHeader from "../../src/components/Bookshelf/BookshelfHeader";

export default function Bookshelf() {
  const { books } = useUserBooks();


  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background.primary }}>
      <StatusBar style="light" />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
       <BookshelfHeader books={books} />

        {/* Estadísticas de lectura */}
        <ReadingStats 
          stats={readingStats} 
        />

        {/* Logros */}
        <AchievementsSection 
          achievements={userAchievements}
        />

        {/* Colecciones personalizadas */}
        <PersonalCollections
          collections={personalCollections}
        />

        {/* Secciones de libros */}
        <BookshelfOverview 
          books={books}
        />

        {/* Mensaje si no hay libros */}
        {books.length === 0 && (
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