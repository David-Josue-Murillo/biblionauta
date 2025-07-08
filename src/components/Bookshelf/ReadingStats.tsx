import { View, Text, Pressable } from "react-native";
import { COLORS } from '../../constants/colors';
import { ReadingStats as ReadingStatsData } from '../../mocks/bookshelfData';

interface ReadingStatsProps {
  stats: ReadingStatsData;
  onPress?: () => void;
}

export function ReadingStats({ stats, onPress }: ReadingStatsProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString('es-ES');
  };

  const getProgressPercentage = () => {
    return Math.round((stats.goalProgress / stats.readingGoal) * 100);
  };

  return (
    <Pressable
      className="mx-4 mb-6 rounded-2xl p-6"
      style={{ 
        backgroundColor: COLORS.background.secondary, 
        borderWidth: 1, 
        borderColor: COLORS.border.primary 
      }}
      onPress={onPress}
      accessible
      accessibilityLabel="Estadísticas de lectura"
      accessibilityHint="Toca para ver estadísticas detalladas"
    >
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-white">📊 Estadísticas</Text>
        <Text className="text-zinc-400 text-sm">Ver más</Text>
      </View>

      {/* Progreso del objetivo anual */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-zinc-300 text-sm">Objetivo anual</Text>
          <Text className="text-white font-semibold">
            {stats.goalProgress}/{stats.readingGoal} libros
          </Text>
        </View>
        <View className="h-2 bg-zinc-700 rounded-full overflow-hidden">
          <View 
            className="h-full rounded-full"
            style={{ 
              backgroundColor: COLORS.accent.primary,
              width: `${getProgressPercentage()}%`
            }}
          />
        </View>
        <Text className="text-zinc-400 text-xs mt-1">
          {getProgressPercentage()}% completado
        </Text>
      </View>

      {/* Estadísticas principales */}
      <View className="flex-row justify-between">
        <View className="items-center flex-1">
          <Text className="text-2xl font-bold text-white">{formatNumber(stats.totalBooks)}</Text>
          <Text className="text-zinc-400 text-xs text-center">Total libros</Text>
        </View>
        <View className="items-center flex-1">
          <Text className="text-2xl font-bold text-white">{formatNumber(stats.totalPages)}</Text>
          <Text className="text-zinc-400 text-xs text-center">Páginas leídas</Text>
        </View>
        <View className="items-center flex-1">
          <Text className="text-2xl font-bold text-white">{stats.readingStreak}</Text>
          <Text className="text-zinc-400 text-xs text-center">Días seguidos</Text>
        </View>
      </View>

      {/* Estadísticas del mes */}
      <View className="mt-4 pt-4 border-t border-zinc-700">
        <Text className="text-zinc-300 text-sm mb-2">Este mes:</Text>
        <View className="flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-lg font-bold text-white">{stats.booksThisMonth}</Text>
            <Text className="text-zinc-400 text-xs">Libros</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-lg font-bold text-white">{formatNumber(stats.pagesThisMonth)}</Text>
            <Text className="text-zinc-400 text-xs">Páginas</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-lg font-bold text-white">{stats.averageRating.toFixed(1)}</Text>
            <Text className="text-zinc-400 text-xs">Promedio</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
} 