import '../../global.css'
import { View, Text, ScrollView, Image, StyleSheet  } from "react-native";
import { useBooks } from '../../src/hooks/useBooks';
import BooksItems from '../../src/components/BooksItems';
import { colors } from "../../src/constants/theme";

export default function TrendingScreen(){
  const { books } = useBooks();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Top libros</Text>
        <BooksItems books={books} highlighted showDetails />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: colors.background,
  padding: 16,
},
scrollContainer: {
  paddingVertical: 16,
},

title: {
  fontSize: 24,
  fontWeight: "bold",
  color: colors.primary,
  textAlign: "center",
  marginBottom: 16,
},
});