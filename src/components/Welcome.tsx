import { Text, View, AccessibilityRole } from "react-native";


export default function Welcome() {
  return (
    <View className='px-4 my-4' accessible accessibilityRole="header" accessibilityLabel="Bienvenida Biblionauta">
      <View
        className='rounded-2xl p-4 shadow-lg relative border-2'
        style={{
          backgroundColor: '#232946',
          borderColor: '#00fff7',
          shadowColor: '#00fff7',
          shadowOpacity: 0.7,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 0 },
          elevation: 12,
        }}
      >
        <Text className='text-2xl font-extrabold text-white text-center mb-1' style={{ letterSpacing: 1, fontSize: 22 }}>
          📚 ¡Bienvenido a <Text className='text-amber-300'>Biblionauta</Text>! 🚀
        </Text>
        <Text className='text-sm text-zinc-100 text-center font-semibold mb-1' style={{ fontSize: 16 }}>
          <Text className='text-pink-300'>Explora</Text> los libros más <Text className='text-amber-300'>populares</Text> y <Text className='text-indigo-300'>recomendados</Text> para ti.
        </Text>
        <Text className='text-xs text-zinc-200 text-center' style={{ fontSize: 14 }}>
          Sumérgete en nuevas historias, encuentra tu próxima lectura favorita y deja que la aventura comience hoy. ✨
        </Text>
      </View>
    </View>
  )
}
