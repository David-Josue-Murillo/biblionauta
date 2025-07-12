import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { COLORS } from '../constants/colors'

export default function CarourselBook({ books }) {
  // Selecciona los primeros 8 libros como destacados
  const featuredBooks = books?.slice(0, 8) || []
  return (
    <View className="my-4">
      <Text className="mb-1 pl-4 text-2xl font-bold text-white">
        Recomendado para ti
      </Text>
      <Text className="mb-2 pl-4 text-base text-zinc-300">
        Creemos que estos libros pueden gustarte
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pl-4"
      >
        {featuredBooks.map(({ id, image, title, authors, description }) => (
          <Link key={id} href={`/book/${id}`} asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Ver detalles de ${title}`}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                  minWidth: 220,
                  minHeight: 240,
                },
              ]}
            >
              <View
                className="mr-4 flex h-80 w-56 flex-col items-center rounded-2xl border-2 p-3 shadow-lg"
                style={{
                  elevation: 6,
                  borderColor: COLORS.border.secondary,
                  backgroundColor: '#18181b',
                  shadowColor: '#00fff7',
                  shadowOpacity: 0.4,
                }}
              >
                <Image
                  source={{ uri: image }}
                  className="mb-2 h-44 w-32 rounded-xl"
                  resizeMode="cover"
                  accessibilityLabel={`Portada de ${title}`}
                />
                <Text
                  className="text-center text-base font-bold text-white"
                  numberOfLines={2}
                  style={{ fontSize: 18, marginBottom: 2 }}
                >
                  {title}
                </Text>
                {authors && (
                  <Text
                    className="mb-1 text-center text-xs text-zinc-300"
                    numberOfLines={1}
                    style={{ fontSize: 14 }}
                  >
                    {authors.join(', ')}
                  </Text>
                )}
                {description && (
                  <Text
                    className="text-center text-xs text-zinc-400"
                    numberOfLines={2}
                    style={{ fontSize: 13 }}
                  >
                    {description}
                  </Text>
                )}
              </View>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  )
}
