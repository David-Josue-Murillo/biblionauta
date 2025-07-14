import { View, ViewProps } from 'react-native'
import { COLORS } from '../../constants/colors'

export interface InfoCardProps extends ViewProps {
  children: React.ReactNode
  variant?: 'default' | 'filled'
}

export function InfoCard({ children, variant = 'default', style, ...props }: InfoCardProps) {
  return (
    <View
      className="rounded-xl p-4"
      style={[
        {
          backgroundColor:
            variant === 'filled' ? COLORS.background.tertiary : COLORS.background.secondary,
          borderWidth: 1,
          borderColor: COLORS.border.muted,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}
