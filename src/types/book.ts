export interface BookItem {
  id: string
  title: string
  image?: string
  authors?: string[] | string
  categories?: string[]
}

export interface BooksItemsProps {
  books: BookItem[]
  startIndex?: number
  highlighted?: boolean
  showDetails?: boolean
} 