import { useEffect, useState } from "react";
import { getBookDetails } from "../utils/book";

interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  description: string;
  image: string;
  rating: number;
  ratingsCount: number;
  categories: string[];
  language: string;
}

interface UseBookDetailsReturn {
  book: Book | null;
  loading: boolean;
  error: string | null;
}

export function useBookDetails(id: string): UseBookDetailsReturn {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getBookDetails(id);
        if (isMounted) {
          setBook(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("No se pudo cargar el libro");
          setLoading(false);
        }
      }
    };

    fetchBook();
    
    return () => { 
      isMounted = false; 
    };
  }, [id]);

  return { book, loading, error };
} 