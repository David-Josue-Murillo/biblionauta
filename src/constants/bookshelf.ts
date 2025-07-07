export const BOOKSHELF_CATEGORIES = {
  READING: 'reading',
  READ: 'read',
  WANT_TO_READ: 'want_to_read',
  FAVORITES: 'favorites',
  COMPLETED: 'completed'
} as const;

export const READING_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  PAUSED: 'paused'
} as const;

export const BOOK_GENRES = {
  FICTION: 'Ficción',
  NON_FICTION: 'No ficción',
  SCIENCE_FICTION: 'Ciencia ficción',
  FANTASY: 'Fantasía',
  MYSTERY: 'Misterio',
  ROMANCE: 'Romance',
  HISTORY: 'Historia',
  SCIENCE: 'Ciencia',
  PHILOSOPHY: 'Filosofía',
  SELF_HELP: 'Autoayuda',
  BUSINESS: 'Negocios',
  BIOGRAPHY: 'Biografía'
} as const;

export const READING_GOALS = {
  BOOKS_PER_YEAR: 12,
  PAGES_PER_DAY: 30,
  HOURS_PER_WEEK: 5
} as const;

export const ACHIEVEMENTS = {
  FIRST_BOOK: {
    id: 'first_book',
    title: 'Primer libro',
    description: 'Completaste tu primer libro',
    icon: '📚'
  },
  SPEED_READER: {
    id: 'speed_reader',
    title: 'Lector veloz',
    description: 'Leíste 5 libros en un mes',
    icon: '⚡'
  },
  DIVERSITY: {
    id: 'diversity',
    title: 'Lector diverso',
    description: 'Leíste 3 géneros diferentes',
    icon: '🌈'
  },
  CONSISTENT: {
    id: 'consistent',
    title: 'Lector consistente',
    description: '7 días consecutivos de lectura',
    icon: '🔥'
  }
} as const;

export const BOOKSHELF_SECTIONS = [
  {
    id: 'currently_reading',
    title: 'Leyendo actualmente',
    icon: '📖',
    color: '#FFD700'
  },
  {
    id: 'want_to_read',
    title: 'Lista de lectura',
    icon: '📋',
    color: '#00fff7'
  },
  {
    id: 'completed',
    title: 'Completados',
    icon: '✅',
    color: '#48bb78'
  },
  {
    id: 'favorites',
    title: 'Favoritos',
    icon: '❤️',
    color: '#ff69b4'
  }
] as const; 