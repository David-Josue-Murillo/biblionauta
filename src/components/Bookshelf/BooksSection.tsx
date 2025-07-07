import { View, Text, ScrollView, Pressable } from "react-native";
import { COLORS } from '../../constants/colors';
import { Book } from '../../mocks/bookshelfData';
import { BookCard } from './BookCard';
import { BOOKSHELF_SECTIONS } from '../../constants/bookshelf';

interface BooksSectionProps {
  title: string;
  books: Book[];
  icon: string;
  color: string;
  onPress?: () => void;
  showProgress?: boolean;
  showStatus?: boolean;
}

export function BooksSection({ 
  title, 
  books, 
  icon, 
  color, 
  onPress, 
  showProgress = true, 
  showStatus = true 
}: BooksSectionProps) {
  if (books.length === 0) {
    return null;
  }

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mx-4 mb-3">
        <View className="flex-row items-center">
          <Text className="text-2xl mr-2">{icon}</Text>
          <Text className="text-lg font-bold text-white">{title}</Text>
          <Text className="text-zinc-400 text-sm ml-2">({books.length})</Text>
        </View>
        {onPress && (
          <Pressable onPress={onPress}>
            <Text className="text-zinc-400 text-sm">Ver todos</Text>
          </Pressable>
        )}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 32 }}
      >
        {books.map((book) => (
          <View key={book.id} className="mr-4" style={{ width: 160 }}>
            <BookCard 
              book={book} 
              showProgress={showProgress}
              showStatus={showStatus}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

interface BookshelfOverviewProps {
  books: Book[];
  onSectionPress?: (sectionId: string) => void;
}

export function BookshelfOverview({ books, onSectionPress }: BookshelfOverviewProps) {
  const getBooksByStatus = (status: string) => {
    return books.filter(book => book.status === status);
  };

  const getFavoriteBooks = () => {
    return books.filter(book => book.isFavorite);
  };

  return (
    <View>
      {/* Libros leyendo actualmente */}
      <BooksSection
        title="Leyendo actualmente"
        books={getBooksByStatus('IN_PROGRESS')}
        icon="📖"
        color="#FFD700"
        onPress={() => onSectionPress?.('currently_reading')}
        showProgress={true}
        showStatus={false}
      />

      {/* Lista de lectura */}
      <BooksSection
        title="Lista de lectura"
        books={getBooksByStatus('WANT_TO_READ')}
        icon="📋"
        color="#00fff7"
        onPress={() => onSectionPress?.('want_to_read')}
        showProgress={false}
        showStatus={false}
      />

      {/* Libros completados */}
      <BooksSection
        title="Completados"
        books={getBooksByStatus('COMPLETED')}
        icon="✅"
        color="#48bb78"
        onPress={() => onSectionPress?.('completed')}
        showProgress={false}
        showStatus={false}
      />

      {/* Libros favoritos */}
      <BooksSection
        title="Favoritos"
        books={getFavoriteBooks()}
        icon="❤️"
        color="#ff69b4"
        onPress={() => onSectionPress?.('favorites')}
        showProgress={true}
        showStatus={true}
      />
    </View>
  );
} 