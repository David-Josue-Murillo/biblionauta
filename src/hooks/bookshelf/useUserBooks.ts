import { useCallback, useEffect, useState } from 'react'
import { Book, userBooks as initialBooks } from '../../mocks/bookshelfData'
import { loadUserBooks, saveUserBooks } from '../../utils/userBooksStorage'

export function useUserBooksState() {
  const [books, setBooks] = useState<Book[]>(initialBooks)

  // Cargar libros desde almacenamiento al iniciar
  useEffect(() => {
    loadUserBooks().then(stored => {
      if (stored) setBooks(stored)
    })
  }, [])

  // Guardar libros cada vez que cambian
  useEffect(() => {
    saveUserBooks(books)
  }, [books])

  const toggleFavorite = useCallback((bookId: string) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book,
      ),
    )
  }, [])

  const addBook = useCallback((book: Book) => {
    setBooks(prev => {
      if (prev.some(b => b.id === book.id)) return prev
      return [...prev, book]
    })
  }, [])

  return {
    books,
    toggleFavorite,
    addBook,
  }
}
