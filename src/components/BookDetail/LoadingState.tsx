import { View, Text } from 'react-native'

export function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-900">
      <Text className="text-lg text-white">Cargando libro...</Text>
    </View>
  )
}
