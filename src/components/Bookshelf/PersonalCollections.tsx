import { ScrollView, View } from 'react-native'
import { PersonalCollectionsHeader } from '../bookshelf/PersonalCollectionsHeader'
import { CollectionCard } from '../bookshelf/CollectionCard'
import { NewCollectionButton } from '../bookshelf/NewCollectionButton'

export interface Collection {
  id: string
  name: string
  description: string
  bookCount: number
  color: string
}

interface PersonalCollectionsProps {
  collections: Collection[]
  onPress?: () => void
  onCollectionPress?: (collectionId: string) => void
}

export function PersonalCollections({
  collections,
  onPress,
  onCollectionPress,
}: PersonalCollectionsProps) {
  if (collections.length === 0) return null

  return (
    <View className="mx-4 mb-6">
      <PersonalCollectionsHeader onPress={onPress} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {collections.map(collection => (
          <CollectionCard
            key={collection.id}
            id={collection.id}
            name={collection.name}
            description={collection.description}
            bookCount={collection.bookCount}
            color={collection.color}
            onPress={onCollectionPress}
          />
        ))}
        <NewCollectionButton onPress={onPress} />
      </ScrollView>
    </View>
  )
}
