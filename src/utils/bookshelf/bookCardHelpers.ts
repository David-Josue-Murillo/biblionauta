import { COLORS } from '../../constants/colors'
import { Book } from '../../mocks/bookshelfData'

// Get progress percentage for a book
export function getProgressPercentage(book: Book): number {
  if (!book.currentPage || !book.totalPages) return 0
  return Math.round((book.currentPage / book.totalPages) * 100)
}

// Get color for book status
export function getStatusColor(status: string): string {
  switch (status) {
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

// Get text for book status
export function getStatusText(status: string): string {
  switch (status) {
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
