import { View, Text, Pressable, ViewProps } from 'react-native'
import { COLORS } from '../../constants/colors'

export interface HeaderBarProps extends ViewProps {
  title: string
  leftButton?: {
    text: string
    onPress: () => void
    disabled?: boolean
  }
  rightButton?: {
    text: string
    onPress: () => void
    disabled?: boolean
    variant?: 'primary' | 'secondary'
  }
}

export function HeaderBar({ title, leftButton, rightButton, style, ...props }: HeaderBarProps) {
  return (
    <View
      className="flex-row items-center justify-between border-b px-4 py-4"
      style={[{ borderColor: COLORS.border.muted }, style]}
      {...props}
    >
      {leftButton ? (
        <Pressable
          onPress={leftButton.onPress}
          disabled={leftButton.disabled}
          className="rounded-lg p-2"
          style={({ pressed }) => [
            {
              backgroundColor:
                pressed && !leftButton.disabled ? COLORS.background.tertiary : 'transparent',
              opacity: leftButton.disabled ? 0.6 : 1,
            },
          ]}
        >
          <Text className="text-lg text-white">{leftButton.text}</Text>
        </Pressable>
      ) : (
        <View style={{ width: 60 }} />
      )}

      <Text className="text-xl font-bold text-white">{title}</Text>

      {rightButton ? (
        <Pressable
          onPress={rightButton.onPress}
          disabled={rightButton.disabled}
          className="rounded-lg p-2"
          style={({ pressed }) => [
            {
              backgroundColor:
                pressed && !rightButton.disabled ? COLORS.background.tertiary : 'transparent',
              opacity: rightButton.disabled ? 0.6 : 1,
            },
          ]}
        >
          <Text
            className={`text-lg font-semibold ${rightButton.disabled ? 'text-zinc-500' : ''}`}
            style={{
              color: rightButton.disabled
                ? COLORS.text.muted
                : rightButton.variant === 'primary'
                  ? COLORS.accent.primary
                  : COLORS.text.primary,
            }}
          >
            {rightButton.text}
          </Text>
        </Pressable>
      ) : (
        <View style={{ width: 60 }} />
      )}
    </View>
  )
}
