import React from 'react'
import { HomeScreen } from '@app/screens/Home'
import ClaimsScreen from '@app/screens/Claims'
import { createStackNavigator } from '@react-navigation/stack'
import tailwind from 'tailwind-rn'

type ClaimsStackParamList = {
  Home: undefined
  Claims: undefined
}

const ClaimsStack = createStackNavigator<ClaimsStackParamList>()

export const ClaimsNavigator = (): JSX.Element => {
  return (
    <ClaimsStack.Navigator>
      <ClaimsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTintColor: 'black',
          headerStyle: tailwind('text-white bg-white')
        }}
      />
      <ClaimsStack.Screen
        name="Claims"
        component={ClaimsScreen}
        options={{
          headerShown: false,
          headerTintColor: 'black',
          headerStyle: tailwind('text-white bg-white')
        }}
      />
    </ClaimsStack.Navigator>
  )
}
