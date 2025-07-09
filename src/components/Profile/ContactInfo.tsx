import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

interface ContactInfoProps {
  email: string;
  phoneNumber?: string;
  website?: string;
}

export function ContactInfo({ email, phoneNumber, website }: ContactInfoProps) {
  return (
    <View 
      className="rounded-2xl p-4"
      style={{ backgroundColor: COLORS.background.secondary }}
    >
      <View className="flex-row items-center mb-3">
        <View 
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: COLORS.accent.primary + '20' }}
        >
          <Ionicons name="mail" size={20} color={COLORS.accent.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-white font-medium">Email</Text>
          <Text className="text-zinc-400 text-sm">{email}</Text>
        </View>
        <Pressable>
          <Ionicons name="copy-outline" size={20} color={COLORS.accent.primary} />
        </Pressable>
      </View>
      
      {phoneNumber && (
        <View className="flex-row items-center mb-3">
          <View 
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#4ECDC4' + '20' }}
          >
            <Ionicons name="call" size={20} color="#4ECDC4" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-medium">Teléfono</Text>
            <Text className="text-zinc-400 text-sm">{phoneNumber}</Text>
          </View>
          <Pressable>
            <Ionicons name="copy-outline" size={20} color="#4ECDC4" />
          </Pressable>
        </View>
      )}
      
      {website && (
        <View className="flex-row items-center">
          <View 
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#FF6B6B' + '20' }}
          >
            <Ionicons name="globe" size={20} color="#FF6B6B" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-medium">Sitio web</Text>
            <Text className="text-zinc-400 text-sm">{website}</Text>
          </View>
          <Pressable>
            <Ionicons name="open-outline" size={20} color="#FF6B6B" />
          </Pressable>
        </View>
      )}
    </View>
  );
} 