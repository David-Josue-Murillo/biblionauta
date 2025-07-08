import { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Books from "../../src/components/Books"; 

// Ejemplo de lista de libros solo para prueba
const books = [
  { id: 1, title: "Cien años de soledad", author: "Gabriel García Márquez", image: "url_del_imagen" },
  { id: 2, title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", image: "url_del_imagen" },
  { id: 3, title: "1984", author: "George Orwell", image: "url_del_imagen" },

];

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  // Filtra los libros según el texto de búsqueda
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#23201a" }}>
      {/* Barra de búsqueda */}
      <View
        style={{
          margin: 16,
          backgroundColor: "#2d2921",
          borderRadius: 24,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Ionicons name="search" size={22} color="#aaa" />
        <TextInput
          placeholder="Título, autor, género, tema"
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

      {/* Componente de libros */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <Books books={filteredBooks} />
      </ScrollView>
    </View>
  );
}