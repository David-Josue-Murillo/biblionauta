import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RecentBookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    coverURL: string;
    rating: number;
    readAt: Date;
  };
  onPress?: () => void;
}

export function RecentBookCard({ book, onPress }: RecentBookCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? "star" : "star-outline"}
        size={10}
        color={i < rating ? "#FFD700" : "#666"}
      />
    ));
  };

  return (
    <Pressable 
      onPress={onPress}
      className="w-32 mr-4"
    >
      <View className="relative">
        <Image
          source={{ uri: book.coverURL }}
          className="w-32 h-48 rounded-lg mb-2"
        />
        <View className="absolute top-2 right-2 bg-black/50 rounded-full px-2 py-1">
          <Text className="text-white text-xs font-medium">
            {book.rating}/5
          </Text>
        </View>
      </View>
      
      <Text className="text-white font-semibold text-sm mb-1" numberOfLines={2}>
        {book.title}
      </Text>
      <Text className="text-zinc-400 text-xs mb-2" numberOfLines={1}>
        {book.author}
      </Text>
      <View className="flex-row items-center mb-1">
        {renderStars(book.rating)}
      </View>
      <Text className="text-zinc-500 text-xs">
        {formatDate(book.readAt)}
      </Text>
    </Pressable>
  );
} 