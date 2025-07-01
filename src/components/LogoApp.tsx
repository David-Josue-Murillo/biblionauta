import { Text } from "react-native";

export function BiblionautaLogo({ size = 28 }) {
  return (
    <Text
      style={{
        fontSize: size,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "#fff",
        fontFamily: "serif",
      }}
      accessibilityRole="header"
      accessible
    >
      Biblio
      <Text style={{ color: "#FFD700" }}>nauta</Text>
    </Text>
  );
}