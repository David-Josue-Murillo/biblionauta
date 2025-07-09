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
import WithoutBooks from "../../src/components/Bookshelf/WithoutBooks";

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
        <WithoutBooks books={books}/>
      </ScrollView>
    </View>
  );
}