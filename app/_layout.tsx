import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BiblionautaLogo } from "../src/components/LogoApp";
import { StatusBar } from 'expo-status-bar';
import { colors } from "../src/constants/theme";
import AuthWrapper from "../src/components/Auth/AuthWrapper";
import { AuthProvider } from "../src/contexts/AuthProvider";
import { UserBooksProvider } from '../src/contexts/UserBooksContext';

export default function RootLayout() {
  return (
    <UserBooksProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <AuthWrapper>
            <Stack screenOptions={{
              headerShown: true,
              headerTitle: () => <BiblionautaLogo />,
              headerStyle: { backgroundColor: colors.background },
              headerShadowVisible: false
            }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="auth" />
            </Stack>
          </AuthWrapper>
        </SafeAreaProvider>
      </AuthProvider>
    </UserBooksProvider>
  );
}
