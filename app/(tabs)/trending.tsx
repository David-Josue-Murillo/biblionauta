import '../../global.css'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useBooks } from '../../src/hooks/useBooks'
import BooksItems from '../../src/components/BooksItems'
import { colors } from '../../src/constants/theme'

export default function TrendingScreen() {
  const { books } = useBooks()

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Top libros</Text>
        <BooksItems books={books} highlighted showDetails />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    paddingVertical: 16,
  },

  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
})
