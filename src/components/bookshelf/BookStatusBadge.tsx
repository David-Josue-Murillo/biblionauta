import { View, Text } from 'react-native'

interface BookStatusBadgeProps {
  status: string
  color: string
  text: string
}

// Badge for book status (reusable, styled)
export function BookStatusBadge({ color, text }: BookStatusBadgeProps) {
  return (
    <View
      className="rounded-full px-2 py-1"
      style={{ backgroundColor: `${color}20` }}
      accessibilityRole="text"
      accessibilityLabel={`Estado: ${text}`}
    >
      <Text className="text-xs font-medium" style={{ color }}>
        {text}
      </Text>
    </View>
  )
}
