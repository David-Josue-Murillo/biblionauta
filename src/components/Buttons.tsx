import { Pressable, Text } from "react-native";

export const AddToWishlistButton = () => (
	<Pressable className="flex-1 mr-2 bg-[#232946] border-2 border-[#FFD700] rounded-xl py-2 items-center" style={{ elevation: 4 }}>
		<Text className="text-[#FFD700] font-bold text-center">Añadir a la lista de deseos</Text>
	</Pressable>
)

export const AddToShelfButton = () => (
	<Pressable className="flex-1 ml-2 bg-[#FFD700] border-2 border-[#FFD700] rounded-xl py-2 items-center" style={{ elevation: 4 }}>
		<Text className="text-[#232946] font-bold text-center">Añadir a la estantería</Text>
	</Pressable>
)