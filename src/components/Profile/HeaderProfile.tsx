import { Image, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { EditProfileButton } from "./EditProfileButton";

export default function HeaderProfile({profile}) {
	return (
		<View>
			{/* Banner de fondo con gradiente */}
			<View className="h-60 w-full">
				<View
					className="absolute inset-0"
					style={{ backgroundColor: COLORS.background.primary }}
				/>
			</View>

			{/* Información del perfil */}
			<View className="absolute bottom-0 left-0 right-0 px-4 pb-8">
				<View className="flex-row items-center">
					{/* Foto de perfil */}
					<View>
						<Image
							source={require('../../../assets/img/avatar.webp')}
							className="w-28 h-28 rounded-full border-4"
						/>
						<View
							className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full items-center justify-center shadow-lg"
							style={{
								backgroundColor: COLORS.accent.primary,
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.25,
								shadowRadius: 4,
								elevation: 5
							}}
						>
							<Ionicons name="camera" size={18} color="white" />
						</View>
					</View>

					<View className="flex-1 ml-5">
						<Text className="text-3xl font-bold text-white mb-2 shadow-sm">
							{profile.displayName}
						</Text>
						<View className="flex-row items-center mb-3">
							<View
								className="px-3 py-1 rounded-full mr-3"
								style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
							>
								<Text className="text-white font-medium text-sm">
									Miembro desde {profile.memberSince}
								</Text>
							</View>
						</View>
						<View className="flex-row items-center mb-4">
							<View
								className="w-8 h-8 rounded-full items-center justify-center mr-2"
								style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
							>
								<Ionicons name="location" size={16} color="white" />
							</View>
							<Text className="text-white font-medium text-base">
								{profile.location}
							</Text>
						</View>
						<EditProfileButton onPress={() => { }} />
					</View>
				</View>
			</View>
		</View>
  )
}
