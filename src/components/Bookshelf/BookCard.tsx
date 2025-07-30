import { Image, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { Book } from '../../mocks/bookshelfData'
import { BookStatusBadge } from '../bookshelf/BookStatusBadge'
import { BookFavoriteIndicator } from '../bookshelf/BookFavoriteIndicator'
import { BookRating } from '../bookshelf/BookRating'
import { BookProgressBar } from '../bookshelf/BookProgressBar'
import { getProgressPercentage, getStatusColor, getStatusText } from '../../utils/bookshelf/bookCardHelpers'

interface BookCardProps {
  book: Book
  showProgress?: boolean
  showStatus?: boolean
}

export function BookCard({ book, showProgress = true, showStatus = true }: BookCardProps) {
  // Solo composición y orquestación de UI
  return (
    <Link href={`/book/${book.id}`} asChild>
      <Pressable
        className="mb-4 w-44"
        accessible
        accessibilityLabel={`Libro: ${book.title}`}
        accessibilityHint="Toca para ver detalles del libro"
        style={({ pressed }) => [
          { transform: [{ scale: pressed ? 0.97 : 1 }] },
        ]}
      >
        <View className="overflow-hidden rounded-xl border border-zinc-700 shadow-lg">
          <LinearGradient
            colors={['#232526', '#414345']}
            className="h-48 w-full justify-end"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 1,
              opacity: 0.25,
            }}
            pointerEvents="none"
          />

          <Image
            source={{ uri: book.image }}
            className="h-48 w-full rounded-t-xl"
            accessibilityLabel={`Portada de ${book.title}`}
            resizeMode="cover"
            style={{ zIndex: 2 }}
          />

          {/* Indicador de favorito extraído a componente */}
          <BookFavoriteIndicator isFavorite={book.isFavorite} />

          {/* Información del libro */}
          <View className="bg-zinc-800 p-3">
            <Text
              className="mb-1 text-sm font-bold text-white"
              numberOfLines={2}
              style={{ lineHeight: 18 }}
            >
              {book.title}
            </Text>

            <Text className="mb-2 text-xs text-zinc-400" numberOfLines={1}>
              {book.authors.join(', ')}
            </Text>

            {/* Estado del libro */}
            {showStatus && (
              <View className="mb-2 flex-row items-center justify-between">
                <BookStatusBadge
                  color={getStatusColor(book.status)}
                  text={getStatusText(book.status)}
                  status={book.status}
                />
                <BookRating rating={book.personalRating} />
              </View>
            )}

            {/* Progreso de lectura */}
            {showProgress &&
              book.currentPage &&
              book.status === 'IN_PROGRESS' && (
                <BookProgressBar
                  currentPage={book.currentPage}
                  totalPages={book.totalPages}
                  progress={getProgressPercentage(book)}
                  color={getStatusColor('IN_PROGRESS')}
                />
              )}

            {/* Información adicional */}
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-zinc-500">
                {book.totalPages} páginas
              </Text>
              {book.readingTime && (
                <Text className="text-xs text-zinc-500">
                  {Math.round(book.readingTime / 60)}h leídas
                </Text>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
