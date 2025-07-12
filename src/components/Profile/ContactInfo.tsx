import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'

interface ContactInfoProps {
  email: string
  phoneNumber?: string
  website?: string
}

export function ContactInfo({ email, phoneNumber, website }: ContactInfoProps) {
  return (
    <View
      className="rounded-2xl p-4"
      style={{ backgroundColor: COLORS.background.secondary }}
    >
      <View className="mb-3 flex-row items-center">
        <View
          className="mr-3 h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: COLORS.accent.primary + '20' }}
        >
          <Ionicons name="mail" size={20} color={COLORS.accent.primary} />
        </View>
        <View className="flex-1">
          <Text className="font-medium text-white">Email</Text>
          <Text className="text-sm text-zinc-400">{email}</Text>
        </View>
        <Pressable>
          <Ionicons
            name="copy-outline"
            size={20}
            color={COLORS.accent.primary}
          />
        </Pressable>
      </View>

      {phoneNumber && (
        <View className="mb-3 flex-row items-center">
          <View
            className="mr-3 h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: '#4ECDC4' + '20' }}
          >
            <Ionicons name="call" size={20} color="#4ECDC4" />
          </View>
          <View className="flex-1">
            <Text className="font-medium text-white">Teléfono</Text>
            <Text className="text-sm text-zinc-400">{phoneNumber}</Text>
          </View>
          <Pressable>
            <Ionicons name="copy-outline" size={20} color="#4ECDC4" />
          </Pressable>
        </View>
      )}

      {website && (
        <View className="flex-row items-center">
          <View
            className="mr-3 h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: '#FF6B6B' + '20' }}
          >
            <Ionicons name="globe" size={20} color="#FF6B6B" />
          </View>
          <View className="flex-1">
            <Text className="font-medium text-white">Sitio web</Text>
            <Text className="text-sm text-zinc-400">{website}</Text>
          </View>
          <Pressable>
            <Ionicons name="open-outline" size={20} color="#FF6B6B" />
          </Pressable>
        </View>
      )}
    </View>
  )
}
