import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { BiblionautaLogo } from "../../src/components/LogoApp";

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

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  // Aquí deberías hacer fetch real por id
  const [book, setBook] = useState(mockBook);

  // useEffect(() => { ...fetchBookById(id)... }, [id]);

  const navigate = useNavigation();

  const onGoHome = () => {
    navigate.goBack();
  }

  return (
    <View className="flex-1 bg-zinc-900">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Portada y título */}
        <View className="items-center mt-6 mb-2">
          <Image
            source={{ uri: book.image }}
            className="w-36 h-52 rounded-xl shadow-lg mb-4"
            style={{ borderWidth: 2, borderColor: "#00fff7" }}
          />
          <Text className="text-2xl font-extrabold text-white text-center mb-1">{book.title}</Text>
          <Text className="text-base text-zinc-300 text-center mb-1">{book.authors.join(", ")}</Text>
          <View className="flex-row items-center justify-center mb-2">
            {book.categories.map((cat) => (
              <Text key={cat} className="text-xs bg-pink-300/20 text-pink-300 px-2 py-1 rounded-full mx-1">{cat}</Text>
            ))}
          </View>
        </View>

        {/* Info principal */}
        <View className="mx-4 rounded-2xl p-4 mb-4" style={{ backgroundColor: "#232946", borderWidth: 1, borderColor: "#00fff7" }}>
          <Text className="text-xs text-zinc-400 mb-1">TÍTULO</Text>
          <Text className="text-base text-white mb-2">{book.title}</Text>
          <Text className="text-xs text-zinc-400 mb-1">SUBTÍTULO</Text>
          <Text className="text-base text-zinc-200 mb-2">{book.subtitle}</Text>
          <Text className="text-xs text-zinc-400 mb-1">AUTORES</Text>
          <Text className="text-base text-zinc-200 mb-2">{book.authors.join(", ")}</Text>
          <Text className="text-xs text-zinc-400 mb-1">IDIOMA</Text>
          <Text className="text-base text-zinc-200 mb-2">{book.language}</Text>
          <Text className="text-xs text-zinc-400 mb-1">DESCRIPCIÓN</Text>
          <Text className="text-base text-zinc-100 mb-2">{book.description}</Text>
        </View>

        <View className="flex flex-row mx-4 my-6 justify-between">
          <View>
            <Pressable onPress={() => onGoHome()} className="border px-4 py-2 border-yellow-400 rounded-lg">
              <Text className="text-white text-base">Volver atrás</Text>
            </Pressable>
          </View>

          <View>
            <Pressable className="border px-4 py-2 border-yellow-400 rounded-lg">
              <Text className="text-white text-base">Opciones</Text>
            </Pressable>
          </View>
        </View>

        <View className="flex flex-row w-full gap-x-6 h-2/6 mx-4 my-6">
          <View className="flex w-4/12 items-center justify-center border border-red-300 rounded-lg">
            <Image
              source={require("../../assets/logoBiblionauta.png")}
              className="w-full h-full"
              accessibilityLabel="Logo de Biblionauta"
            />
          </View>

          <View className="py-4 space-y-4">
            <Text className="text-white font-semibold text-2xl">El Hombre en busca del sentido</Text>
            <Text className="text-white/75 font-semibold text-lg">Viktor Frankl</Text>
            <Text className="text-white font-semibold text-lg">Calificaciion: <Text style={{ color: "#FFD700" }}>95</Text></Text>
            <Text className="text-white/75 w-32 text-center font-medium text-base px-4 py-2 border rounded-md border-teal-200">Psicologia</Text>
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