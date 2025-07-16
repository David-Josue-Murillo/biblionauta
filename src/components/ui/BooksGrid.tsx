import { View, ViewProps } from 'react-native'

interface BooksGridProps extends ViewProps {
  children: React.ReactNode
}

export function BooksGrid({ children, style, ...props }: BooksGridProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: '100%',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}
