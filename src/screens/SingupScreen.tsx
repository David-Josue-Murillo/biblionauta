import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { BiblionautaLogo } from "../components/LogoApp";
import { colors } from "../constants/theme";
import { GoogleIcon } from "../components/Icons";

const { width } = Dimensions.get("window");

export default function SignupScreen() {
	return (
		<SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
			<View className="flex-1 px-6">
				{/* Encabezado */}
				<View className="flex-1 justify-center items-center">
					<View className="items-center mb-10">
						<BiblionautaLogo size={40} />
						<Text
							className="text-base text-center mt-2 leading-6"
							style={{ color: colors.textSecondary }}
						>
							Tu biblioteca personal en el bolsillo
						</Text>
					</View>

					{/* Ilustración de bienvenida */}
					<View>
						<Image 
							source={require("../../assets/logoBiblionauta.png")}
							className="w-80 h-80"
						/>
					</View>

					{/* Texto de bienvenida */}
					<View className="items-center mb-15">
						<Text
							className="text-2xl font-bold text-center mb-3"
							style={{ color: colors.text }}
						>
							¡Bienvenido a Biblionauta!
						</Text>
						<Text
							className="text-base text-center leading-6 px-5"
							style={{ color: colors.textSecondary }}
						>
							Descubre, organiza y disfruta de tu colección de libros favoritos
						</Text>
					</View>
				</View>

				{/* Sección de inicio de sesión */}
				<View className="pb-10">
					<TouchableOpacity
						className="border rounded-xl py-4 px-6 flex-row items-center justify-center mb-4"
						style={{
							backgroundColor: colors.card,
							borderColor: colors.border,
						}}
						activeOpacity={0.8}
					>

						<>
							<GoogleIcon />
							<Text
								className="pl-2 text-lg font-semibold"
								style={{ color: colors.text }}
							>
								Continuar con Google
							</Text>
						</>
					</TouchableOpacity>

					<Text
						className="text-xs text-center leading-5"
						style={{ color: colors.textSecondary }}
					>
						Al continuar, aceptas nuestros{" "}
						<Text style={{ color: colors.primary }}>Términos de Servicio</Text>{" "}
						y{" "}
						<Text style={{ color: colors.primary }}>Política de Privacidad</Text>
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
