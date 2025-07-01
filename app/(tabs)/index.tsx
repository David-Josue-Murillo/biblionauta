import '../../global.css'
import { ScrollView, Text, View, Image } from 'react-native';
import Books from '../../src/components/Books';
import { useBooks } from '../../src/hooks/useBooks';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  const { books } = useBooks();
  // Selecciona los primeros 8 libros como destacados
  const featuredBooks = books?.slice(0, 8) || [];

  return (
    <View className='w-full h-full flex bg-zinc-900'>
      {/* Carrusel horizontal de libros destacados */}
      <View className='mt-2 mb-2'>
        <Text className='text-2xl font-bold text-white pl-4 mb-1'>Recomendado para ti</Text>
        <Text className='text-base text-zinc-300 pl-4 mb-2'>Creemos que estos libros pueden gustarte</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className='pl-4'
        >
          {featuredBooks.map((book) => (
            <View
              key={book.id}
              className='mr-4 w-56 rounded-2xl shadow-lg p-3 flex-col items-center'
              style={{ elevation: 6 }}
            >
              <Image
                source={{ uri: book.imageLinks?.thumbnail }}
                className='w-32 h-44 rounded-xl mb-2'
                resizeMode='cover'
                accessibilityLabel={`Portada de ${book.title}`}
              />
              <Text className='text-base font-bold text-white text-center' numberOfLines={2}>{book.title}</Text>
              {book.authors && (
                <Text className='text-xs text-zinc-300 text-center mb-1' numberOfLines={1}>{book.authors.join(', ')}</Text>
              )}
              {book.description && (
                <Text className='text-xs text-zinc-400 text-center' numberOfLines={2}>{book.description}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Libros */}
      <ScrollView className='flex-1'>
        <Books books={books} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
