import { View, Text, Image } from "react-native";
import { StarIcon } from '../Icons';
import { COLORS } from '../../constants/colors';

interface BookHeaderProps {
  book: {
    image: string;
  };
  style?: any;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export function BookHeader({ book, style, resizeMode = 'cover' }: BookHeaderProps) {
  return (
    <Image
      source={book.image ? { uri: book.image } : require('../../../assets/logoBiblionauta.png')}
      style={style}
      resizeMode={resizeMode}
      accessibilityLabel="Portada del libro"
    />
  );
} 