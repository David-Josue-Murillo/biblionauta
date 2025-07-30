import { useEffect, useState } from 'react'
import { googleBooksApi } from '../api/googleBooksApi'

export interface TrendingBook {
  id: string
  title: string
  subtitle?: string
  authors: string[]
  description: string
  categories: string[]
  image: string
  publishedDate: string
  rating: number
  ratingsCount: number
  language: string
}

export function useTrendingBooks() {
  const [books, setBooks] = useState<TrendingBook[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (fetched) return
    setLoading(true)
    googleBooksApi
      .get('volumes?q=top+trending&maxResults=20')
      .then(res => {
        const items = res.data.items || []
        const mappedBooks: TrendingBook[] = items.map((book: any) => ({
          id: book.id,
          title: book.title,
          subtitle: book.subtitle || '',
          authors: book.authors || ['Autor desconocido'],
          description: book.description || '',
          categories: book.categories || [],
          image: book.image || '',
          publishedDate: book.publishedDate || '',
          rating: book.rating || 0,
          ratingsCount: book.ratingsCount || 0,
          language: book.language || 'N/A',
        }))
        setBooks(mappedBooks)
        // Extraer categorías únicas
        const cats = new Set<string>()
        mappedBooks.forEach(b => b.categories?.forEach(cat => cats.add(cat)))
        setCategories(Array.from(cats))
        setFetched(true)
      })
      .catch(() => setError('No se pudieron cargar los libros populares'))
      .finally(() => setLoading(false))
  }, [fetched])

  return { books, categories, loading, error }
}
