export interface MockUserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber?: string;
  bio?: string;
  location?: string;
  website?: string;
  memberSince: string;
  booksRead: number;
  wishlistItems: number;
  shelfItems: number;
  createdAt: Date;
  updatedAt: Date;
  achievements: Achievement[];
  recentBooks: RecentBook[];
  readingStats: ReadingStats;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  progress?: number;
  total?: number;
}

export interface RecentBook {
  id: string;
  title: string;
  author: string;
  coverURL: string;
  rating: number;
  readAt: Date;
}

export interface ReadingStats {
  totalBooks: number;
  totalPages: number;
  averageRating: number;
  readingStreak: number;
  favoriteGenres: string[];
  monthlyGoal: number;
  monthlyProgress: number;
}

export const mockUserProfile: MockUserProfile = {
  uid: "user123",
  displayName: "María García",
  email: "maria.garcia@email.com",
  photoURL: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  phoneNumber: "+34 612 345 678",
  bio: "Apasionada lectora de ciencia ficción y fantasía. Siempre en busca de nuevas historias que me transporten a mundos increíbles.",
  location: "Madrid, España",
  website: "https://marialectora.com",
  memberSince: "Enero 2023",
  booksRead: 47,
  wishlistItems: 23,
  shelfItems: 156,
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2024-01-15"),
  
  achievements: [
    {
      id: "1",
      title: "Primer Libro",
      description: "Completaste tu primer libro",
      icon: "📚",
      unlockedAt: new Date("2023-01-20"),
    },
    {
      id: "2",
      title: "Lector Ávido",
      description: "Leíste 10 libros en un mes",
      icon: "🔥",
      unlockedAt: new Date("2023-03-15"),
    },
    {
      id: "3",
      title: "Crítico Literario",
      description: "Escribiste 50 reseñas",
      icon: "✍️",
      unlockedAt: new Date("2023-06-10"),
    },
    {
      id: "4",
      title: "Explorador de Géneros",
      description: "Leíste libros de 5 géneros diferentes",
      icon: "🌍",
      unlockedAt: new Date("2023-08-22"),
    },
    {
      id: "5",
      title: "Maratón de Lectura",
      description: "7 días consecutivos de lectura",
      icon: "🏃‍♀️",
      unlockedAt: new Date("2023-11-05"),
    },
    {
      id: "6",
      title: "Bibliófilo",
      description: "Agregaste 100 libros a tu biblioteca",
      icon: "📖",
      unlockedAt: new Date("2024-01-10"),
    }
  ],
  
  recentBooks: [
    {
      id: "book1",
      title: "El Nombre del Viento",
      author: "Patrick Rothfuss",
      coverURL: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop",
      rating: 5,
      readAt: new Date("2024-01-10"),
    },
    {
      id: "book2",
      title: "Dune",
      author: "Frank Herbert",
      coverURL: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop",
      rating: 4,
      readAt: new Date("2024-01-05"),
    },
    {
      id: "book3",
      title: "El Hobbit",
      author: "J.R.R. Tolkien",
      coverURL: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=100&h=150&fit=crop",
      rating: 5,
      readAt: new Date("2023-12-28"),
    },
    {
      id: "book4",
      title: "Neuromante",
      author: "William Gibson",
      coverURL: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop",
      rating: 4,
      readAt: new Date("2023-12-20"),
    }
  ],
  
  readingStats: {
    totalBooks: 47,
    totalPages: 15420,
    averageRating: 4.2,
    readingStreak: 12,
    favoriteGenres: ["Ciencia Ficción", "Fantasía", "Misterio", "Histórica"],
    monthlyGoal: 4,
    monthlyProgress: 3,
  }
};

export interface UserData {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  booksRead: number;
  wishlistItems: number;
  shelfItems: number;
  phoneNumber?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  hasToggle?: boolean;
  value?: string;
}

export interface MenuSectionData {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}

// Mock data para el usuario
export const userData: UserData = {
  name: "David Murillo",
  email: "david@biblionauta.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  memberSince: "Enero 2024",
  booksRead: 23,
  wishlistItems: 15,
  shelfItems: 8,
  phoneNumber: "+1 (555) 123-4567",
  bio: "Apasionado lector y desarrollador de software. Me encanta explorar nuevos mundos a través de los libros.",
  location: "Madrid, España",
  website: "https://davidmurillo.dev"
};

export const menuItems: MenuSectionData[] = [
  {
    id: 'account',
    title: 'Cuenta',
    icon: '👤',
    items: [
      { id: 'edit-profile', label: 'Editar perfil', icon: '✏️' },
      { id: 'change-password', label: 'Cambiar contraseña', icon: '🔒' },
      { id: 'privacy', label: 'Privacidad', icon: '🛡️' }
    ]
  },
  {
    id: 'library',
    title: 'Biblioteca',
    icon: '📚',
    items: [
      { id: 'reading-list', label: 'Lista de lectura', icon: '📖' },
      { id: 'wishlist', label: 'Lista de deseos', icon: '❤️' },
      { id: 'shelf', label: 'Mi estantería', icon: '📦' },
      { id: 'reading-stats', label: 'Estadísticas', icon: '📊' }
    ]
  },
  {
    id: 'preferences',
    title: 'Preferencias',
    icon: '⚙️',
    items: [
      { id: 'notifications', label: 'Notificaciones', icon: '🔔', hasToggle: true },
      { id: 'dark-mode', label: 'Modo oscuro', icon: '🌙', hasToggle: true },
      { id: 'language', label: 'Idioma', icon: '🌍', value: 'Español' }
    ]
  },
  {
    id: 'support',
    title: 'Soporte',
    icon: '🆘',
    items: [
      { id: 'help', label: 'Centro de ayuda', icon: '❓' },
      { id: 'feedback', label: 'Enviar feedback', icon: '💬' },
      { id: 'about', label: 'Acerca de Biblionauta', icon: 'ℹ️' }
    ]
  }
]; 