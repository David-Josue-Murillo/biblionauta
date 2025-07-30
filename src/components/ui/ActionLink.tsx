import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { colors } from '../../constants/theme'

interface ActionLinkProps extends TouchableOpacityProps {
  children: React.ReactNode
  color?: string
}

export function ActionLink({ children, color = colors.primary, style, ...props }: ActionLinkProps) {
  return (
    <TouchableOpacity style={[{ alignSelf: 'flex-end' }, style]} {...props}>
      <Text style={{ color, fontSize: 14, fontWeight: '500' }}>{children}</Text>
    </TouchableOpacity>
  )
}
