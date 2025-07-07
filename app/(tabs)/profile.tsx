import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../src/constants/colors";
import { userData, menuItems } from "../../src/mocks/profileData";
import { UserHeader } from "../../src/components/Profile/UserHeader";
import { MenuSection } from "../../src/components/Profile/MenuSection";
import { LogoutButton } from "../../src/components/Profile/LogoutButton";

export default function ProfileScreen() {
  return (
    <View
      className="flex-1"
      style={{ backgroundColor: COLORS.background.primary }}
    >
      <StatusBar style="light" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <UserHeader userData={userData} />

        {/* Menú de opciones */}
        <View className="mx-4 mb-8">
          {menuItems.map((section) => (
            <MenuSection key={section.id} section={section} />
          ))}
        </View>

        <LogoutButton />
      </ScrollView>
    </View>
  );
}
