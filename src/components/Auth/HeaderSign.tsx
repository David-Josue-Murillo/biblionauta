import { Image, Text, View } from 'react-native'
import { colors } from '../../constants/theme'

export default function HeaderSign({ text, width = 64, hight = 64 }) {
  return (
    <View>
      <View className="items-center">
        <Text
          className="mt-8 text-center text-2xl font-semibold leading-6"
          style={{ color: colors.text }}
        >
          {text}
        </Text>
      </View>

      {/* Ilustración */}
      <View>
        <Image
          source={require('../../../assets/logoBiblionauta.png')}
          className={`w-${width} h-${hight} opacity-80`}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}
