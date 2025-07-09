import { useEffect, useState } from "react";
import { googleBooksApi } from "../api/googleBooksApi";

const terms = [
  "Libros de autoayuda",
  "Libros de informatica"
];

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Obteniendo libros");
    
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Realiza ambas peticiones en paralelo
    Promise.all(
      terms.map(term =>
        googleBooksApi.get(`volumes?q=${encodeURIComponent(term)}&maxResults=12`)
      )
    )
      .then(responses => {
        if (!isMounted) return;
        // Combina y mapea los resultados
        const allBooks = responses
          .flatMap(res => res.data.items || [])
          .map(book => ({
            id: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle || "",
            authors: book.volumeInfo.authors || ["Autor desconocido"],
            description: book.volumeInfo.description || "",
            categories: book.volumeInfo.categories || [],
            image: book.volumeInfo.imageLinks?.thumbnail || "",
            publishedDate: book.volumeInfo.publishedDate || "",
            rating: book.volumeInfo.averageRating || 0,
            ratingsCount: book.volumeInfo.ratingsCount || 0,
            language: book.volumeInfo.language || "N/A"
          }));
        setBooks(allBooks);
        setLoading(false);
      })
      .catch((e) => {
        if (isMounted) {
          setError("No se pudieron cargar los libros");
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
    console.log("Libros obtenidos");
  }, []);

  return { books, loading, error };
}
  
  /*const books = responseBooks.items || [];

  const mappedBooks = books.map(book => ({
    id: book.id,
    title: book.volumeInfo.title,
    subtitle: book.volumeInfo.subtitle || "",
    authors: book.volumeInfo.authors || ["Autor desconocido"],
    description: book.volumeInfo.description || "",
    categories: book.volumeInfo.categories || [],
    image: book.volumeInfo.imageLinks?.thumbnail || "http://books.google.com/books/content?id=xR1PRj2n6jUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publishedDate: book.volumeInfo.publishedDate || "",
    rating: book.volumeInfo.averageRating || 0,
    ratingsCount: book.volumeInfo.ratingsCount || 0,
    language: book.volumeInfo.language || "N/A"
  }));

  // filepath: src/hooks/useBooks.js
  const uniqueBooks = [];
  const seenIds = new Set();
  for (const book of mappedBooks) {
    if (!seenIds.has(book.id)) {
      uniqueBooks.push(book);
      seenIds.add(book.id);
    }
  }
  
  return { books: uniqueBooks, loading: false, error: null };
}
*/