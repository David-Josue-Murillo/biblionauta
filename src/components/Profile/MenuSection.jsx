import { View, Text, Pressable, Switch } from "react-native";
import { COLORS } from "../../constants/colors";

export function MenuSection({ section }) {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-3">
        <Text className="text-2xl mr-2">{section.icon}</Text>
        <Text className="text-lg font-bold text-white">{section.title}</Text>
      </View>

      <View
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: COLORS.background.secondary,
          borderWidth: 1,
          borderColor: COLORS.border.muted,
        }}
      >
        {section.items.map((item, index) => (
          <Pressable
            key={item.id}
            className={`flex-row items-center justify-between px-4 py-3 ${
              index !== section.items.length - 1
                ? "border-b border-zinc-700"
                : ""
            }`}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? COLORS.background.tertiary
                  : "transparent",
              },
            ]}
          >
            <View className="flex-row items-center flex-1">
              <Text className="text-lg mr-3">{item.icon}</Text>
              <Text className="text-white text-base">{item.label}</Text>
            </View>

            {item.hasToggle ? (
              <Switch
                value={item.id === "dark-mode" ? true : false}
                trackColor={{
                  false: COLORS.background.tertiary,
                  true: COLORS.accent.primary,
                }}
                thumbColor={COLORS.text.primary}
              />
            ) : item.value ? (
              <View className="flex-row items-center">
                <Text className="text-zinc-400 text-sm mr-2">{item.value}</Text>
                <Text className="text-zinc-500">›</Text>
              </View>
            ) : (
              <Text className="text-zinc-500 text-lg">›</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
