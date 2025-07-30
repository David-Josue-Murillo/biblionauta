import { Text } from 'react-native'

// Estado de error para resultados de búsqueda
export function SearchErrorState() {
  return (
    <Text className="mt-8 text-center text-white">Error al cargar los libros.</Text>
  )
}
