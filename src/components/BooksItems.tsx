import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

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
							accessibilityRole="button"
							accessibilityLabel={`Ver detalles de ${title}`}
							style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }], minWidth: 120, minHeight: 240, padding: 4 }]}
						>
							<View style={styles.cardRecentLike} className="rounded-lg overflow-hidden border">
								<Image
									source={ image ? { uri: image } : require('../../assets/img/default-cover.webp') }
									className="w-full h-40 rounded-lg mb-2"
									accessibilityLabel={`Portada de ${title}`}	
									resizeMode="cover"
								/>
								<Text
									className="text-white font-semibold text-sm mb-1"
									numberOfLines={2}
									accessibilityRole="header"
								>
									{title}
								</Text>
								{authors && (
									<Text className="text-zinc-400 text-xs mb-1" numberOfLines={1}>
										{Array.isArray(authors) ? authors.join(", ") : authors}
									</Text>
								)}
								{showDetails && categories && categories.length > 0 && (
									<Text className="text-zinc-500 text-xs mb-1" numberOfLines={1}>
										{categories.join(", ")}
									</Text>
								)}
							</View>
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
	bookCardUnified: {
		backgroundColor: "#18181b",
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "#00fff7",
		marginBottom: 8,
		padding: 6,
		shadowColor: "#00fff7",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.4,
		shadowRadius: 16,
		elevation: 8,
		alignItems: 'center',
	},
	cardRecentLike: {
		backgroundColor: '#18181b',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#232946',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.18,
		shadowRadius: 6,
		elevation: 4,
		padding: 8,
		width: '100%',
		alignItems: 'flex-start',
	},
});