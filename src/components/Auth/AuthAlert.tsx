import { useEffect, useRef } from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import { colors } from '../../constants/theme'

interface AuthAlertProps {
  visible: boolean
  message: string
  type?: 'error' | 'success' | 'warning'
  onClose?: () => void
  autoHide?: boolean
  duration?: number
}

export const AuthAlert: React.FC<AuthAlertProps> = ({
  visible,
  message,
  type = 'error',
  onClose,
  autoHide = true,
  duration = 4000
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    if (visible) {
      // Animación de entrada
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()

      // Auto-hide después del tiempo especificado
      if (autoHide) {
        const timer = setTimeout(() => {
          hideAlert()
        }, duration)

        return () => clearTimeout(timer)
      }
    } else {
      hideAlert()
    }
  }, [visible])

  const hideAlert = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.()
    })
  }

  const getAlertColors = () => {
    switch (type) {
      case 'success':
        return {
          background: `${colors.success}40`,
          border: colors.success,
          text: colors.text,
          icon: '✅'
        }
      case 'warning':
        return {
          background: `${colors.warning}40`,
          border: colors.warning,
          text: colors.text,
          icon: '⚠️'
        }
      case 'error':
      default:
        return {
          background: `${colors.error}40`,
          border: colors.error,
          text: colors.text,
          icon: '❌'
        }
    }
  }

  const alertColors = getAlertColors()

  if (!visible) return null

  return (
    <Animated.View
      className="absolute top-16 left-4 right-4 z-50"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View
        className="rounded-xl p-4 flex-row items-center justify-between"
        style={{
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
        <View className="flex-row items-center flex-1">
          <Text className="text-lg mr-3">{alertColors.icon}</Text>
          <Text
            className="text-sm font-medium flex-1"
            style={{ color: alertColors.text }}
          >
            {message}
          </Text>
        </View>
        
        {!autoHide && onClose && (
          <TouchableOpacity
            onPress={hideAlert}
            className="ml-3 p-1"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text
              className="text-lg font-bold"
              style={{ color: alertColors.text }}
            >
              ×
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  )
} 