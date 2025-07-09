import { useState } from 'react';
import { Modal, TouchableOpacity, Pressable, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useBookDetails } from "../../src/hooks/useBookDetails";
import { useUserBooks } from '../../src/contexts/UserBooksContext';

// Components
import {
  BookHeader,
  BookDetails,
  LoadingState,
  ErrorState
} from "../../src/components/BookDetail";

// Constants
import { COLORS } from "../../src/constants/colors";

// --- COMPONENTE DE ESTRELLAS ---
function StarRating({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={15}
          color="#FFD700"
          style={{ marginRight: 1 }}
        />
      ))}
    </View>
  );
}

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const { book: detailedBook, loading, error } = useBookDetails(id as string);
  const { books, toggleFavorite, addBook } = useUserBooks();
  // Busca si el libro es favorito en el contexto
  const favoriteBook = books.find(b => b.id === id);
  const isFavorite = favoriteBook?.isFavorite ?? false;
  const navigate = useNavigation();
  // Estado para manejar el modal de categorías
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  const maxChips = 2;
  const extraCategories = (detailedBook?.categories?.length || 0) - maxChips;

  const handleGoBack = () => navigate.goBack();
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const handleAddToWishlist = () => {
    if (!detailedBook) return;
    setIsTogglingFavorite(true);
    if (!favoriteBook) {
      // Si el libro no está en la biblioteca, lo agregamos como favorito
      addBook({
        ...detailedBook,
        isFavorite: true,
        totalPages: 0,
        status: 'NOT_STARTED',
        genre: 'FICTION', // valor por defecto válido
        addedDate: new Date().toISOString(),
      } as any);
    } else {
      toggleFavorite(favoriteBook.id);
    }
    setTimeout(() => setIsTogglingFavorite(false), 350); // Breve feedback visual
  };
  const handleAddToShelf = () => console.log('Añadir a estantería:', detailedBook?.title);

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error || !detailedBook) {
    return <ErrorState error={error || 'Libro no encontrado'} onGoBack={handleGoBack} />;
  }

  const book = { ...detailedBook, isFavorite };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background.primary }}>
      <StatusBar style='dark' />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.accent.primary },
          headerTintColor: COLORS.background.primary,
          headerTitle: book.title,
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Tarjeta principal con imagen y info */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginTop: 32,
          marginBottom: 24,
          marginHorizontal: 18,
          backgroundColor: COLORS.background.secondary,
          borderRadius: 18,
          borderWidth: 2,
          borderColor: COLORS.accent.secondary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.13,
          shadowRadius: 10,
          elevation: 6,
          padding: 12
        }}>
          {/* Contenedor de la portada (con BookHeader dentro) */}
          <View style={{ marginRight: 16, width: 120, height: 180, borderRadius: 12, overflow: 'hidden', backgroundColor: COLORS.background.secondary }}>
            <BookHeader book={book} style={{ width: '100%', height: '100%', borderRadius: 12 }} resizeMode="cover" />
          </View>
          {/* Información a la derecha de la portada */}
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.text.primary, marginBottom: 4 }} numberOfLines={2}>{book.title}</Text>
            <Text style={{ fontSize: 16, color: COLORS.text.secondary, marginBottom: 6 }} numberOfLines={1}>{book.authors?.join(', ')}</Text>
            {/* Rating */}
            <StarRating rating={book.rating || 4} />
            {/* Chips de categorías */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
              {(book.categories?.slice(0, maxChips) || []).map((cat, idx) => (
                <View key={idx} style={{ backgroundColor: COLORS.accent.primary, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, marginRight: 6, marginBottom: 4 }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000000' }}>{cat}</Text>
                </View>
              ))}
              {extraCategories > 0 && (
                <TouchableOpacity onPress={() => setShowCategoriesModal(true)} style={{ backgroundColor: COLORS.text.secondary, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, marginRight: 6, marginBottom: 4 }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: "000" }}>+{extraCategories}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Modal para mostrar todas las categorías */}
        <Modal visible={showCategoriesModal} transparent animationType="fade">
          <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowCategoriesModal(false)}>
            <View style={{ backgroundColor: COLORS.background.secondary, borderRadius: 18, padding: 20, maxWidth: '80%' }}>
              <Text style={{ color: COLORS.text.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Categorías</Text>
              {(book.categories || []).map((cat, idx) => (
                <Text key={idx} style={{ color: COLORS.text.secondary, fontSize: 14, marginBottom: 4 }}>{cat}</Text>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Detalles adicionales */}
        <BookDetails book={book} />
      </ScrollView>

      {/* Botones de acción fijos */}
      <View className='absolute px-14' style={{
        left: 0,
        right: 0,
        bottom: 0,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 14,
        backgroundColor: 'rgba(20,20,30,0.98)'
      }}>
        <Pressable
          onPress={handleAddToWishlist}
          style={({ pressed }) => [{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
            paddingVertical: 14,
            backgroundColor: book?.isFavorite
              ? (isTogglingFavorite ? COLORS.accent.secondary : '#FFD700')
              : (pressed ? COLORS.accent.secondary : COLORS.accent.primary),
            marginRight: 8,
            minHeight: 48,
            opacity: isTogglingFavorite ? 0.7 : 1
          }]}
          accessibilityRole="button"
          accessibilityLabel={book?.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Ionicons
            name={book?.isFavorite
              ? (isTogglingFavorite ? 'heart-dislike' : 'heart')
              : (isTogglingFavorite ? 'heart' : 'heart-outline')}
            size={22}
            color={book?.isFavorite ? COLORS.accent.primary : COLORS.accent.primary}
            style={{ marginRight: 8, alignSelf: 'center', transform: [{ scale: isTogglingFavorite ? 1.2 : 1 }] }}
          />
          <Text style={{
            color: COLORS.text.primary,
            fontWeight: 'bold',
            fontSize: 16,
            textAlignVertical: 'center',
            opacity: isTogglingFavorite ? 0.7 : 1
          }}>
            {book?.isFavorite
              ? (isTogglingFavorite ? 'Quitando...' : 'En Favorito')
              : (isTogglingFavorite ? 'Agregando...' : 'Agregar a favorito')}
          </Text>
        </Pressable>
        <Pressable
          onPress={handleAddToShelf}
          style={({ pressed }) => [{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
            paddingVertical: 14,
            backgroundColor: pressed ? COLORS.accent.secondary : '#10B981',
            marginLeft: 8,
            minHeight: 48,
          }]}
          accessibilityRole="button"
          accessibilityLabel="Añadir a estantería"
        >
          <Ionicons
            name="library"
            size={20}
            color= {COLORS.accent.primary}
            style={{ marginRight: 8, alignSelf: 'center' }}
          />
          <Text style={{ color: COLORS.text.primary, fontWeight: 'bold', fontSize: 16, textAlignVertical: 'center' }}>
            A estantería
          </Text>
        </Pressable>
      </View>
    </View>
  );
}