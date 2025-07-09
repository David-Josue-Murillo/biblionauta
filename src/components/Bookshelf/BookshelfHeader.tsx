import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function BookshelfHeader({ books }) {
	return (
		<View className="mx-4 mt-8 mb-4">
			<View className="flex-row items-center justify-between">
				<View>
					<Text className="text-2xl font-bold text-white">📚 Mi Biblioteca</Text>
					<Text className="text-zinc-400 text-sm">
						{books.length} libros en tu colección
					</Text>
				</View>
				<Pressable
					className="bg-amber-500 px-4 py-2 rounded-xl"
					accessible
					accessibilityLabel="Agregar libro"
					accessibilityHint="Toca para buscar y agregar un nuevo libro"
					style={({ pressed }) => [
						{ backgroundColor: pressed ? '#d97706' : COLORS.accent.primary }
					]}
				>
					<Text className="text-white font-semibold">+ Agregar</Text>
				</Pressable>
			</View>
		</View>
	)
}