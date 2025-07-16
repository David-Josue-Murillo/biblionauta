import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode
  size?: number
  color?: string
}

export function IconButton({ icon, size = 24, color = '#fff', style, ...props }: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[{ padding: 4, alignItems: 'center', justifyContent: 'center' }, style]}
      {...props}
    >
      <Text style={{ fontSize: size, color }}>{icon}</Text>
    </TouchableOpacity>
  )
}
