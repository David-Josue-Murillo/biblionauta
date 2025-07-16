import { useEffect, useRef, useCallback } from 'react'
import { Animated } from 'react-native'

interface UseAuthAlertParams {
  visible: boolean
  autoHide: boolean
  duration: number
  onClose?: () => void
}

export function useAuthAlert({ visible, autoHide, duration, onClose }: UseAuthAlertParams) {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(-100)).current

  const hideAlert = useCallback(() => {
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
  }, [fadeAnim, slideAnim, onClose])

  useEffect(() => {
    if (visible) {
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

      if (autoHide) {
        const timer = setTimeout(() => {
          hideAlert()
        }, duration)
        return () => clearTimeout(timer)
      }
    } else {
      hideAlert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return {
    fadeAnim,
    slideAnim,
    hideAlert,
  }
} 