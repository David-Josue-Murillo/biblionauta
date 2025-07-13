import { useState } from 'react'
import { useUserBooks } from '../contexts/UserBooksContext'

interface Book {
  id: string
  title: string
  authors?: string[]
  categories?: string[]
  rating?: number
  isFavorite?: boolean
}

export function useBookActions(book: Book | null) {
  const { books, toggleFavorite, addBook } = useUserBooks()
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)
  
  // Busca si el libro es favorito en el contexto
  const favoriteBook = books.find(b => b.id === book?.id)
  const isFavorite = favoriteBook?.isFavorite ?? false

  const handleAddToWishlist = () => {
    if (!book) return
    
    setIsTogglingFavorite(true)
    
    if (!favoriteBook) {
      // Si el libro no está en la biblioteca, lo agregamos como favorito
      addBook({
        ...book,
        isFavorite: true,
        totalPages: 0,
        status: 'NOT_STARTED',
        genre: 'FICTION', // valor por defecto válido
        addedDate: new Date().toISOString(),
      } as any)
    } else {
      toggleFavorite(favoriteBook.id)
    }
    
    // Breve feedback visual
    setTimeout(() => setIsTogglingFavorite(false), 350)
  }

  const handleAddToShelf = () => {
    if (!book) return
    console.log('Añadir a estantería:', book.title)
    // Aquí iría la lógica para agregar a estantería
  }

  return {
    isFavorite,
    isTogglingFavorite,
    handleAddToWishlist,
    handleAddToShelf,
  }
} 