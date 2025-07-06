export interface UserData {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  booksRead: number;
  wishlistItems: number;
  shelfItems: number;
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
  shelfItems: 8
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