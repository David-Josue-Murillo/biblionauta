import { View, Text, Image } from "react-native";
import { StarIcon } from '../Icons';
import { COLORS } from '../../constants/colors';

interface BookHeaderProps {
  book: {
    title: string;
    authors: string[];
    rating: number;
    ratingsCount: number;
    categories: string[];
    image: string;
  };
}

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon 
        key={i} 
        color={i <= Math.round(rating) ? COLORS.accent.primary : '#444'} 
        size={22} 
        style={{ marginRight: 2 }} 
      />
    );
  }
  return stars;
}

export function BookHeader({ book }: BookHeaderProps) {
  return (
    <View className="flex-row items-start mt-8 mx-4 gap-x-4">
      <Image
        source={book.image ? { uri: book.image } : require('../../../assets/logoBiblionauta.png')}
        className="w-28 h-40 rounded-lg shadow-lg"
        style={{ borderWidth: 2, borderColor: COLORS.border.primary }}
      />
      <View className="flex-1 justify-start">
        <Text className="text-xl font-extrabold text-white mb-1">
          {book.title}
        </Text>
        <Text className="text-base text-zinc-300 mb-1">
          {book.authors.join(", ")}
        </Text>
        <View className="flex-row items-center mb-1">
          {renderStars(book.rating)}
          <Text className="text-zinc-300 ml-2 text-sm">
            ({book.ratingsCount})
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-x-2 mt-1">
          {book.categories.map((category) => (
            <Text 
              key={category} 
              className="text-xs bg-pink-300/20 text-pink-300 px-2 py-1 rounded-full mr-1 mt-1"
            >
              {category}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
} 