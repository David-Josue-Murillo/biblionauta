import '../../global.css'
import { useMemo, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { googleBooksApi } from '../../src/api/googleBooksApi'
import { colors } from '../../src/constants/theme'
const filterOptions = ['Todos', 'Título', 'Autor', 'Género', 'Categoría']

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

export default function SearchScreen() {
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
    } catch (e) {
      setError('No se pudieron cargar los libros')
    } finally {
      setLoading(false)
    }
  }

  // Obtener categorías únicas normalizadas (case-insensitive, sin espacios extra)
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
    // Ordenar alfabéticamente por display name
    return Array.from(categoriesMap.values()).sort((a, b) => a.localeCompare(b))
  }, [books])

  // Filtrar según búsqueda, filtro seleccionado y categoría (case-insensitive)
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
          // Coincidencia exacta de categoría (case-insensitive)
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Barra de búsqueda */}
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 16,
          marginBottom: 8,
          backgroundColor: colors.card,
          borderRadius: 24,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: '#a89c7c',
        }}
      >
        <Ionicons name="search" size={22} color="#a89c7c" />
        <TextInput
          placeholder="Título, autor, género, tema"
          placeholderTextColor="#a89c7c"
          style={{
            flex: 1,
            color: '#fff',
            fontSize: 16,
            marginLeft: 8,
            height: 48,
          }}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Pressable
          onPress={handleSearch}
          style={{
            marginLeft: 8,
            padding: 8,
            backgroundColor: '#FFD600',
            borderRadius: 16,
          }}
          accessibilityRole="button"
          accessibilityLabel="Buscar libros"
        >
          <Ionicons name="arrow-forward" size={20} color="#23201a" />
        </Pressable>
      </View>

      {/* Filtros */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 12,
          marginTop: 2,
        }}
      >
        {filterOptions.map(option => (
          <Pressable
            key={option}
            onPress={() => {
              setSelectedFilter(option)
              if (option !== 'Categoría') setSelectedCategory(null)
            }}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor:
                selectedFilter === option
                  ? '#FFD600'
                  : colors.card || '#3a3327',
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: selectedFilter === option ? '#23201a' : '#fff',
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Selector de categorías */}
      {selectedFilter === 'Categoría' && uniqueCategories.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingHorizontal: 8 }}
            contentContainerStyle={{ alignItems: 'center', paddingVertical: 2 }}
          >
            <Pressable
              onPress={() => setSelectedCategory(null)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                backgroundColor: !selectedCategory
                  ? '#FFD600'
                  : colors.card || '#3a3327',
                borderRadius: 12,
                marginRight: 8,
              }}
              accessibilityRole="button"
              accessibilityLabel="Todas las categorías"
            >
              <Text
                style={{
                  color: !selectedCategory ? '#23201a' : '#fff',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Todas
              </Text>
            </Pressable>
            {uniqueCategories.map(cat => {
              const isSelected =
                selectedCategory &&
                cat.trim().toLowerCase() ===
                  selectedCategory.trim().toLowerCase()
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    backgroundColor: isSelected
                      ? '#FFD600'
                      : colors.card || '#3a3327',
                    borderRadius: 12,
                    marginRight: 8,
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={`Categoría ${cat}`}
                >
                  <Text
                    style={{
                      color: isSelected ? '#23201a' : '#fff',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}
                  >
                    {cat}
                  </Text>
                </Pressable>
              )
            })}
          </ScrollView>
        </View>
      )}

      {/* Resultados */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          alignItems: 'flex-start',
          justifyContent: 'flex-start', // Asegura que el contenido se alinee arriba
        }}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          <ActivityIndicator
            color="#FFD600"
            size="large"
            style={{ marginTop: 40 }}
          />
        ) : error ? (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 32 }}>
            Error al cargar los libros.
          </Text>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book, idx) => (
            <View
              key={book.id}
              style={{
                width: '100%',
                backgroundColor: colors.card || '#23201a',
                borderRadius: 18,
                marginBottom: 18,
                flexDirection: 'row',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.13,
                shadowRadius: 8,
                elevation: 4,
                borderWidth: 1,
                borderColor: '#3a3327',
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: book.image }}
                style={{
                  width: 90,
                  height: 130,
                  borderTopLeftRadius: 18,
                  borderBottomLeftRadius: 18,
                  backgroundColor: '#444',
                }}
                resizeMode="cover"
              />
              <View style={{ flex: 1, padding: 12, justifyContent: 'center' }}>
                <Text
                  style={{
                    color: '#FFD600',
                    fontWeight: 'bold',
                    fontSize: 17,
                    marginBottom: 2,
                  }}
                  numberOfLines={2}
                >
                  {book.title}
                </Text>
                {book.authors && (
                  <Text
                    style={{ color: '#fff', fontSize: 13, marginBottom: 2 }}
                    numberOfLines={1}
                  >
                    {Array.isArray(book.authors)
                      ? book.authors.join(', ')
                      : book.authors}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}
                >
                  {/* Estrellas de rating */}
                  {[1, 2, 3, 4, 5].map(i => (
                    <Ionicons
                      key={i}
                      name={
                        i <= Math.round(book.rating) ? 'star' : 'star-outline'
                      }
                      size={15}
                      color="#FFD700"
                      style={{ marginRight: 1 }}
                    />
                  ))}
                  {book.ratingsCount > 0 && (
                    <Text
                      style={{ color: '#FFD700', fontSize: 12, marginLeft: 4 }}
                    >
                      ({book.ratingsCount})
                    </Text>
                  )}
                </View>
                {book.publishedDate && (
                  <Text
                    style={{ color: '#aaa', fontSize: 12, marginBottom: 2 }}
                  >
                    {book.publishedDate}
                  </Text>
                )}
                {book.description ? (
                  <Text
                    style={{ color: '#ccc', fontSize: 12 }}
                    numberOfLines={3}
                  >
                    {book.description}
                  </Text>
                ) : null}
              </View>
            </View>
          ))
        ) : (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 32 }}>
            No se encontraron resultados.
          </Text>
        )}
      </ScrollView>
    </View>
  )
}
