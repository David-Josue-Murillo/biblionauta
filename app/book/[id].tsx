import { View, ScrollView } from "react-native";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Custom hooks
import { useBookDetails } from "../../src/hooks/useBookDetails";

// Components
import { 
  BookHeader, 
  BookDetails, 
  ActionButtons, 
  LoadingState, 
  ErrorState 
} from "../../src/components/BookDetail";

// Constants
import { COLORS } from "../../src/constants/colors";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const { book, loading, error } = useBookDetails(id as string);
  const navigate = useNavigation();

  const handleGoBack = () => {
    navigate.goBack();
  };

  const handleAddToWishlist = () => {
    // TODO: Implementar lógica para añadir a lista de deseos
    console.log('Añadir a lista de deseos:', book?.title);
  };

  const handleAddToShelf = () => {
    // TODO: Implementar lógica para añadir a estantería
    console.log('Añadir a estantería:', book?.title);
  };

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error || !book) {
    return <ErrorState error={error || ''} onGoBack={handleGoBack} />;
  }

  return (
    <View className="flex-1 bg-zinc-900">
      <StatusBar style="dark" />
      
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.accent.primary },
          headerTintColor: COLORS.background.primary,
          headerTitle: book.title,
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <BookHeader book={book} />
        <BookDetails book={book} />
      </ScrollView>

      <ActionButtons 
        onAddToWishlist={handleAddToWishlist}
        onAddToShelf={handleAddToShelf}
      />
    </View>
  );
}