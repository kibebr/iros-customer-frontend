import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Profile } from '@app/screens/Profile'

const SettingsStack = createStackNavigator()

export const SettingsNavigator = (): JSX.Element => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name='Settings'
        component={Profile}
        options={{
          headerShown: false
        }}
      />
    </SettingsStack.Navigator>
  )
}
