import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export function LogoutButton() {
  const { signOut, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mx-4 mb-8">
      <Pressable
        className="bg-red-600/20 border border-red-500 rounded-xl py-4 items-center"
        style={({ pressed }) => [
          { backgroundColor: pressed ? "#dc2626" : "rgba(220, 38, 38, 0.2)" },
        ]}
        onPress={handleLogout}
        disabled={isLoading || loading}
        accessibilityRole="button"
        accessibilityLabel="Cerrar sesión"
      >
        {isLoading || loading ? (
          <ActivityIndicator color="#dc2626" />
        ) : (
          <Text className="text-red-400 font-semibold text-base">
            Cerrar sesión
          </Text>
        )}
      </Pressable>
    </View>
  );
}
