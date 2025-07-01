import '../../global.css'
import { ScrollView, Text, View } from 'react-native';
import Books from '../../src/components/Books';
import { useBooks } from '../../src/hooks/useBooks';

export default function HomeScreen() {

  const { books } = useBooks()

  return (
    <View className='w-full h-full bg-zinc-800'>
      <Text className='text-2xl font-bold text-white'>Bienvenido a Biblionauta</Text>

      {/* Libros */}
      <ScrollView className='flex-1 p-4'>
        <Books books={books} />
      </ScrollView>
    </View>
  );
}
