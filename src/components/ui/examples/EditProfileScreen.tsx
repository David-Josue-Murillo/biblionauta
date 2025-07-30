import { ScrollView, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { COLORS } from '../../../constants/colors'
import { HeaderBar, SectionCard, SwitchRow, InfoCard } from '../index'

export function EditProfileScreen() {
  const handleCancel = () => {
    router.back()
  }

  const handleSave = () => {
    // Lógica para guardar perfil
    router.back()
  }

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background.primary }}>
      <StatusBar style="light" />

      <HeaderBar
        title="Editar Perfil"
        leftButton={{
          text: 'Cancelar',
          onPress: handleCancel,
        }}
        rightButton={{
          text: 'Guardar',
          onPress: handleSave,
          variant: 'primary',
        }}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-6">
          <SectionCard icon="👤" title="Información Personal">
            {/* Aquí irían los campos de entrada */}
            <View className="px-4 py-4">
              <Text className="text-white">Campos de entrada aquí...</Text>
            </View>
          </SectionCard>

          <SectionCard icon="🔔" title="Notificaciones">
            <SwitchRow
              title="Notificaciones push"
              description="Recibir notificaciones en el dispositivo"
              value={true}
              onValueChange={() => {}}
            />
            <SwitchRow
              title="Notificaciones por email"
              description="Recibir notificaciones por correo electrónico"
              value={false}
              onValueChange={() => {}}
              isLast={true}
            />
          </SectionCard>

          <SectionCard icon="🔒" title="Privacidad">
            <SwitchRow
              title="Perfil público"
              description="Permitir que otros usuarios vean tu perfil"
              value={true}
              onValueChange={() => {}}
              isLast={true}
            />
          </SectionCard>
        </View>

        <View className="mx-4 mb-8">
          <InfoCard variant="filled">
            <Text className="text-sm leading-5 text-zinc-400">
              💡 <Text className="font-medium text-white">Consejo:</Text> Los cambios en tu perfil
              se reflejarán inmediatamente.
            </Text>
          </InfoCard>
        </View>
      </ScrollView>
    </View>
  )
}
