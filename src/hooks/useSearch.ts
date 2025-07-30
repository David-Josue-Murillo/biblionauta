import { useMemo, useState } from 'react'
import { googleBooksApi } from '../api/googleBooksApi'

interface GoogleBook {
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

export function useSearch() {
  const [search, setSearch] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('Todos')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [books, setBooks] = useState<GoogleBook[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!search.trim()) return
    setLoading(true)
    setError(null)
    try {
      const response = await googleBooksApi.get(
        `volumes?q=${encodeURIComponent(search)}&maxResults=20`
      )
      const items = response.data.items || []
      const mappedBooks: GoogleBook[] = items.map((book: any) => ({
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle || '',
        authors: book.volumeInfo.authors || ['Autor desconocido'],
        description: book.volumeInfo.description || '',
        categories: book.volumeInfo.categories || [],
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        publishedDate: book.volumeInfo.publishedDate || '',
        rating: book.volumeInfo.averageRating || 0,
        ratingsCount: book.volumeInfo.ratingsCount || 0,
        language: book.volumeInfo.language || 'N/A',
      }))
      setBooks(mappedBooks)
    } catch {
      setError('No se pudieron cargar los libros')
    } finally {
      setLoading(false)
    }
  }

  // Obtener categorías únicas normalizadas
  const uniqueCategories = useMemo(() => {
    const categoriesMap = new Map<string, string>()
    books.forEach(book => {
      book.categories?.forEach(cat => {
        const normalized = cat.trim().toLowerCase()
        if (!categoriesMap.has(normalized)) {
          categoriesMap.set(normalized, cat.trim())
        }
      })
    })
    return Array.from(categoriesMap.values()).sort((a, b) => a.localeCompare(b))
  }, [books])

  // Filtrar libros según criterios
  const filteredBooks = useMemo(() => {
    const text = search.trim().toLowerCase()
    const selectedCategoryNorm = selectedCategory
      ? selectedCategory.trim().toLowerCase()
      : null
    return books.filter(book => {
      const title = book.title?.toLowerCase() || ''
      const authors = (book.authors?.join(', ') || '').toLowerCase()
      const categories = (book.categories || []).map(cat => cat.trim())
      const categoriesNorm = categories.map(cat => cat.toLowerCase())
      let matchesFilter = false

      if (selectedFilter === 'Todos') {
        matchesFilter =
          title.includes(text) ||
          authors.includes(text) ||
          categoriesNorm.some(cat => cat.includes(text))
      } else if (selectedFilter === 'Título') {
        matchesFilter = title.includes(text)
      } else if (selectedFilter === 'Autor') {
        matchesFilter = authors.includes(text)
      } else if (selectedFilter === 'Género') {
        matchesFilter = categoriesNorm.some(cat => cat.includes(text))
      } else if (selectedFilter === 'Categoría') {
        if (selectedCategoryNorm) {
          matchesFilter = categoriesNorm.includes(selectedCategoryNorm)
          if (text) {
            matchesFilter =
              matchesFilter && categoriesNorm.some(cat => cat.includes(text))
          }
        } else {
          if (text) {
            matchesFilter = categoriesNorm.some(cat => cat.includes(text))
          } else {
            matchesFilter = categories.length > 0
          }
        }
      }
      return matchesFilter
    })
  }, [books, search, selectedFilter, selectedCategory])

  return {
    // Estado
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    selectedCategory,
    setSelectedCategory,
    loading,
    error,
    uniqueCategories,
    filteredBooks,
    // Acciones
    handleSearch,
  }
} 