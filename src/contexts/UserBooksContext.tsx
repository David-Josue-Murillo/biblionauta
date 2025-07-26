import { createContext, useContext } from 'react'
import { Book } from '../mocks/bookshelfData'
import { useUserBooksState } from '../hooks/bookshelf/useUserBooks'

interface UserBooksContextProps {
  books: Book[]
  toggleFavorite: (bookId: string) => void
  addBook: (book: Book) => void
}

const UserBooksContext = createContext<UserBooksContextProps | undefined>(undefined)

export function UserBooksProvider({ children }: { children: React.ReactNode }) {
  const value = useUserBooksState()
  return <UserBooksContext.Provider value={value}>{children}</UserBooksContext.Provider>
}

export function useUserBooks() {
  const ctx = useContext(UserBooksContext)
  if (!ctx) throw new Error('useUserBooks debe usarse dentro de UserBooksProvider')
  return ctx
}
