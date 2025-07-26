import { ActivityIndicator, ScrollView } from 'react-native'
import { BookCard } from './SearchComponents'
import { SearchEmptyState } from '../ui/SearchEmptyState'
import { SearchErrorState } from '../ui/SearchErrorState'

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

interface SearchResultsProps {
  loading: boolean
  error: string | null
  filteredBooks: GoogleBook[]
}

export function SearchResults({ loading, error, filteredBooks }: SearchResultsProps) {
  return (
    <ScrollView
      className="px-4 pb-8"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
    >
      {loading ? (
        <ActivityIndicator color="#FFD600" size="large" className="mt-10" />
      ) : error ? (
        <SearchErrorState />
      ) : filteredBooks.length > 0 ? (
        filteredBooks.map(book => <BookCard key={book.id} book={book} />)
      ) : (
        <SearchEmptyState />
      )}
    </ScrollView>
  )
}
