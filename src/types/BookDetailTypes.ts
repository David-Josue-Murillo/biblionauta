import { Book } from "../mocks/bookshelfData"

export interface BookDetailScreenProps {
  id: string
}

export interface BookDetailState {
  book: Book | null
  loading: boolean
  error: string | null
  isFavorite: boolean
  isTogglingFavorite: boolean
}

export interface BookDetailActions {
  handleAddToWishlist: () => void
  handleAddToShelf: () => void
  handleGoBack: () => void
}