import { ScrollView, View } from 'react-native'
import { Book } from '../../mocks/bookshelfData'
import { BookCard } from '../Bookshelf/BookCard'

interface BooksHorizontalListProps {
  books: Book[]
  showProgress?: boolean
  showStatus?: boolean
}

// Lista horizontal de tarjetas de libros
export function BooksHorizontalList({ books, showProgress = true, showStatus = true }: BooksHorizontalListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 32 }}
    >
      {books.map(book => (
        <View key={book.id} className="mr-4" style={{ width: 160 }}>
          <BookCard
            book={book}
            showProgress={showProgress}
            showStatus={showStatus}
          />
        </View>
      ))}
    </ScrollView>
  )
}
