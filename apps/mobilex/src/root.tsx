import React from 'react'
import App from './App'
import { AuthContextProvider } from '@app/contexts/auth'
import { DeviceConfigProvider } from '@app/contexts/deviceConfig'
import { NavigationContainer } from '@react-navigation/native'

export default (): JSX.Element => (
  <DeviceConfigProvider>
    <AuthContextProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </AuthContextProvider>
  </DeviceConfigProvider>
)
