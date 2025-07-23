import { Pressable, Text } from 'react-native'

interface NewCollectionButtonProps {
  onPress?: () => void
}

// Botón para crear nueva colección
export function NewCollectionButton({ onPress }: NewCollectionButtonProps) {
  return (
    <Pressable
      className="mr-4 min-w-[160px] items-center justify-center rounded-xl border-2 border-dashed border-zinc-600 p-4"
      onPress={onPress}
      accessible
      accessibilityLabel="Crear nueva colección"
      accessibilityHint="Toca para crear una nueva colección personalizada"
    >
      <Text className="mb-2 text-4xl">+</Text>
      <Text className="text-center text-sm text-zinc-400">Nueva colección</Text>
    </Pressable>
  )
}
