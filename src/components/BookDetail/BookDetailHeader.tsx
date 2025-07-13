import { Stack } from 'expo-router'

interface BookDetailHeaderProps {
  headerOptions: {
    headerStyle: { backgroundColor: string }
    headerTintColor: string
    headerTitle: string
  }
}

export const BookDetailHeader: React.FC<BookDetailHeaderProps> = ({ headerOptions }) => {
  return <Stack.Screen options={headerOptions} />
}
