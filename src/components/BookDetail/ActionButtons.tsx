import { View, Text, Pressable } from 'react-native'

interface ActionButtonsProps {
  onAddToWishlist?: () => void
  onAddToShelf?: () => void
}

export function ActionButtons({
  onAddToWishlist,
  onAddToShelf,
}: ActionButtonsProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around border-t border-zinc-800 bg-zinc-950 p-4">
      <Pressable
        className="mr-2 flex-1 items-center rounded-xl border-2 border-[#FFD700] bg-[#232946] py-3"
        style={{ elevation: 4 }}
        onPress={onAddToWishlist}
      >
        <Text className="font-bold text-[#FFD700]">
          Añadir a la lista de deseos
        </Text>
      </Pressable>
      <Pressable
        className="ml-2 flex-1 items-center rounded-xl border-2 border-[#FFD700] bg-[#FFD700] py-3"
        style={{ elevation: 4 }}
        onPress={onAddToShelf}
      >
        <Text className="font-bold text-[#232946]">Añadir a la estantería</Text>
      </Pressable>
    </View>
  )
}
