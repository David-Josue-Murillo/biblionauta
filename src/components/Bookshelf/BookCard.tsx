import { View, Text, Image, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { COLORS } from '../../constants/colors'
import { Book } from '../../mocks/bookshelfData'

interface BookCardProps {
  book: Book
  showProgress?: boolean
  showStatus?: boolean
}

export function BookCard({
  book,
  showProgress = true,
  showStatus = true,
}: BookCardProps) {
  const getProgressPercentage = () => {
    if (!book.currentPage || !book.totalPages) return 0
    return Math.round((book.currentPage / book.totalPages) * 100)
  }

  const getStatusColor = () => {
    switch (book.status) {
      case 'IN_PROGRESS':
        return COLORS.accent.primary
      case 'COMPLETED':
        return '#48bb78'
      case 'PAUSED':
        return '#ed8936'
      case 'WANT_TO_READ':
        return COLORS.accent.secondary
      default:
        return COLORS.text.muted
    }
  }

  const getStatusText = () => {
    switch (book.status) {
      case 'IN_PROGRESS':
        return 'Leyendo'
      case 'COMPLETED':
        return 'Completado'
      case 'PAUSED':
        return 'Pausado'
      case 'WANT_TO_READ':
        return 'Por leer'
      default:
        return 'No iniciado'
    }
  }

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

          {/* Indicador de favorito */}
          {book.isFavorite && (
            <View
              className="absolute right-2 top-2 h-6 w-6 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(255, 105, 180, 0.9)', zIndex: 3 }}
            >
              <Text className="text-xs text-white">❤️</Text>
            </View>
          )}

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
                <View
                  className="rounded-full px-2 py-1"
                  style={{ backgroundColor: `${getStatusColor()}20` }}
                >
                  <Text
                    className="text-xs font-medium"
                    style={{ color: getStatusColor() }}
                  >
                    {getStatusText()}
                  </Text>
                </View>

                {book.personalRating && (
                  <View className="flex-row items-center">
                    <Text className="mr-1 text-xs text-yellow-400">★</Text>
                    <Text className="text-xs text-white">
                      {book.personalRating}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Progreso de lectura */}
            {showProgress &&
              book.currentPage &&
              book.status === 'IN_PROGRESS' && (
                <View className="mb-2">
                  <View className="mb-1 flex-row items-center justify-between">
                    <Text className="text-xs text-zinc-400">
                      Página {book.currentPage} de {book.totalPages}
                    </Text>
                    <Text className="text-xs text-zinc-400">
                      {getProgressPercentage()}%
                    </Text>
                  </View>
                  <View className="h-1 overflow-hidden rounded-full bg-zinc-700">
                    <View
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: COLORS.accent.primary,
                        width: `${getProgressPercentage()}%`,
                      }}
                    />
                  </View>
                </View>
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
