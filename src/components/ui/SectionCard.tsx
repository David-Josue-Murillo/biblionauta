import { View, Text, ViewProps } from 'react-native'
import { COLORS } from '../../constants/colors'

export interface SectionCardProps extends ViewProps {
  icon?: React.ReactNode
  title: string
  children: React.ReactNode
  variant?: 'default' | 'elevated'
}

export function SectionCard({
  icon,
  title,
  children,
  variant = 'default',
  style,
  ...props
}: SectionCardProps) {
  return (
    <View className="mb-6" {...props}>
      {/* Header de la sección */}
      <View className="mb-3 flex-row items-center">
        {icon && <Text className="mr-2 text-2xl">{icon}</Text>}
        <Text className="text-lg font-bold text-white">{title}</Text>
      </View>

      {/* Contenido de la sección */}
      <View
        className="overflow-hidden rounded-xl"
        style={[
          {
            backgroundColor: COLORS.background.secondary,
            borderWidth: 1,
            borderColor: COLORS.border.muted,
            ...(variant === 'elevated' && {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 4,
            }),
          },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  )
}
