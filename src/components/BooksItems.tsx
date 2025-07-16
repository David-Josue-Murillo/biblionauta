import { Pressable } from 'react-native'
import { Link } from 'expo-router'
import { BooksItemsProps, BookItem } from '../types/book'
import { generateUniqueKey } from '../utils/bookGridHelpers'
import { BookCard } from './ui/BookCard'
import { BooksGrid } from './ui/BooksGrid'

export default function BooksItems({
  books,
  startIndex = 0,
  showDetails = false,
}: BooksItemsProps) {
  const booksToRender = books.slice(startIndex)

  return (
    <BooksGrid>
      {booksToRender.map((book: BookItem, index: number) => {
        const uniqueKey = generateUniqueKey(book.id, index, startIndex)
        return (
          <Link key={uniqueKey} href={`/book/${book.id}`} asChild>
            <Pressable
              key={uniqueKey}
              style={{ marginBottom: 24, width: '32%', alignItems: 'center' }}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`Ver detalles de ${book.title}`}
            >
              <BookCard book={book} showDetails={showDetails} style={{ width: '100%' }} />
            </Pressable>
          </Link>
        )
      })}
    </BooksGrid>
  )
}
