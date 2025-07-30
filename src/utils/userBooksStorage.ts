import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Book } from '../mocks/bookshelfData'

const USER_BOOKS_KEY = 'USER_BOOKS'

export async function saveUserBooks(books: Book[]): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_BOOKS_KEY, JSON.stringify(books))
  } catch (error) {
    console.error('Error guardando libros del usuario:', error)
  }
}

export async function loadUserBooks(): Promise<Book[] | null> {
  try {
    const data = await AsyncStorage.getItem(USER_BOOKS_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error cargando libros del usuario:', error)
    return null
  }
}
