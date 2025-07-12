import { View, Text, Pressable } from 'react-native'

interface ErrorStateProps {
  error: string
  onGoBack: () => void
}

export function ErrorState({ error, onGoBack }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-900">
      <Text className="text-lg text-red-400">
        {error || 'Libro no encontrado'}
      </Text>
      <Pressable
        onPress={onGoBack}
        className="mt-4 rounded-lg border border-yellow-400 px-4 py-2"
      >
        <Text className="text-base text-white">Volver atrás</Text>
      </Pressable>
    </View>
  )
}
