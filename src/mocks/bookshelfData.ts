import { BOOK_GENRES, READING_STATUS } from "../constants/bookshelf";

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  image: string;
  rating: number;
  totalPages: number;
  currentPage?: number;
  status:
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "PAUSED"
    | "WANT_TO_READ";
  genre: keyof typeof BOOK_GENRES;
  addedDate: string;
  completedDate?: string;
  isFavorite: boolean;
  personalRating?: number;
  personalNotes?: string;
  readingTime?: number; // en minutos
  categories?: string[];
  language?: string;
  description?: string;
}

export interface ReadingStats {
  totalBooks: number;
  totalPages: number;
  averageRating: number;
  favoriteGenre: string;
  readingStreak: number;
  booksThisMonth: number;
  pagesThisMonth: number;
  readingGoal: number;
  goalProgress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface ReadingGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: "books" | "pages" | "hours" | "days";
  period: "daily" | "weekly" | "monthly" | "yearly";
  deadline?: string;
}

// Datos simulados de libros
export const userBooks: Book[] = [
  {
    id: "1",
    title: "El hombre en busca del sentido",
    subtitle: "Un psicólogo en un campo de concentración",
    authors: ["Viktor E. Frankl"],
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    rating: 4.5,
    totalPages: 200,
    currentPage: 150,
    status: "IN_PROGRESS",
    genre: "PHILOSOPHY",
    addedDate: "2024-01-15",
    isFavorite: true,
    personalRating: 5,
    personalNotes: "Libro increíble sobre la resiliencia humana",
    readingTime: 180,
  },
  {
    id: "2",
    title: "Dune",
    subtitle: "La saga de los Atreides",
    authors: ["Frank Herbert"],
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400",
    rating: 4.8,
    totalPages: 688,
    status: "COMPLETED",
    genre: "SCIENCE_FICTION",
    addedDate: "2024-02-01",
    completedDate: "2024-03-15",
    isFavorite: true,
    personalRating: 5,
    readingTime: 1200,
  },
  {
    id: "3",
    title: "Atomic Habits",
    subtitle: "Tiny Changes, Remarkable Results",
    authors: ["James Clear"],
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
    rating: 4.6,
    totalPages: 320,
    status: "COMPLETED",
    genre: "SELF_HELP",
    addedDate: "2024-01-01",
    completedDate: "2024-02-28",
    isFavorite: false,
    personalRating: 4,
    readingTime: 480,
  },
  {
    id: "4",
    title: "The Midnight Library",
    authors: ["Matt Haig"],
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    rating: 4.2,
    totalPages: 288,
    status: "WANT_TO_READ",
    genre: "FICTION",
    addedDate: "2024-03-20",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Sapiens",
    subtitle: "De animales a dioses",
    authors: ["Yuval Noah Harari"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.7,
    totalPages: 496,
    currentPage: 50,
    status: "IN_PROGRESS",
    genre: "HISTORY",
    addedDate: "2024-03-01",
    isFavorite: false,
    readingTime: 90,
  },
  {
    id: "6",
    title: "The Psychology of Money",
    authors: ["Morgan Housel"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    rating: 4.4,
    totalPages: 256,
    status: "COMPLETED",
    genre: "BUSINESS",
    addedDate: "2024-02-15",
    completedDate: "2024-03-10",
    isFavorite: false,
    personalRating: 4,
    readingTime: 320,
  },
];

// Estadísticas de lectura
export const readingStats: ReadingStats = {
  totalBooks: 6,
  totalPages: 2248,
  averageRating: 4.5,
  favoriteGenre: "Filosofía",
  readingStreak: 12,
  booksThisMonth: 2,
  pagesThisMonth: 450,
  readingGoal: 12,
  goalProgress: 50,
};

// Logros del usuario
export const userAchievements: Achievement[] = [
  {
    id: "first_book",
    title: "Primer libro",
    description: "Completaste tu primer libro",
    icon: "📚",
    unlocked: true,
    unlockedDate: "2024-02-28",
  },
  {
    id: "speed_reader",
    title: "Lector veloz",
    description: "Leíste 5 libros en un mes",
    icon: "⚡",
    unlocked: false,
  },
  {
    id: "diversity",
    title: "Lector diverso",
    description: "Leíste 3 géneros diferentes",
    icon: "🌈",
    unlocked: true,
    unlockedDate: "2024-03-15",
  },
  {
    id: "consistent",
    title: "Lector consistente",
    description: "7 días consecutivos de lectura",
    icon: "🔥",
    unlocked: true,
    unlockedDate: "2024-03-20",
  },
];

// Metas de lectura
export const readingGoals: ReadingGoal[] = [
  {
    id: "books_year",
    title: "Libros este año",
    target: 12,
    current: 6,
    unit: "books",
    period: "yearly",
    deadline: "2024-12-31",
  },
  {
    id: "pages_month",
    title: "Páginas este mes",
    target: 500,
    current: 450,
    unit: "pages",
    period: "monthly",
  },
  {
    id: "reading_streak",
    title: "Racha de lectura",
    target: 30,
    current: 12,
    unit: "days",
    period: "daily",
  },
];

// Colecciones personalizadas
export const personalCollections = [
  {
    id: "philosophy_books",
    name: "Libros de Filosofía",
    description: "Mi colección de filosofía y psicología",
    bookCount: 2,
    color: "#8B5CF6",
  },
  {
    id: "sci_fi_favorites",
    name: "Ciencia Ficción Favorita",
    description: "Los mejores libros de sci-fi",
    bookCount: 1,
    color: "#06B6D4",
  },
  {
    id: "self_improvement",
    name: "Auto-mejora",
    description: "Libros para crecer personalmente",
    bookCount: 2,
    color: "#10B981",
  },
];
