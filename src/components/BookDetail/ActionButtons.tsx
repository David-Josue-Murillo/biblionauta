import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'

interface ActionButtonsProps {
  isFavorite: boolean
  isTogglingFavorite: boolean
  onAddToWishlist: () => void
  onAddToShelf: () => void
}

export function ActionButtons({
  isFavorite,
  isTogglingFavorite,
  onAddToWishlist,
  onAddToShelf,
}: ActionButtonsProps) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 14,
        backgroundColor: 'rgba(20,20,30,0.98)',
        padding: 18,
        marginLeft: 12,
        marginRight: 12,
      }}
    >
      <Pressable
        onPress={onAddToWishlist}
        style={({ pressed }) => [
          {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
            paddingVertical: 14,
            backgroundColor: isFavorite
              ? isTogglingFavorite
                ? '#06B6D4'
                : '#FFD700'
              : pressed
                ? '#06B6D4'
                : '#FFD700',
            marginRight: 8,
            minHeight: 48,
            opacity: isTogglingFavorite ? 0.7 : 1,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        <Ionicons
          name={
            isFavorite
              ? isTogglingFavorite
                ? 'heart-dislike'
                : 'heart'
              : isTogglingFavorite
                ? 'heart'
                : 'heart-outline'
          }
          size={22}
          color={COLORS.accent.primary}
          style={{
            marginRight: 8,
            alignSelf: 'center',
            transform: [{ scale: isTogglingFavorite ? 1.2 : 1 }],
          }}
        />
        <Text
          style={{
            color: COLORS.text.primary,
            fontWeight: 'bold',
            fontSize: 16,
            textAlignVertical: 'center',
            opacity: isTogglingFavorite ? 0.7 : 1,
          }}
        >
          {isFavorite
            ? isTogglingFavorite
              ? 'Quitando...'
              : 'En Favorito'
            : isTogglingFavorite
              ? 'Agregando...'
              : 'Agregar a favorito'}
        </Text>
      </Pressable>

      <Pressable
        onPress={onAddToShelf}
        style={({ pressed }) => [
          {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
            paddingVertical: 14,
            backgroundColor: pressed ? '#06B6D4' : '#10B981',
            marginLeft: 8,
            minHeight: 48,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Añadir a estantería"
      >
        <Ionicons
          name="library"
          size={20}
          color={COLORS.accent.primary}
          style={{ marginRight: 8, alignSelf: 'center' }}
        />
        <Text
          style={{
            color: COLORS.text.primary,
            fontWeight: 'bold',
            fontSize: 16,
            textAlignVertical: 'center',
          }}
        >
          A estantería
        </Text>
      </Pressable>
    </View>
  )
}
