import { Book } from '../../mocks/bookshelfData'

// Hook para lógica de filtrado de libros por sección
export function useBooksSection(books: Book[]) {
  function getBooksByStatus(status: string) {
    return books.filter(book => book.status === status)
  }

  function getFavoriteBooks() {
    return books.filter(book => book.isFavorite)
  }

  return {
    getBooksByStatus,
    getFavoriteBooks,
  }
}
