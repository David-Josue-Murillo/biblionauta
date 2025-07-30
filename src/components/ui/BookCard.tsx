import { Image, Text, View, ViewProps } from 'react-native'
import { formatAuthors, formatCategories } from '../../utils/bookGridHelpers'
import { BookItem } from '../../types/book'

interface BookCardProps extends ViewProps {
  book: BookItem
  showDetails?: boolean
}

export function BookCard({ book, showDetails = false, style, ...props }: BookCardProps) {
  return (
    <View
      style={[
        {
          alignItems: 'flex-start',
          backgroundColor: '#18181b',
          borderColor: '#232946',
          borderRadius: 12,
          borderWidth: 1,
          elevation: 4,
          padding: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.18,
          shadowRadius: 6,
          width: '100%',
        },
        style,
      ]}
      {...props}
    >
      <Image
        source={
          book.image ? { uri: book.image } : require('../../../assets/img/default-cover.webp')
        }
        style={{ marginBottom: 8, height: 160, width: '100%', borderRadius: 12 }}
        accessibilityLabel={`Portada de ${book.title}`}
        resizeMode="cover"
      />
      <Text
        style={{ marginBottom: 4, fontSize: 14, fontWeight: 'bold', color: '#fff' }}
        numberOfLines={2}
        accessibilityRole="header"
      >
        {book.title}
      </Text>
      {book.authors && (
        <Text style={{ marginBottom: 4, fontSize: 12, color: '#a1a1aa' }} numberOfLines={1}>
          {formatAuthors(book.authors)}
        </Text>
      )}
      {showDetails && book.categories && book.categories.length > 0 && (
        <Text style={{ marginBottom: 4, fontSize: 12, color: '#71717a' }} numberOfLines={1}>
          {formatCategories(book.categories)}
        </Text>
      )}
    </View>
  )
}
