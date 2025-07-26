// Tipos para la tarjeta de libro reciente
export interface RecentBook {
  id: string
  title: string
  author: string
  coverURL: string
  rating: number
  readAt: Date
}

export interface RecentBookCardProps {
  book: RecentBook
  onPress?: () => void
}
