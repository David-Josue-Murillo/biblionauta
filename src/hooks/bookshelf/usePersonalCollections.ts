import { Collection } from '../../components/Bookshelf/PersonalCollections'

// Hook para lógica de colecciones personales
export function usePersonalCollections(collections: Collection[]) {
  function isEmpty() {
    return collections.length === 0
  }

  return {
    isEmpty,
  }
}
