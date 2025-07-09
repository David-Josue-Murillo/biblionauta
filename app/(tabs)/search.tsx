import '../../global.css'
import { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Pressable, ActivityIndicator, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBooks } from "../../src/hooks/useBooks";
import { colors } from "../../src/constants/theme";
const filterOptions = ["Todos", "Título", "Autor", "Género", "Categoría"];

export default function SearchScreen() {
  const { books, loading, error } = useBooks();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    if (books && books.length > 0) {
      const categories = new Set<string>();
      books.forEach(book => {
        book.categories?.forEach(cat => categories.add(cat));
      });
      const newCategories = Array.from(categories);
      // Solo actualiza si hay cambios reales
      if (JSON.stringify(newCategories) !== JSON.stringify(uniqueCategories)) {
        setUniqueCategories(newCategories);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  // Filtrar según búsqueda, filtro seleccionado y categoría
  const filteredBooks = books.filter((book) => {
    const text = search.toLowerCase();
    const title = book.title?.toLowerCase() || "";
    const authors = (book.authors?.join(", ") || "").toLowerCase();
  
    let matchesFilter = false;

    if (selectedFilter === "Todos") {
      matchesFilter = title.includes(text) || authors.includes(text) || (book.categories?.some(cat => cat.toLowerCase().includes(text)) || false);
    } else if (selectedFilter === "Título") {
      matchesFilter = title.includes(text);
    } else if (selectedFilter === "Autor") {
      matchesFilter = authors.includes(text);
    } else if (selectedFilter === "Género") {
      matchesFilter = (book.categories?.some(cat => cat.toLowerCase().includes(text)) || false);
    } else if (selectedFilter === "Categoría") {
      if (selectedCategory) {
        matchesFilter = book.categories?.includes(selectedCategory) || false;
        if (text) {
          matchesFilter = matchesFilter && (book.categories?.some(cat => cat.toLowerCase().includes(text)) || false);
        }
      } else {
        if (text) {
          matchesFilter = (book.categories?.some(cat => cat.toLowerCase().includes(text)) || false);
        } else {
          matchesFilter = (book.categories && book.categories.length > 0) || false;
        }
      }
    }

    return matchesFilter;
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
            onPress={() => {
              setSelectedFilter(option);
              // Resetear categoría seleccionada si el filtro cambia a algo que no sea 'Categoría'
              if (option !== "Categoría") {
                setSelectedCategory(null);
              }
            }}
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

      {/* Chips de Categorías (solo si el filtro 'Categoría' está seleccionado) */}
      {selectedFilter === "Categoría" && uniqueCategories.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10, paddingHorizontal: 16 }}>
          {uniqueCategories.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                backgroundColor: selectedCategory === category ? "#FFD600" : (colors.card || "#3a3327"),
                borderRadius: 12,
                marginRight: 8,
                marginBottom: 6,
                height: 32, 
                minWidth: 80, 
                justifyContent: 'center', 
                alignItems: 'center', 
              }}
            >
              <Text
                style={{
                  color: selectedCategory === category ? "#23201a" : "#fff",
                  fontWeight: "bold",
                  fontSize: 14,
                  textAlign: 'center', 
                }}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* Resultados */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          alignItems: "flex-start",
          justifyContent: 'flex-start', // Asegura que el contenido se alinee arriba
        }}
        keyboardShouldPersistTaps="handled"
      >
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