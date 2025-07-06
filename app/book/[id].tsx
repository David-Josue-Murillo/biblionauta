import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StarIcon } from '../../src/components/Icons';
import { getBookDetails } from "../../src/utils/book";

// Simulación de fetch de datos (reemplaza con tu lógica real)
const mockBook = {
  id: "1",
  title: "The Let Them Theory",
  subtitle: "A Life-Changing Tool That Millions of People Can't Stop Talking About",
  authors: ["Robbins, Mel"],
  language: "en",
  description: "From the multi-million copy New York Times bestselling author Mel Robbins: A life-changing tool that millions of people can't stop talking about.",
  categories: ["Success", "Self-Help"],
  image: "https://books.google.com/books/content?id=abc123&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  rating: 4.5,
  ratingsCount: 116,
};

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon key={i} color={i <= Math.round(rating) ? '#FFD700' : '#444'} size={22} style={{ marginRight: 2 }} />
    );
  }
  return stars;
}

export function useBookDetails(id) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    getBookDetails(id)
      .then((data) => {
        if (isMounted) {
          setBook(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("No se pudo cargar el libro");
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, [id]);

  return { book, loading, error };
}

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const { book, loading, error } = useBookDetails(id);
  const navigate = useNavigation();
  const onGoHome = () => {
    navigate.goBack();
  };

  if (loading) {
    return (
      <View className="flex-1 bg-zinc-900 justify-center items-center">
        <Text className="text-white text-lg">Cargando libro...</Text>
      </View>
    );
  }

  if (error || !book) {
    return (
      <View className="flex-1 bg-zinc-900 justify-center items-center">
        <Text className="text-red-400 text-lg">{error || 'Libro no encontrado'}</Text>
        <Pressable onPress={onGoHome} className="mt-4 border px-4 py-2 border-yellow-400 rounded-lg">
          <Text className="text-white text-base">Volver atrás</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-900">
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "blank",
          headerTitle: "EL hombre en busca del sentido",
        }}
      />

      {/* Cabecera con icono de regresar */}
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Portada y datos principales */}
        <View className="flex-row items-start mt-2 mx-4 gap-x-4">
          <Image
            source={book.image ? { uri: book.image } : require('../../assets/logoBiblionauta.png')}
            className="w-28 h-40 rounded-lg shadow-lg"
            style={{ borderWidth: 2, borderColor: "#00fff7" }}
          />
          <View className="flex-1 justify-start">
            <Text className="text-xl font-extrabold text-white mb-1">{book.title}</Text>
            <Text className="text-base text-zinc-300 mb-1">{book.authors.join(", ")}</Text>
            <View className="flex-row items-center mb-1">
              {renderStars(book.rating)}
              <Text className="text-zinc-300 ml-2 text-sm">({book.ratingsCount})</Text>
            </View>
            <View className="flex-row flex-wrap gap-x-2 mt-1">
              {book.categories.map((cat) => (
                <Text key={cat} className="text-xs bg-pink-300/20 text-pink-300 px-2 py-1 rounded-full mr-1 mt-1">{cat}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Información detallada */}
        <View className="mx-4 rounded-2xl p-4 mt-6" style={{ backgroundColor: "#232946", borderWidth: 1, borderColor: "#00fff7" }}>
          <View className="mb-2">
            <Text className="text-xs text-zinc-400 mb-1">TÍTULO</Text>
            <Text className="text-base text-white mb-2">{book.title}</Text>
          </View>
          <View className="mb-2">
            <Text className="text-xs text-zinc-400 mb-1">SUBTÍTULO</Text>
            <Text className="text-base text-zinc-200 mb-2">{book.subtitle}</Text>
          </View>
          <View className="mb-2">
            <Text className="text-xs text-zinc-400 mb-1">AUTORES</Text>
            <Text className="text-base text-zinc-200 mb-2">{book.authors.join(", ")}</Text>
          </View>
          <View className="mb-2">
            <Text className="text-xs text-zinc-400 mb-1">IDIOMA</Text>
            <Text className="text-base text-zinc-200 mb-2">{book.language}</Text>
          </View>
          <View className="mb-2">
            <Text className="text-xs text-zinc-400 mb-1">DESCRIPCIÓN</Text>
            <Text className="text-base text-zinc-100 mb-2">{book.description}</Text>
          </View>
          <View className="mb-2">
            <Text className="text-xs text-zinc-400 mb-1">CATEGORÍAS</Text>
            <Text className="text-base text-pink-300 mb-2">{book.categories.join(", ")}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botones fijos abajo */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around bg-zinc-950 border-t border-zinc-800 p-4">
        <Pressable className="flex-1 mr-2 bg-[#232946] border-2 border-[#FFD700] rounded-xl py-3 items-center" style={{ elevation: 4 }}>
          <Text className="text-[#FFD700] font-bold">Añadir a la lista de deseos</Text>
        </Pressable>
        <Pressable className="flex-1 ml-2 bg-[#FFD700] border-2 border-[#FFD700] rounded-xl py-3 items-center" style={{ elevation: 4 }}>
          <Text className="text-[#232946] font-bold">Añadir a la estantería</Text>
        </Pressable>
      </View>
    </View>
  );
}