import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Link } from 'expo-router';

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
						<Pressable>
							<View
								className='mr-4 w-56 rounded-2xl shadow-lg p-3 flex-col items-center'
								style={{ elevation: 6 }}
							>
								<Image
									source={{ uri: image }}
									className='w-32 h-44 rounded-xl mb-2'
									resizeMode='cover'
									accessibilityLabel={`Portada de ${title}`}
								/>
								<Text className='text-base font-bold text-white text-center' numberOfLines={2}>{title}</Text>
								{authors && (
									<Text className='text-xs text-zinc-300 text-center mb-1' numberOfLines={1}>{authors.join(', ')}</Text>
								)}
								{description && (
									<Text className='text-xs text-zinc-400 text-center' numberOfLines={2}>{description}</Text>
								)}
							</View>
						</Pressable>
					</Link>
				))}
			</ScrollView>
		</View>
	)
}
