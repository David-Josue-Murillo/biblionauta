import { View, Text, ScrollView } from "react-native";

import { useBooks } from '../../src/hooks/useBooks';
import BooksItems from '../../src/components/BooksItems';

export default function TrendingScreen() {
  const { books } = useBooks();

  return (
    <View>
      <ScrollView >
        <Text >Top libros</Text>
        <BooksItems books={books} />
      </ScrollView>
    </View>
  );
}
