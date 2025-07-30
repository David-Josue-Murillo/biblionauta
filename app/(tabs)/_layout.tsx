import { Tabs } from 'expo-router'
import {
  BookmarkIcon,
  HomeIcon,
  SearchIcon,
  TopBooksIcon,
  UserIcon,
} from '../../src/components/Icons'
import { colors } from '../../src/constants/theme'

// Definir los iconos fuera del componente para evitar recreaciones
const TabIcons = {
  home: ({ color }: { color: string }) => <HomeIcon color={color} />,
  trending: ({ color }: { color: string }) => <TopBooksIcon color={color} />,
  search: ({ color }: { color: string }) => <SearchIcon color={color} />,
  bookshelf: ({ color }: { color: string }) => <BookmarkIcon color={color} />,
  profile: ({ color }: { color: string }) => <UserIcon color={color} />,
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: TabIcons.home,
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          title: 'Top libros',
          tabBarIcon: TabIcons.trending,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
          tabBarIcon: TabIcons.search,
        }}
      />
      <Tabs.Screen
        name="bookshelf"
        options={{
          title: 'Mi Biblioteca',
          tabBarIcon: TabIcons.bookshelf,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Cuenta',
          tabBarIcon: TabIcons.profile,
        }}
      />
    </Tabs>
  )
}
