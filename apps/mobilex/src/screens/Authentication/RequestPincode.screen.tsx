import React, { useState, useEffect } from 'react'
import tailwind from 'tailwind-rn'
import { useFocusEffect } from '@react-navigation/native'
import { DefaultView } from '@app/components/View'
import { Button } from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthenticationNavigatorRoutes } from '@app/navigators/Authentication.navigator'
import { Text, TextInput, View } from 'react-native'
import { useRequestPincode } from '@app/hooks/useRequestPincode'
import { useNavigation } from '@react-navigation/core'

export const RequestPincode = (): JSX.Element => {
  const [requestedState, { request, unrequest }] = useRequestPincode()
  const [email, setEmail] = useState<string>('')
  const [postcode, setPostcode] = useState<string>('')
  const { navigate } = useNavigation<StackNavigationProp<AuthenticationNavigatorRoutes, 'RequestPincode'>>()

  // useFocusEffect(() => {
  //   unrequest()
  // })

  useEffect(() => {
    if (requestedState._type === 'Requested') {
      navigate('VerifyPincode', { email })
    }
  }, [requestedState])

  return (
    <DefaultView style={tailwind('bg-white')}>
      <View style={tailwind('flex flex-col')}>
        <View style={tailwind('')}>
          <Text style={tailwind('font-bold text-3xl my-14')}>Let's sign you in</Text>
        </View>

        <TextInput
          placeholder='Email'
          style={tailwind('bg-gray-100 text-lg rounded-md p-2')}
          onChangeText={setEmail}
        />

        <View style={tailwind('my-2')} />

        <TextInput
          placeholder='Postcode'
          style={tailwind('bg-gray-100 text-lg rounded-md p-2')}
          onChangeText={setPostcode}
        />

      </View>
      <View style={tailwind('absolute bottom-0 w-full')}>
        <Button
          title='Log-in'
          containerStyle={tailwind('my-4 rounded-xl flex justify-center items-center')}
          buttonStyle={tailwind('w-full bg-purple-400 py-4')}
          onPress={() => request({ email, postcode })}
        />
      </View>
    </DefaultView>
  )
}
