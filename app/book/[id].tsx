import { useLocalSearchParams } from 'expo-router'
import { useBookDetailState } from '../../src/hooks/useBookDetailState'
import { useBookDetailNavigation } from '../../src/hooks/useBookDetailNavigation'
import { BookDetailLayout } from '../../src/components/BookDetail/BookDetailLayout'
import { BookDetailHeader } from '../../src/components/BookDetail/BookDetailHeader'
import { ErrorState, LoadingState } from '../../src/components/BookDetail'

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams()
  const bookId = id as string

  const { state, actions } = useBookDetailState(bookId)
  const { handleGoBack, getHeaderOptions } = useBookDetailNavigation(state.book?.title)

  // Merge navigation actions with book actions
  const allActions = { ...actions, handleGoBack }

  // Loading state
  if (state.loading) {
    return <LoadingState />
  }

  // Error state
  if (state.error || !state.book) {
    return <ErrorState error={state.error || 'Libro no encontrado'} onGoBack={handleGoBack} />
  }

  const bookWithFavoriteStatus = { ...state.book, isFavorite: state.isFavorite }

  return (
    <>
      <BookDetailHeader headerOptions={getHeaderOptions()} />
      <BookDetailLayout
        book={bookWithFavoriteStatus}
        isFavorite={state.isFavorite}
        isTogglingFavorite={state.isTogglingFavorite}
        onAddToWishlist={allActions.handleAddToWishlist}
        onAddToShelf={allActions.handleAddToShelf}
      />
    </>
  )
}
