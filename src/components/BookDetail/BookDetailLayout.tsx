import { ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { BookCard } from './BookCard'
import { BookDetails } from './BookDetails'
import { ActionButtons } from './ActionButtons'
import { COLORS } from '../../constants/colors'
import type { Book } from '../../mocks/bookshelfData'

interface BookDetailLayoutProps {
  book: Book & { isFavorite: boolean }
  isFavorite: boolean
  isTogglingFavorite: boolean
  onAddToWishlist: () => void
  onAddToShelf: () => void
}

export const BookDetailLayout: React.FC<BookDetailLayoutProps> = ({
  book,
  isFavorite,
  isTogglingFavorite,
  onAddToWishlist,
  onAddToShelf,
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background.primary,
      }}
    >
      <StatusBar style="dark" />

      <ScrollView style={{ paddingBottom: 120 }}>
        <BookCard book={book} />
        <BookDetails book={book} />
      </ScrollView>

      <ActionButtons
        isFavorite={isFavorite}
        isTogglingFavorite={isTogglingFavorite}
        onAddToWishlist={onAddToWishlist}
        onAddToShelf={onAddToShelf}
      />
    </View>
  )
}
