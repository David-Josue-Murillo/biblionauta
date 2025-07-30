import { Pressable, Text, PressableProps } from 'react-native'

interface PrimaryButtonProps extends PressableProps {
  children: React.ReactNode
}

export function PrimaryButton({ children, style, ...props }: PrimaryButtonProps) {
  return (
    <Pressable
      className="rounded-lg p-2"
      style={({ pressed }) => [
        { backgroundColor: pressed ? '#232946' : 'transparent' },
        style as any,
      ]}
      {...props}
    >
      <Text className="text-lg font-semibold" style={{ color: '#FFD700' }}>
        {children}
      </Text>
    </Pressable>
  )
}
