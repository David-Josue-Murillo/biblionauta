import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function WithoutBooks({books}) {
	const bookLength = books.length === 0 && (
			<View className="mx-4 mt-8 items-center">
				<Text className="text-6xl mb-4">📚</Text>
				<Text className="text-white text-lg font-semibold mb-2">
					Tu biblioteca está vacía
				</Text>
				<Text className="text-zinc-400 text-center mb-6">
					Comienza agregando libros a tu colección personal.
					Busca tus títulos favoritos y organízalos como prefieras.
				</Text>
				<Pressable
					className="bg-amber-500 px-6 py-3 rounded-xl"
					style={({ pressed }) => [
						{ backgroundColor: pressed ? '#d97706' : COLORS.accent.primary }
					]}
				>
					<Text className="text-white font-semibold">Buscar libros</Text>
				</Pressable>
			</View>
		)
	return bookLength;
}