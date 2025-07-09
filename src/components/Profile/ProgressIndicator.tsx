import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';

interface ProgressIndicatorProps {
  isLoading: boolean;
  message?: string;
  size?: 'small' | 'large';
}

export function ProgressIndicator({ 
  isLoading, 
  message = 'Actualizando...', 
  size = 'small' 
}: ProgressIndicatorProps) {
  if (!isLoading) return null;

  return (
    <View className="absolute inset-0 bg-black bg-opacity-50 items-center justify-center z-50">
      <View 
        className="bg-zinc-800 rounded-xl p-6 items-center"
        style={{
          borderWidth: 1,
          borderColor: COLORS.border.muted,
        }}
      >
        <ActivityIndicator 
          size={size} 
          color={COLORS.accent.primary} 
          className="mb-3"
        />
        <Text className="text-white text-base font-medium">
          {message}
        </Text>
      </View>
    </View>
  );
}

interface InlineProgressIndicatorProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export function InlineProgressIndicator({ isLoading, children }: InlineProgressIndicatorProps) {
  return (
    <View className="relative">
      {children}
      {isLoading && (
        <View className="absolute inset-0 bg-black bg-opacity-30 items-center justify-center rounded-xl">
          <ActivityIndicator size="small" color={COLORS.accent.primary} />
        </View>
      )}
    </View>
  );
} 