import { View, Text, Pressable } from "react-native";

interface ErrorStateProps {
  error: string;
  onGoBack: () => void;
}

export function ErrorState({ error, onGoBack }: ErrorStateProps) {
  return (
    <View className="flex-1 bg-zinc-900 justify-center items-center">
      <Text className="text-red-400 text-lg">{error || 'Libro no encontrado'}</Text>
      <Pressable 
        onPress={onGoBack} 
        className="mt-4 border px-4 py-2 border-yellow-400 rounded-lg"
      >
        <Text className="text-white text-base">Volver atrás</Text>
      </Pressable>
    </View>
  );
} 