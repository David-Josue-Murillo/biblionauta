import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, ActivityIndicator, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBooks } from "../../src/hooks/useBooks";
import { colors } from "../../src/constants/theme";

const filterOptions = ["Todos", "Título", "Autor", "Género"];

export default function SearchScreen() {
  const { books, loading, error } = useBooks();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  // Eliminar duplicados por id
  const uniqueBooks = [];
  const seenIds = new Set();
  for (const book of books) {
    if (!seenIds.has(book.id)) {
      uniqueBooks.push(book);
      seenIds.add(book.id);
    }
  }

  // Filtrar según búsqueda y filtro seleccionado
  const filteredBooks = uniqueBooks.filter((book) => {
    const text = search.toLowerCase();
    const title = book.title?.toLowerCase() || "";
    const authors = (book.authors?.join(", ") || "").toLowerCase();
    const categories = (book.categories?.join(", ") || "").toLowerCase();

    if (!text) return true;

    if (selectedFilter === "Todos") {
      return (
        title.includes(text) ||
        authors.includes(text) ||
        categories.includes(text)
      );
    } else if (selectedFilter === "Título") {
      return title.includes(text);
    } else if (selectedFilter === "Autor") {
      return authors.includes(text);
    } else if (selectedFilter === "Género") {
      return categories.includes(text);
    }
    return false;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Barra de búsqueda */}
      <View
        style={{
          margin: 16,
          backgroundColor: colors.card || "#3a3327",
          borderRadius: 24,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: "#a89c7c"
        }}
      >
        <Ionicons name="search" size={22} color="#a89c7c" />
        <TextInput
          placeholder="Título, autor, género, tema"
          placeholderTextColor="#a89c7c"
          style={{
            flex: 1,
            color: "#fff",
            fontSize: 16,
            marginLeft: 8,
            height: 48,
          }}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filtros */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
        {filterOptions.map((option) => (
          <Pressable
            key={option}
            onPress={() => setSelectedFilter(option)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: selectedFilter === option ? "#FFD600" : (colors.card || "#3a3327"),
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: selectedFilter === option ? "#23201a" : "#fff",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Resultados */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        {loading ? (
          <ActivityIndicator color="#FFD600" size="large" style={{ marginTop: 40 }} />
        ) : error ? (
          <Text style={{ color: "#fff", textAlign: "center", marginTop: 32 }}>
            Error al cargar los libros.
          </Text>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <View
              key={book.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.card || "#3a3327",
                borderRadius: 16,
                marginBottom: 14,
                padding: 10,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: "#5a5040"
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
            </View>
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