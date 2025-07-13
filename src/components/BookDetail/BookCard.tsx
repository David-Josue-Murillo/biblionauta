import { View, Text } from 'react-native'
import { BookHeader } from './BookHeader'
import { StarRating } from './StarRating'
import { CategoryChips } from './CategoryChips'

interface Book {
  id: string
  title: string
  authors?: string[]
  categories?: string[]
  rating?: number
  image: string
  isFavorite?: boolean
}

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 32,
        marginBottom: 24,
        marginHorizontal: 18,
        backgroundColor: '#1F2937',
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#06B6D4',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.13,
        shadowRadius: 10,
        elevation: 6,
        padding: 12,
      }}
    >
      {/* Contenedor de la portada */}
      <View
        style={{
          marginRight: 16,
          width: 120,
          height: 180,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: '#1F2937',
        }}
      >
        <BookHeader
          book={book}
          style={{ width: '100%', height: '100%', borderRadius: 12 }}
          resizeMode="cover"
        />
      </View>

      {/* Información a la derecha de la portada */}
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: 4,
          }}
          numberOfLines={2}
        >
          {book.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#D1D5DB',
            marginBottom: 6,
          }}
          numberOfLines={1}
        >
          {book.authors?.join(', ')}
        </Text>

        {/* Rating */}
        <StarRating rating={book.rating || 4} />

        {/* Chips de categorías */}
        <CategoryChips categories={book.categories} />
      </View>
    </View>
  )
}
