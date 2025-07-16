import { Animated, ViewProps } from 'react-native'

interface AlertContainerProps extends ViewProps {
  fadeAnim: Animated.Value
  slideAnim: Animated.Value
  children: React.ReactNode
}

export function AlertContainer({
  fadeAnim,
  slideAnim,
  children,
  style,
  ...props
}: AlertContainerProps) {
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: 16,
          right: 16,
          top: 64,
          zIndex: 50,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  )
}
