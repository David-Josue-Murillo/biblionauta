import { useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'

interface CategoryChipsProps {
  categories?: string[]
  maxChips?: number
}

export function CategoryChips({
  categories = [],
  maxChips = 2,
}: CategoryChipsProps) {
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const extraCategories = categories.length - maxChips

  return (
    <>
      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
      >
        {categories.slice(0, maxChips).map((cat, idx) => (
          <View
            key={idx}
            style={{
              backgroundColor: '#FFD700',
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 3,
              marginRight: 6,
              marginBottom: 4,
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: 'bold', color: '#000000' }}
            >
              {cat}
            </Text>
          </View>
        ))}
        {extraCategories > 0 && (
          <TouchableOpacity
            onPress={() => setShowCategoriesModal(true)}
            style={{
              backgroundColor: '#9CA3AF',
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 3,
              marginRight: 6,
              marginBottom: 4,
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: 'bold', color: '#000000' }}
            >
              +{extraCategories}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal para mostrar todas las categorías */}
      <Modal visible={showCategoriesModal} transparent animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setShowCategoriesModal(false)}
        >
          <View
            style={{
              backgroundColor: '#1F2937',
              borderRadius: 18,
              padding: 20,
              maxWidth: '80%',
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Categorías
            </Text>
            {categories.map((cat, idx) => (
              <Text
                key={idx}
                style={{
                  color: '#D1D5DB',
                  fontSize: 14,
                  marginBottom: 4,
                }}
              >
                {cat}
              </Text>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}
