import { View, ScrollView, Text, TextInput, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { router } from "expo-router";
import { COLORS } from "../../src/constants/colors";
import { useUserUpdate } from "../../src/hooks/useUserUpdate";
import { ValidationSchemas } from "../../src/utils/validationSchemas";

export default function ChangePasswordScreen() {
  const { updatePassword, isLoading } = useUserUpdate();
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar contraseña actual
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "La contraseña actual es requerida";
    }

    // Validar nueva contraseña
    const passwordValidation = ValidationSchemas.validatePassword(formData.newPassword);
    if (!passwordValidation.isValid) {
      newErrors.newPassword = passwordValidation.error!;
    }

    // Validar confirmación
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      const result = await updatePassword(formData.newPassword, formData.currentPassword);
      
      if (result.success) {
        router.back();
      }
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, color: COLORS.text.muted, text: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    const colors = [
      COLORS.text.muted,
      '#ef4444', // red
      '#f97316', // orange
      '#eab308', // yellow
      '#22c55e', // green
      '#16a34a'  // dark green
    ];

    const texts = ['', 'Muy débil', 'Débil', 'Media', 'Fuerte', 'Muy fuerte'];

    return {
      strength,
      color: colors[strength],
      text: texts[strength]
    };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: COLORS.background.primary }}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-4 border-b"
        style={{ borderColor: COLORS.border.muted }}
      >
        <Pressable
          onPress={handleCancel}
          className="p-2 rounded-lg"
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.background.tertiary : "transparent",
            },
          ]}
        >
          <Text className="text-white text-lg">Cancelar</Text>
        </Pressable>

        <Text className="text-xl font-bold text-white">Cambiar Contraseña</Text>

        <Pressable
          onPress={handleSave}
          disabled={isLoading}
          className="p-2 rounded-lg"
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.background.tertiary : "transparent",
              opacity: isLoading ? 0.5 : 1,
            },
          ]}
        >
          <Text 
            className="text-lg font-semibold"
            style={{ color: COLORS.accent.primary }}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-6">
          {/* Información */}
          <View className="mb-6">
            <View
              className="rounded-xl p-4"
              style={{
                backgroundColor: COLORS.background.secondary,
                borderWidth: 1,
                borderColor: COLORS.border.muted,
              }}
            >
              <Text className="text-zinc-400 text-sm leading-5">
                🔒 <Text className="text-white font-medium">Importante:</Text> Cambiar tu contraseña cerrará tu sesión en todos los dispositivos. Necesitarás iniciar sesión nuevamente.
              </Text>
            </View>
          </View>

          {/* Formulario */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <Text className="text-2xl mr-2">🔐</Text>
              <Text className="text-lg font-bold text-white">Nueva Contraseña</Text>
            </View>

            <View
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: COLORS.background.secondary,
                borderWidth: 1,
                borderColor: COLORS.border.muted,
              }}
            >
              {/* Contraseña actual */}
              <View className="px-4 py-3 border-b border-zinc-700">
                <Text className="text-zinc-400 text-sm mb-1">Contraseña actual</Text>
                <View className="flex-row items-center">
                  <TextInput
                    value={formData.currentPassword}
                    onChangeText={(text) => updateField("currentPassword", text)}
                    className="text-white text-base flex-1"
                    placeholder="Tu contraseña actual"
                    placeholderTextColor={COLORS.text.muted}
                    secureTextEntry={!showPasswords.current}
                    style={{
                      backgroundColor: "transparent",
                    }}
                  />
                  <Pressable
                    onPress={() => togglePasswordVisibility('current')}
                    className="p-2"
                  >
                    <Text className="text-zinc-400 text-lg">
                      {showPasswords.current ? "🙈" : "👁️"}
                    </Text>
                  </Pressable>
                </View>
                {errors.currentPassword && (
                  <Text className="text-red-400 text-xs mt-1">{errors.currentPassword}</Text>
                )}
              </View>

              {/* Nueva contraseña */}
              <View className="px-4 py-3 border-b border-zinc-700">
                <Text className="text-zinc-400 text-sm mb-1">Nueva contraseña</Text>
                <View className="flex-row items-center">
                  <TextInput
                    value={formData.newPassword}
                    onChangeText={(text) => updateField("newPassword", text)}
                    className="text-white text-base flex-1"
                    placeholder="Nueva contraseña"
                    placeholderTextColor={COLORS.text.muted}
                    secureTextEntry={!showPasswords.new}
                    style={{
                      backgroundColor: "transparent",
                    }}
                  />
                  <Pressable
                    onPress={() => togglePasswordVisibility('new')}
                    className="p-2"
                  >
                    <Text className="text-zinc-400 text-lg">
                      {showPasswords.new ? "🙈" : "👁️"}
                    </Text>
                  </Pressable>
                </View>
                {errors.newPassword && (
                  <Text className="text-red-400 text-xs mt-1">{errors.newPassword}</Text>
                )}
                
                {/* Indicador de fortaleza */}
                {formData.newPassword && (
                  <View className="mt-2">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-zinc-400 text-xs">Fortaleza:</Text>
                      <Text 
                        className="text-xs font-medium"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.text}
                      </Text>
                    </View>
                    <View className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                      <View 
                        className="h-full rounded-full"
                        style={{ 
                          backgroundColor: passwordStrength.color,
                          width: `${(passwordStrength.strength / 5) * 100}%`
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>

              {/* Confirmar contraseña */}
              <View className="px-4 py-3">
                <Text className="text-zinc-400 text-sm mb-1">Confirmar nueva contraseña</Text>
                <View className="flex-row items-center">
                  <TextInput
                    value={formData.confirmPassword}
                    onChangeText={(text) => updateField("confirmPassword", text)}
                    className="text-white text-base flex-1"
                    placeholder="Repite la nueva contraseña"
                    placeholderTextColor={COLORS.text.muted}
                    secureTextEntry={!showPasswords.confirm}
                    style={{
                      backgroundColor: "transparent",
                    }}
                  />
                  <Pressable
                    onPress={() => togglePasswordVisibility('confirm')}
                    className="p-2"
                  >
                    <Text className="text-zinc-400 text-lg">
                      {showPasswords.confirm ? "🙈" : "👁️"}
                    </Text>
                  </Pressable>
                </View>
                {errors.confirmPassword && (
                  <Text className="text-red-400 text-xs mt-1">{errors.confirmPassword}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Requisitos */}
          <View className="mb-8">
            <View className="flex-row items-center mb-3">
              <Text className="text-2xl mr-2">📋</Text>
              <Text className="text-lg font-bold text-white">Requisitos de Contraseña</Text>
            </View>

            <View
              className="rounded-xl p-4"
              style={{
                backgroundColor: COLORS.background.secondary,
                borderWidth: 1,
                borderColor: COLORS.border.muted,
              }}
            >
              <Text className="text-zinc-400 text-sm mb-2">Tu contraseña debe cumplir:</Text>
              <View className="space-y-1">
                {[
                  { text: "Al menos 8 caracteres", met: formData.newPassword.length >= 8 },
                  { text: "Al menos una letra minúscula", met: /[a-z]/.test(formData.newPassword) },
                  { text: "Al menos una letra mayúscula", met: /[A-Z]/.test(formData.newPassword) },
                  { text: "Al menos un número", met: /\d/.test(formData.newPassword) },
                  { text: "Al menos un carácter especial (@$!%*?&)", met: /[@$!%*?&]/.test(formData.newPassword) }
                ].map((requirement, index) => (
                  <View key={index} className="flex-row items-center">
                    <Text className={`text-sm mr-2 ${requirement.met ? 'text-green-400' : 'text-zinc-500'}`}>
                      {requirement.met ? '✅' : '⭕'}
                    </Text>
                    <Text className={`text-sm ${requirement.met ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {requirement.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 