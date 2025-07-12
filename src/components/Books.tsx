import BooksItems from './BooksItems'
import BookNotFound from './BookNotFound'

export default function Books({ books }) {
  const hasBooks = books.length > 0

  return hasBooks ? (
    <BooksItems books={books} startIndex={8} />
  ) : (
    <BookNotFound />
  )
}
