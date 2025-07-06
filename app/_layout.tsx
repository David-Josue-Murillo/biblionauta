import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BiblionautaLogo } from "../src/components/LogoApp";
import { StatusBar } from 'expo-status-bar';
import { colors } from "../src/constants/theme";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerShown: true,
        headerTitle: () => <BiblionautaLogo />,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false
      }} />
    </SafeAreaProvider>
  )
}
