import { Pressable, Text } from 'react-native'

export const AddToWishlistButton = () => (
  <Pressable
    className="mr-2 flex-1 items-center rounded-xl border-2 border-[#FFD700] bg-[#232946] py-2"
    style={{ elevation: 4 }}
  >
    <Text className="text-center font-bold text-[#FFD700]">
      Añadir a la lista de deseos
    </Text>
  </Pressable>
)

export const AddToShelfButton = () => (
  <Pressable
    className="ml-2 flex-1 items-center rounded-xl border-2 border-[#FFD700] bg-[#FFD700] py-2"
    style={{ elevation: 4 }}
  >
    <Text className="text-center font-bold text-[#232946]">
      Añadir a la estantería
    </Text>
  </Pressable>
)
