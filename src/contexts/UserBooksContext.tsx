import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { userBooks as initialBooks, Book } from '../mocks/bookshelfData';
import { saveUserBooks, loadUserBooks } from '../utils/userBooksStorage';

interface UserBooksContextProps {
  books: Book[];
  toggleFavorite: (bookId: string) => void;
  addBook: (book: Book) => void;
}

const UserBooksContext = createContext<UserBooksContextProps | undefined>(undefined);

export function UserBooksProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  // Cargar libros desde almacenamiento al iniciar
  useEffect(() => {
    loadUserBooks().then((stored) => {
      if (stored) setBooks(stored);
    });
  }, []);

  // Guardar libros cada vez que cambian
  useEffect(() => {
    saveUserBooks(books);
  }, [books]);


  const toggleFavorite = useCallback((bookId: string) => {
    setBooks(prev => prev.map(book =>
      book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
    ));
  }, []);

  const addBook = useCallback((book: Book) => {
    setBooks(prev => {
      if (prev.some(b => b.id === book.id)) return prev;
      return [...prev, book];
    });
  }, []);

  return (
    <UserBooksContext.Provider value={{ books, toggleFavorite, addBook }}>
      {children}
    </UserBooksContext.Provider>
  );
}

export function useUserBooks() {
  const ctx = useContext(UserBooksContext);
  if (!ctx) throw new Error('useUserBooks debe usarse dentro de UserBooksProvider');
  return ctx;
} 