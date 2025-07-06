import { View, Text, Pressable } from "react-native";

interface ActionButtonsProps {
  onAddToWishlist?: () => void;
  onAddToShelf?: () => void;
}

export function ActionButtons({ onAddToWishlist, onAddToShelf }: ActionButtonsProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around bg-zinc-950 border-t border-zinc-800 p-4">
      <Pressable 
        className="flex-1 mr-2 bg-[#232946] border-2 border-[#FFD700] rounded-xl py-3 items-center" 
        style={{ elevation: 4 }}
        onPress={onAddToWishlist}
      >
        <Text className="text-[#FFD700] font-bold">
          Añadir a la lista de deseos
        </Text>
      </Pressable>
      <Pressable 
        className="flex-1 ml-2 bg-[#FFD700] border-2 border-[#FFD700] rounded-xl py-3 items-center" 
        style={{ elevation: 4 }}
        onPress={onAddToShelf}
      >
        <Text className="text-[#232946] font-bold">
          Añadir a la estantería
        </Text>
      </Pressable>
    </View>
  );
} 