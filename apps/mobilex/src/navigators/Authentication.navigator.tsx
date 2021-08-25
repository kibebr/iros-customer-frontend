import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RequestPincode } from '@app/screens/Authentication/RequestPincode.screen'
import { VerifyPincode } from '@app/screens/Authentication/VerifyPincode.screen'

export type AuthenticationNavigatorRoutes = {
  RequestPincode: undefined
  VerifyPincode: { email: string }
}

const AuthenticationStack = createStackNavigator<AuthenticationNavigatorRoutes>()

export const AuthenticationNavigator = (): JSX.Element => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name='RequestPincode'
        component={RequestPincode}
        options={{
          headerShown: false
        }}
      />
      <AuthenticationStack.Screen
        name='VerifyPincode'
        component={VerifyPincode}
        options={{
          headerShown: true,
          headerBackTitle: 'Log-in',
          headerTitle: 'Log-in'
        }}
      />
    </AuthenticationStack.Navigator>
  )
}
