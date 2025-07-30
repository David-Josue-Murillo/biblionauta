import { useMemo } from 'react'
import { useBookDetails } from './useBookDetails'
import { useBookActions } from './useBookActions'
import type { BookDetailState, BookDetailActions } from '../types/BookDetailTypes'
import type { Book as BookshelfBook } from '../mocks/bookshelfData'

// Función para mapear el tipo Book de la API al tipo Book del bookshelf
const mapApiBookToBookshelfBook = (apiBook: any): BookshelfBook | null => {
  if (!apiBook) return null
  
  return {
    id: apiBook.id,
    title: apiBook.title,
    subtitle: apiBook.subtitle || '',
    authors: apiBook.authors || [],
    image: apiBook.image,
    rating: apiBook.rating || 0,
    totalPages: 0, // Valor por defecto, se puede obtener de pageCount si está disponible
    status: 'WANT_TO_READ',
    genre: 'FICTION', // Valor por defecto
    addedDate: new Date().toISOString().split('T')[0],
    isFavorite: false,
    categories: apiBook.categories || [],
    language: apiBook.language || 'es',
    description: apiBook.description || '',
  }
}

export const useBookDetailState = (bookId: string) => {
  const { book: apiBook, loading, error } = useBookDetails(bookId)
  const detailedBook = useMemo(() => mapApiBookToBookshelfBook(apiBook), [apiBook])
  const { isFavorite, isTogglingFavorite, handleAddToWishlist, handleAddToShelf } =
    useBookActions(detailedBook)

  const state: BookDetailState = useMemo(() => ({
    book: detailedBook,
    loading,
    error,
    isFavorite,
    isTogglingFavorite,
  }), [detailedBook, loading, error, isFavorite, isTogglingFavorite])

  const actions: BookDetailActions = useMemo(() => ({
    handleAddToWishlist,
    handleAddToShelf,
    handleGoBack: () => {}, // Will be overridden by navigation hook
  }), [handleAddToWishlist, handleAddToShelf])

  return { state, actions }
}