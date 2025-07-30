import { Image, Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { EditProfileButton } from './EditProfileButton'

export default function HeaderProfile({ profile }) {
  return (
    <View>
      {/* Banner de fondo con gradiente */}
      <View className="h-60 w-full">
        <View
          className="absolute inset-0"
          style={{ backgroundColor: COLORS.background.primary }}
        />
      </View>

      {/* Información del perfil */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-8">
        <View className="flex-row items-center">
          {/* Foto de perfil */}
          <View>
            <Image
              source={require('../../../assets/img/avatar.webp')}
              className="h-28 w-28 rounded-full border-4"
            />
            <View
              className="absolute -bottom-1 -right-1 h-10 w-10 items-center justify-center rounded-full shadow-lg"
              style={{
                backgroundColor: COLORS.accent.primary,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Ionicons name="camera" size={18} color="white" />
            </View>
          </View>

          <View className="ml-5 flex-1">
            <Text className="mb-2 text-3xl font-bold text-white shadow-sm">
              {profile.displayName}
            </Text>
            <View className="mb-3 flex-row items-center">
              <View
                className="mr-3 rounded-full px-3 py-1"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Text className="text-sm font-medium text-white">
                  Miembro desde {profile.memberSince}
                </Text>
              </View>
            </View>
            <View className="mb-4 flex-row items-center">
              <View
                className="mr-2 h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Ionicons name="location" size={16} color="white" />
              </View>
              <Text className="text-base font-medium text-white">
                {profile.location}
              </Text>
            </View>
            <EditProfileButton onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  )
}
