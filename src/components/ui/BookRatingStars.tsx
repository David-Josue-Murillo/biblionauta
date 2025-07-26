import { Ionicons } from '@expo/vector-icons'

interface BookRatingStarsProps {
  rating: number
  size?: number
}

// Componente para mostrar estrellas de calificación
export function BookRatingStars({ rating, size = 10 }: BookRatingStarsProps) {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <Ionicons
          key={i}
          name={i < rating ? 'star' : 'star-outline'}
          size={size}
          color={i < rating ? '#FFD700' : '#666'}
        />
      ))}
    </>
  )
}
