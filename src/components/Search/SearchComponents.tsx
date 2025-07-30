import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useCallback } from 'react'
import { Ionicons } from '@expo/vector-icons'

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

interface SearchBarProps {
  search: string
  setSearch: (text: string) => void
  handleSearch: () => void
}

export function SearchBar({ search, setSearch, handleSearch }: SearchBarProps) {
  return (
    <View className="bg-card mx-4 mb-2 mt-4 flex-row items-center rounded-3xl border border-amber-700 px-4">
      <Ionicons name="search" size={22} color="#a89c7c" />
      <TextInput
        placeholder="Título, autor, género, tema"
        placeholderTextColor="#a89c7c"
        className="ml-2 h-12 flex-1 text-base text-white"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <Pressable
        onPress={handleSearch}
        className="ml-2 rounded-2xl bg-yellow-400 p-2"
        accessibilityRole="button"
        accessibilityLabel="Buscar libros"
      >
        <Ionicons name="arrow-forward" size={20} color="#23201a" />
      </Pressable>
    </View>
  )
}

interface FilterOptionsProps {
  filterOptions: string[]
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
  setSelectedCategory: (category: string | null) => void
}

export function FilterOptions({
  filterOptions,
  selectedFilter,
  setSelectedFilter,
  setSelectedCategory,
}: FilterOptionsProps) {
  const handleFilterPress = useCallback(
    (option: string) => {
      setSelectedFilter(option)
      if (option !== 'Categoría') setSelectedCategory(null)
    },
    [setSelectedFilter, setSelectedCategory]
  )

  return (
    <View className="mb-3 mt-0.5 flex-row justify-around">
      {filterOptions.map(option => (
        <Pressable
          key={option}
          onPress={() => handleFilterPress(option)}
          className={`rounded-xl px-3 py-1.5 ${
            selectedFilter === option ? 'bg-yellow-400' : 'bg-card'
          }`}
        >
          <Text
            className={`text-sm font-bold ${
              selectedFilter === option ? 'text-gray-900' : 'text-white'
            }`}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

interface CategorySelectorProps {
  selectedFilter: string
  uniqueCategories: string[]
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

export function CategorySelector({
  selectedFilter,
  uniqueCategories,
  selectedCategory,
  setSelectedCategory,
}: CategorySelectorProps) {
  const handleCategoryPress = useCallback(
    (category: string | null) => {
      setSelectedCategory(category)
    },
    [setSelectedCategory]
  )

  if (selectedFilter !== 'Categoría' || uniqueCategories.length === 0) return null

  return (
    <View className="mb-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-2"
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 2 }}
      >
        <Pressable
          onPress={() => handleCategoryPress(null)}
          className={`mr-2 rounded-xl px-3.5 py-1.5 ${
            !selectedCategory ? 'bg-yellow-400' : 'bg-card'
          }`}
          accessibilityRole="button"
          accessibilityLabel="Todas las categorías"
        >
          <Text
            className={`text-sm font-bold ${!selectedCategory ? 'text-gray-900' : 'text-white'}`}
          >
            Todas
          </Text>
        </Pressable>
        {uniqueCategories.map(cat => {
          const isSelected =
            selectedCategory && cat.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
          return (
            <Pressable
              key={cat}
              onPress={() => handleCategoryPress(cat)}
              className={`mr-2 rounded-xl px-3.5 py-1.5 ${
                isSelected ? 'bg-yellow-400' : 'bg-card'
              }`}
              accessibilityRole="button"
              accessibilityLabel={`Categoría ${cat}`}
            >
              <Text className={`text-sm font-bold ${isSelected ? 'text-gray-900' : 'text-white'}`}>
                {cat}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

interface BookCardProps {
  book: GoogleBook
}

export function BookCard({ book }: BookCardProps) {
  return (
    <View className="bg-card mb-4.5 w-full flex-row overflow-hidden rounded-2xl border border-gray-700 shadow-lg">
      <Image
        source={{ uri: book.image }}
        className="w-22.5 h-32.5 rounded-bl-2xl rounded-tl-2xl bg-gray-600"
        resizeMode="cover"
      />
      <View className="flex-1 justify-center p-3">
        <Text className="mb-0.5 text-lg font-bold text-yellow-400" numberOfLines={2}>
          {book.title}
        </Text>
        {book.authors && (
          <Text className="mb-0.5 text-sm text-white" numberOfLines={1}>
            {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
          </Text>
        )}
        <View className="mb-1 flex-row items-center">
          {[1, 2, 3, 4, 5].map(i => (
            <Ionicons
              key={i}
              name={i <= Math.round(book.rating) ? 'star' : 'star-outline'}
              size={15}
              color="#FFD700"
              className="mr-0.25"
            />
          ))}
          {book.ratingsCount > 0 && (
            <Text className="ml-1 text-xs text-yellow-400">({book.ratingsCount})</Text>
          )}
        </View>
        {book.publishedDate && (
          <Text className="mb-0.5 text-xs text-gray-400">{book.publishedDate}</Text>
        )}
        {book.description && (
          <Text className="text-xs text-gray-300" numberOfLines={3}>
            {book.description}
          </Text>
        )}
      </View>
    </View>
  )
}

// ...existing code...
