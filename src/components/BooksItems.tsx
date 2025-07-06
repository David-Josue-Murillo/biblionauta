import { View, Text, Image, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'

export default function BooksItems({ books, startIndex = 0 }) {
	const booksToRender = books.slice(startIndex)
	
	const generateUniqueKey = (id, index) => {
		return `${id}-${startIndex + index}`
	}
	
	return (
		<View className="flex-row flex-wrap justify-between w-full">
			{booksToRender.map(({ id, title, image }, index) => {
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
							<View className="rounded-xl overflow-hidden shadow-lg border border-zinc-700">
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
						</Pressable>
					</Link>
				)
			})}
		</View>
	)
}
