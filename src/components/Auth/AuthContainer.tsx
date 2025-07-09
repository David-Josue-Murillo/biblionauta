import { useState } from 'react'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import ResetPasswordScreen from './ResetPasswordScreen'

const AuthContainer = () => {
  const [currentScreen, setCurrentScreen] = useState('login')

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onSwitchToRegister={() => setCurrentScreen('register')}
            onSwitchToReset={() => setCurrentScreen('reset')}
          />
        )
      case 'register':
        return (
          <RegisterScreen
            onSwitchToLogin={() => setCurrentScreen('login')}
          />
        )
      case 'reset':
        return (
          <ResetPasswordScreen
            onSwitchToLogin={() => setCurrentScreen('login')}
          />
        )
      default:
        return null
    }
  }

  return renderScreen()
}

export default AuthContainer