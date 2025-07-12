import { Image, Text, View } from 'react-native'

export function BiblionautaLogo({ size = 28 }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text
        style={{
          fontSize: size,
          fontWeight: 'bold',
          letterSpacing: 1,
          color: '#fff',
          fontFamily: 'serif',
        }}
        accessibilityRole="header"
        accessible
      >
        Biblio
        <Text style={{ color: '#FFD700' }}>nauta</Text>
      </Text>

      <Image
        source={require('../../assets/logoBiblionauta.png')}
        style={{ width: 70, height: 70 }}
        accessibilityLabel="Logo de Biblionauta"
      />
    </View>
  )
}
