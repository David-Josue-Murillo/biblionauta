import { TouchableOpacity, Text } from "react-native";
import { colors } from "../../constants/theme";

export default function BotonSubmit({action, text}) {
	return (
		<TouchableOpacity onPress={action}>
			<Text
				className="text-sm font-bold"
				style={{ color: colors.primary }}
			>
				{text}
			</Text>
		</TouchableOpacity>
	)
}
