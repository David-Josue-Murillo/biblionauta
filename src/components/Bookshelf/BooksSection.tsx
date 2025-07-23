import { View } from 'react-native'
import { Book } from '../../mocks/bookshelfData'
import { BooksSectionHeader } from '../bookshelf/BooksSectionHeader'
import { BooksHorizontalList } from '../bookshelf/BooksHorizontalList'
import { useBooksSection } from '../../hooks/bookshelf/useBooksSection'

interface BooksSectionProps {
  title: string
  books: Book[]
  icon: string
  color: string
  onPress?: () => void
  showProgress?: boolean
  showStatus?: boolean
}

export function BooksSection({
  title,
  books,
  icon,
  onPress,
  showProgress = true,
  showStatus = true,
}: BooksSectionProps) {
  if (books.length === 0) return null

  return (
    <View className="mb-6">
      <BooksSectionHeader
        title={title}
        icon={icon}
        count={books.length}
        onPress={onPress}
      />
      <BooksHorizontalList
        books={books}
        showProgress={showProgress}
        showStatus={showStatus}
      />
    </View>
  )
}

interface BookshelfOverviewProps {
  books: Book[]
  onSectionPress?: (sectionId: string) => void
}

export function BookshelfOverview({
  books,
  onSectionPress,
}: BookshelfOverviewProps) {
  const { getBooksByStatus, getFavoriteBooks } = useBooksSection(books)

  return (
    <View>
      {/* Libros leyendo actualmente */}
      <BooksSection
        title="Leyendo actualmente"
        books={getBooksByStatus('IN_PROGRESS')}
        icon="📖"
        color="#FFD700"
        onPress={() => onSectionPress?.('currently_reading')}
        showProgress
        showStatus={false}
      />

      {/* Lista de lectura */}
      <BooksSection
        title="Lista de lectura"
        books={getBooksByStatus('WANT_TO_READ')}
        icon="📋"
        color="#00fff7"
        onPress={() => onSectionPress?.('want_to_read')}
        showProgress={false}
        showStatus={false}
      />

      {/* Libros completados */}
      <BooksSection
        title="Completados"
        books={getBooksByStatus('COMPLETED')}
        icon="✅"
        color="#48bb78"
        onPress={() => onSectionPress?.('completed')}
        showProgress={false}
        showStatus={false}
      />

      {/* Libros favoritos */}
      <BooksSection
        title="Favoritos"
        books={getFavoriteBooks()}
        icon="❤️"
        color="#ff69b4"
        onPress={() => onSectionPress?.('favorites')}
        showProgress
        showStatus
      />
    </View>
  )
}
