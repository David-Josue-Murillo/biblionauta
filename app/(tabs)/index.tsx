import '../../global.css'
import { ScrollView, Text, View, Image } from 'react-native';
import Books from '../../src/components/Books';
import { useBooks } from '../../src/hooks/useBooks';
import { StyleSheet } from 'react-native';
import CarourselBook from '../../src/components/CarourselBook';
import Welcome from '../../src/components/Welcome';

export default function HomeScreen() {
  const { books } = useBooks();

  return (
    <View className='w-full h-full flex bg-zinc-900'>
      <ScrollView className='flex-1'>
        {/* Texto de bienvenida */}
        <Welcome />

        {/* Carrusel horizontal de libros destacados */}
        <CarourselBook books={books} />

        {/* Libros */}
        <View className='my-4'>
          <Text className='text-2xl font-bold text-white pl-4 mb-1'>Hackea tu mente...</Text>
          <Text className='text-base text-zinc-300 pl-4 mb-2'>Atrévete a descubrir nuevas ideas y expandir tus horizontes con cada libro.</Text>
        </View>
        <Books books={books} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
