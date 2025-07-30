import { Text, TouchableOpacity } from 'react-native'
import { colors } from '../../constants/theme'

interface BotonSubmitProps {
  action: () => void
  text: string
}

export default function BotonSubmit({ action, text }: BotonSubmitProps) {
  return (
    <TouchableOpacity onPress={action}>
      <Text className="text-sm font-bold" style={{ color: colors.primary }}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}
