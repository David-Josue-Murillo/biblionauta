import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBooks } from "../../src/hooks/useBooks";
import Books from "../../src/components/Books";
import BooksItems from '../../src/components/BooksItems';
import { colors } from "../../src/constants/theme";

const filterOptions = ["Todos", "Título", "Autor", "Género"];

export default function SearchScreen() {
  const { books } = useBooks();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  // Función de filtrado por campo, ahora incluye género
  const filteredBooks = books.filter((book) => {
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
          backgroundColor: colors.card,
          borderRadius: 24,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Ionicons name="search" size={22} color="#aaa" />
        <TextInput
          placeholder="Buscar por título, autor o género"
          placeholderTextColor="#aaa"
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 10,
        }}
      >
        {filterOptions.map((option) => (
          <Pressable
            key={option}
            onPress={() => setSelectedFilter(option)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor:
                selectedFilter === option ? colors.primary : colors.card,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color:
                  selectedFilter === option ? colors.background : colors.text,
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
        {filteredBooks.length > 0 ? (
          <BooksItems books={filteredBooks} />
        ) : (
          <Text style={{ color: colors.textSecondary, textAlign: "center", marginTop: 32 }}>
            No se encontraron resultados.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}