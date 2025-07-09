import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Link } from 'expo-router';
import { COLORS } from "../constants/colors";

export default function CarourselBook({ books }) {
	// Selecciona los primeros 8 libros como destacados
	const featuredBooks = books?.slice(0, 8) || [];
	return (
		<View className='my-4'>
			<Text className='text-2xl font-bold text-white pl-4 mb-1'>Recomendado para ti</Text>
			<Text className='text-base text-zinc-300 pl-4 mb-2'>Creemos que estos libros pueden gustarte</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				className='pl-4'
			>
				{featuredBooks.map(({id, image, title, authors, description}) => (
					<Link key={id} href={`/book/${id}`} asChild>
						<Pressable
							accessibilityRole="button"
							accessibilityLabel={`Ver detalles de ${title}`}
							style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }], minWidth: 220, minHeight: 240 }]}
						>
							<View
								className='flex mr-4 w-56 h-80 rounded-2xl shadow-lg p-3 flex-col items-center border-2'
								style={{ elevation: 6, borderColor: COLORS.border.secondary, backgroundColor: '#18181b', shadowColor: '#00fff7', shadowOpacity: 0.4 }}
							>
								<Image
									source={{ uri: image }}
									className='w-32 h-44 rounded-xl mb-2'
									resizeMode='cover'
									accessibilityLabel={`Portada de ${title}`}
								/>
								<Text className='text-base font-bold text-white text-center' numberOfLines={2} style={{ fontSize: 18, marginBottom: 2 }}>{title}</Text>
								{authors && (
									<Text className='text-xs text-zinc-300 text-center mb-1' numberOfLines={1} style={{ fontSize: 14 }}>{authors.join(', ')}</Text>
								)}
								{description && (
									<Text className='text-xs text-zinc-400 text-center' numberOfLines={2} style={{ fontSize: 13 }}>{description}</Text>
								)}
							</View>
						</Pressable>
					</Link>
				))}
			</ScrollView>
		</View>
	)
}
