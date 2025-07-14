import { Pressable, Text, PressableProps } from 'react-native'

interface SecondaryButtonProps extends PressableProps {
  children: React.ReactNode
}

export function SecondaryButton({ children, style, ...props }: SecondaryButtonProps) {
  return (
    <Pressable
      className="rounded-lg p-2"
      style={({ pressed }) => [
        { backgroundColor: pressed ? '#232946' : 'transparent' },
        style as any,
      ]}
      {...props}
    >
      <Text className="text-lg" style={{ color: 'white' }}>
        {children}
      </Text>
    </Pressable>
  )
}
