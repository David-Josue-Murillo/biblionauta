import { View, Text, Image } from 'react-native'

export default function BooksItems({ books }) {
	return (
		<View className="w-full space-y-4 mt-4">
			{books.map(({ id, title, authors, description, categories, imageLinks, publishedDate }) => (
				<View
					key={id}
					className="flex-row bg-zinc-700 rounded-lg p-4 shadow-md items-center space-x-4"
					accessible
					accessibilityLabel={`Libro: ${title}, Autor: ${authors?.join(', ') ?? 'Desconocido'}`}
				>
					{imageLinks?.thumbnail && (
						<Image
							source={{ uri: imageLinks.thumbnail }}
							className="w-20 h-28 rounded-md bg-zinc-600"
							accessibilityLabel={`Portada de ${title}`}
						/>
					)}
					<View className="flex-1">
						<Text className="text-lg font-bold text-white mb-1" accessibilityRole="header">{title}</Text>
						{authors && (
							<Text className="text-sm text-zinc-300 mb-1">{authors.join(', ')}</Text>
						)}
						{publishedDate && (
							<Text className="text-xs text-zinc-400 mb-1">Publicado: {publishedDate}</Text>
						)}
						{categories && (
							<Text className="text-xs text-amber-400 mb-1">{categories.join(', ')}</Text>
						)}
						{description && (
							<Text className="text-xs text-zinc-200" numberOfLines={3} ellipsizeMode="tail">{description}</Text>
						)}
					</View>
				</View>
			))}
		</View>
	)
}
