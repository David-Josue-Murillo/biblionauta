import { View, Text, Switch, ViewProps } from 'react-native'
import { COLORS } from '../../constants/colors'

export interface SwitchRowProps extends ViewProps {
  title: string
  description: string
  value: boolean
  onValueChange: (value: boolean) => void
  isLast?: boolean
}

export function SwitchRow({
  title,
  description,
  value,
  onValueChange,
  isLast = false,
  style,
  ...props
}: SwitchRowProps) {
  return (
    <View
      className={`flex-row items-center justify-between px-4 py-4 ${
        !isLast ? 'border-b border-zinc-700' : ''
      }`}
      style={style}
      {...props}
    >
      <View className="mr-4 flex-1">
        <Text className="mb-1 text-base font-medium text-white">{title}</Text>
        <Text className="text-sm text-zinc-400">{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: COLORS.background.tertiary,
          true: COLORS.accent.primary,
        }}
        thumbColor={value ? COLORS.accent.secondary : COLORS.text.muted}
      />
    </View>
  )
}
