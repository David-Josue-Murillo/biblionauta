import { View, Text } from "react-native";
import { COLORS } from '../../constants/colors';
import { stripHtmlTags } from '../../utils/book';
import type { Book } from '../../mocks/bookshelfData';

interface BookDetailsProps {
  book: Partial<Book>;
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
        borderColor: COLORS.border.muted
      }}
    >
      <DetailRow label="TÍTULO" value={book.title || ''} valueColor={COLORS.text.primary} />
      <DetailRow label="SUBTÍTULO" value={book.subtitle || ''} />
      <DetailRow label="AUTORES" value={book.authors?.join(", ") || ''} />
      <DetailRow label="IDIOMA" value={book.language || ''} />
      <DetailRow label="DESCRIPCIÓN" value={stripHtmlTags(book.description || '')} valueColor={COLORS.text.primary} />
      <DetailRow label="CATEGORÍAS" value={book.categories?.join(", ") || ''} valueColor={COLORS.accent.tertiary} />
    </View>
  );
} 