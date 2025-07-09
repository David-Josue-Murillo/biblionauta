import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'

export default function BooksItems({ books, startIndex = 0, highlighted = false, showDetails = false }) {
	const booksToRender = books.slice(startIndex)

	const generateUniqueKey = (id, index) => {
		return `${id}-${startIndex + index}`
	}

	return (
		<View className="flex-row flex-wrap justify-between w-full">
			{booksToRender.map(({ id, title, image, authors, categories }, index) => {
				const uniqueKey = generateUniqueKey(id, index)
				return (
					<Link key={uniqueKey} href={`/book/${id}`} asChild>
						<Pressable
							key={uniqueKey}
							className="w-[32%] mb-6 items-center"
							accessible
							accessibilityLabel={`Libro: ${title}`}
							style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }] }]}
						>
							<View style={highlighted ? styles.bookCard : null} className="rounded-xl overflow-hidden">
								<LinearGradient
									colors={["#232526", "#414345"]}
									className="w-28 h-44 justify-end"
									style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1, opacity: 0.25 }}
									pointerEvents="none"
								/>

								<Image
									source={{ uri: image }}
									className="w-28 h-44 rounded-xl"
									accessibilityLabel={`Portada de ${title}`}
									resizeMode="cover"
									style={{ zIndex: 2 }}
								/>
							</View>
							<Text
								className="text-xs font-bold text-amber-300 text-center mt-2"
								numberOfLines={2}
								accessibilityRole="header"
								style={{ textShadowColor: '#000', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }}
							>
								{title}
							</Text>
							{/* Mostrar detalles solo si showDetails es true */}
							{showDetails && authors && (
								<Text style={{ fontSize: 10, color: "#d1d5db", textAlign: "center" }} numberOfLines={1}>
									{Array.isArray(authors) ? authors.join(", ") : authors}
								</Text>
							)}
							{showDetails && categories && categories.length > 0 && (
								<Text style={{ fontSize: 10, color: "#a1a1aa", textAlign: "center", fontStyle: "italic" }} numberOfLines={1}>
									{categories.join(", ")}
								</Text>
							)}
						</Pressable>
					</Link>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	bookCard: {
		backgroundColor: "#fff",
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "#4A90E2",
		marginBottom: 8,
		padding: 6,
		shadowColor: "#4A90E2",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.5,
		shadowRadius: 50,
		elevation: 8,
		alignItems: 'center',
	},
});