import '../../global.css';
import { colors } from "../../src/constants/theme";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, ActivityIndicator, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBooks } from "../../src/hooks/useBooks";
import { useRouter } from 'expo-router'; 

export default function SearchScreen() {
  const { books, loading, error } = useBooks();
  const [search, setSearch] = useState("");
  const router = useRouter(); 

  // Solo se filtra por título o autor
  const filteredBooks = books.filter((book) => {
    const text = search.toLowerCase();
    const title = book.title?.toLowerCase() || "";
    const authors = (book.authors?.join(", ") || "").toLowerCase();

    return title.includes(text) || authors.includes(text);
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Barra de búsqueda */}
      <View
        style={{
          margin: 16,
          backgroundColor: "#232946",
          borderRadius: 24,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: "#00fff7"
        }}
      >
        <Ionicons name="search" size={22} color="#a89c7c" />
        <TextInput
          placeholder="Buscar por título o autor"
          placeholderTextColor="#a89c7c"
          style={{
            flex: 1,
            color: "#ffffff", 
            fontSize: 16,
            marginLeft: 8,
            height: 48,
            paddingHorizontal: 4, 
          }}
          value={search}
          onChangeText={setSearch}
        />

      </View>

      {/* Resultados */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 32 }}>

        {loading ? (
          <ActivityIndicator color="#FFD600" size="large" style={{ marginTop: 40 }} />
        ) : error ? (
          <Text style={{ color: "#fff", textAlign: "center", marginTop: 32 }}>
            Error al cargar los libros.
          </Text>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Pressable
              key={book.id}
              onPress={() => router.push(`/book/${book.id}`)}  // navegar a su respectiva información
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 16,
                marginBottom: 14,
                padding: 10,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: "#00fff7"
              }}
            >
              <Image
                source={{ uri: book.image }}
                style={{ width: 70, height: 100, borderRadius: 8, marginRight: 16, backgroundColor: "#444" }}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#FFD600", fontWeight: "bold", fontSize: 16, marginBottom: 2 }}>
                  {book.title}
                </Text>
                {book.authors && (
                  <Text style={{ color: "#fff", fontSize: 13, marginBottom: 2 }}>
                    {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}
                  </Text>
                )}
                {book.categories && book.categories.length > 0 && (
                  <Text style={{ color: "#aaa", fontSize: 12, marginBottom: 2 }}>
                    {book.categories.join(", ")}
                  </Text>
                )}
                {book.description ? (
                  <Text style={{ color: "#ccc", fontSize: 12 }} numberOfLines={3}>
                    {book.description}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={{ color: "#fff", textAlign: "center", marginTop: 32 }}>
            No se encontraron resultados.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
