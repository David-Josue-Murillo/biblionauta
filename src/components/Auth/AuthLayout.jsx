import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { colors } from '../../constants/theme'
import HeaderSign from './HeaderSign'

const AuthLayout = ({
  children,
  headerText,
  showScrollView = false,
  ScrollViewComponent = null,
}) => {
  const content = (
    <View className="mb-6 flex-1 items-center justify-center px-6">
      <HeaderSign text={headerText} />
      {children}
    </View>
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      {showScrollView && ScrollViewComponent ? (
        <ScrollViewComponent>{content}</ScrollViewComponent>
      ) : (
        content
      )}
    </KeyboardAvoidingView>
  )
}

export default AuthLayout
