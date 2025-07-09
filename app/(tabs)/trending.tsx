import { View, Text, ScrollView, StyleSheet  } from "react-native";
import { useBooks } from '../../src/hooks/useBooks';
import BooksItems from '../../src/components/BooksItems';
import { colors } from "../../src/constants/theme";
import { AddToShelfButton } from "../../src/components/Buttons";

export default function TrendingScreen(){
  const { books } = useBooks();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Top libros</Text>
        <BooksItems books={books} highlighted />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  scrollContainer: {
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary || "#FFD700", 
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
