import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function BooksItems({
  books,
  startIndex = 0,
  highlighted = false,
  showDetails = false,
}) {
  const booksToRender = books.slice(startIndex)

  const generateUniqueKey = (id, index) => {
    return `${id}-${startIndex + index}`
  }

  return (
    <View className="w-full flex-row flex-wrap justify-between">
      {booksToRender.map(({ id, title, image, authors, categories }, index) => {
        const uniqueKey = generateUniqueKey(id, index)
        return (
          <Link key={uniqueKey} href={`/book/${id}`} asChild>
            <Pressable
              key={uniqueKey}
              className="mb-6 w-[32%] items-center"
              accessible
              accessibilityRole="button"
              accessibilityLabel={`Ver detalles de ${title}`}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                  minWidth: 120,
                  minHeight: 240,
                  padding: 4,
                },
              ]}
            >
              <View
                style={styles.cardRecentLike}
                className="overflow-hidden rounded-lg border"
              >
                <Image
                  source={
                    image
                      ? { uri: image }
                      : require('../../assets/img/default-cover.webp')
                  }
                  className="mb-2 h-40 w-full rounded-lg"
                  accessibilityLabel={`Portada de ${title}`}
                  resizeMode="cover"
                />
                <Text
                  className="mb-1 text-sm font-semibold text-white"
                  numberOfLines={2}
                  accessibilityRole="header"
                >
                  {title}
                </Text>
                {authors && (
                  <Text
                    className="mb-1 text-xs text-zinc-400"
                    numberOfLines={1}
                  >
                    {Array.isArray(authors) ? authors.join(', ') : authors}
                  </Text>
                )}
                {showDetails && categories && categories.length > 0 && (
                  <Text
                    className="mb-1 text-xs text-zinc-500"
                    numberOfLines={1}
                  >
                    {categories.join(', ')}
                  </Text>
                )}
              </View>
            </Pressable>
          </Link>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4A90E2',
    marginBottom: 8,
    padding: 6,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 8,
    alignItems: 'center',
  },
  bookCardUnified: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#00fff7',
    marginBottom: 8,
    padding: 6,
    shadowColor: '#00fff7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
  },
  cardRecentLike: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#232946',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
    padding: 8,
    width: '100%',
    alignItems: 'flex-start',
  },
})
