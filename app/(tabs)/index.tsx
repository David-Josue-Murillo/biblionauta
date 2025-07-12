import '../../global.css'
import { ScrollView, Text, View } from 'react-native'
import Books from '../../src/components/Books'
import { useBooks } from '../../src/hooks/useBooks'
import { StyleSheet } from 'react-native'
import CarourselBook from '../../src/components/CarourselBook'
import Welcome from '../../src/components/Welcome'

export default function HomeScreen() {
  const { books } = useBooks()

  return (
    <View className="flex h-full w-full bg-zinc-900">
      <ScrollView className="flex-1">
        {/* Texto de bienvenida */}
        <Welcome />

        {/* Carrusel horizontal de libros destacados */}
        <CarourselBook books={books} />

        {/* Libros */}
        <View className="my-4">
          <Text className="mb-1 pl-4 text-2xl font-bold text-white">
            Hackea tu mente...
          </Text>
          <Text className="mb-2 pl-4 text-base text-zinc-300">
            Atrévete a descubrir nuevas ideas y expandir tus horizontes con cada
            libro.
          </Text>
        </View>
        <Books books={books} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
