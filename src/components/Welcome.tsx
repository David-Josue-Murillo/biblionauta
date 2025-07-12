import { Text, View } from 'react-native'

export default function Welcome() {
  return (
    <View
      className="my-4 px-4"
      accessible
      accessibilityRole="header"
      accessibilityLabel="Bienvenida Biblionauta"
    >
      <View
        className="relative rounded-2xl border-2 p-4 shadow-lg"
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
        <Text
          className="mb-1 text-center text-2xl font-extrabold text-white"
          style={{ letterSpacing: 1, fontSize: 22 }}
        >
          📚 ¡Bienvenido a <Text className="text-amber-300">Biblionauta</Text>!
          🚀
        </Text>
        <Text
          className="mb-1 text-center text-sm font-semibold text-zinc-100"
          style={{ fontSize: 16 }}
        >
          <Text className="text-pink-300">Explora</Text> los libros más{' '}
          <Text className="text-amber-300">populares</Text> y{' '}
          <Text className="text-indigo-300">recomendados</Text> para ti.
        </Text>
        <Text
          className="text-center text-xs text-zinc-200"
          style={{ fontSize: 14 }}
        >
          Sumérgete en nuevas historias, encuentra tu próxima lectura favorita y
          deja que la aventura comience hoy. ✨
        </Text>
      </View>
    </View>
  )
}
