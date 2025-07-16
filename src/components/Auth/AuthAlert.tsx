import { View, Text } from 'react-native'
import { AUTH_ALERT_CONFIG } from '../../constants/authAlertConfig'
import { useAuthAlert } from '../../hooks/useAuthAlert'
import { AlertContainer } from '../ui/AlertContainer'
import { IconButton } from '../ui/IconButton'
import { AuthAlertProps } from '../../types/authAlert'

export const AuthAlert: React.FC<AuthAlertProps> = ({
  visible,
  message,
  type = 'error',
  onClose,
  autoHide = true,
  duration = 4000,
}) => {
  const { fadeAnim, slideAnim, hideAlert } = useAuthAlert({
    visible,
    autoHide,
    duration,
    onClose,
  })

  const alertColors = AUTH_ALERT_CONFIG[type]

  if (!visible) return null

  return (
    <AlertContainer fadeAnim={fadeAnim} slideAnim={slideAnim}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 16,
          padding: 16,
          backgroundColor: alertColors.background,
          borderWidth: 1,
          borderColor: alertColors.border,
          shadowColor: alertColors.border,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 12, fontSize: 18 }}>{alertColors.icon}</Text>
          <Text
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: '500',
              color: alertColors.text,
            }}
          >
            {message}
          </Text>
        </View>
        {!autoHide && onClose && (
          <IconButton
            icon="×"
            onPress={hideAlert}
            size={22}
            color={alertColors.text}
            style={{ marginLeft: 12 }}
            accessibilityLabel="Cerrar alerta"
          />
        )}
      </View>
    </AlertContainer>
  )
}
