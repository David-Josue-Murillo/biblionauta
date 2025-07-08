import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BiblionautaLogo } from "../src/components/LogoApp";
import { StatusBar } from 'expo-status-bar';
import { colors } from "../src/constants/theme";
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { Roboto_900Black_Italic } from '@expo-google-fonts/roboto/900Black_Italic';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

export default function Layout() {
  const [fontsLoaded] = useFonts({ Roboto_900Black_Italic });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return console.log('No funcionas');

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
  );
}
