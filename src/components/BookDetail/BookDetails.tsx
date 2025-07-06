import { View, Text } from "react-native";
import { COLORS } from '../../constants/colors';

interface BookDetailsProps {
  book: {
    title: string;
    subtitle: string;
    authors: string[];
    language: string;
    description: string;
    categories: string[];
  };
}

interface DetailRowProps {
  label: string;
  value: string;
  valueColor?: string;
}

function DetailRow({ label, value, valueColor = COLORS.text.secondary }: DetailRowProps) {
  return (
    <View className="mb-2">
      <Text className="text-xs text-zinc-400 mb-1">{label}</Text>
      <Text className="text-base mb-2" style={{ color: valueColor }}>
        {value}
      </Text>
    </View>
  );
}

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <View 
      className="mx-4 rounded-2xl p-4 mt-6" 
      style={{ 
        backgroundColor: COLORS.background.secondary, 
        borderWidth: 1, 
        borderColor: COLORS.border.primary 
      }}
    >
      <DetailRow label="TÍTULO" value={book.title} valueColor={COLORS.text.primary} />
      <DetailRow label="SUBTÍTULO" value={book.subtitle} />
      <DetailRow label="AUTORES" value={book.authors.join(", ")} />
      <DetailRow label="IDIOMA" value={book.language} />
      <DetailRow label="DESCRIPCIÓN" value={book.description} valueColor={COLORS.text.primary} />
      <DetailRow label="CATEGORÍAS" value={book.categories.join(", ")} valueColor={COLORS.accent.tertiary} />
    </View>
  );
} 