import React, { useEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { useAuth } from '@app/hooks/useAuth'
import { AuthenticationNavigatorRoutes } from '@app/navigators/Authentication.navigator'
import { useRoute, RouteProp } from '@react-navigation/core'
import { CodeField, Cursor } from 'react-native-confirmation-code-field'
import MailSvg from '../../../assets/undraw_Mail_sent_re_0ofv.svg'
import tw from 'tailwind-rn'

export const VerifyPincode = (): JSX.Element => {
  const [code, setCode] = useState<string>('')
  const { params: { email } } = useRoute<RouteProp<AuthenticationNavigatorRoutes, 'VerifyPincode'>>()
  const [, { loginAndStoreAccount }] = useAuth()

  useEffect(() => {
    if (code.length === 5) {
      loginAndStoreAccount(code)
    }
  }, [code])

  return (
    <KeyboardAvoidingView behavior='padding' style={tw('bg-white flex-1')}>
      <View style={tw('flex justify-center items-center mt-12')}>
        <MailSvg width='120' height='120'/>

        <Text style={tw('text-2xl')}>
          Check your email
        </Text>

        <Text>
          An e-mail with a 5-digit PIN code was sent to {email}.
        </Text>
      </View>

      <View style={tw('flex-1 flex justify-center items-center')}>
        <CodeField
          value={code}
          cellCount={5}
          rootStyle={tw('flex-1 p-20')}
          keyboardType='decimal-pad'
          onChangeText={setCode}
          textContentType='oneTimeCode'
          renderCell={({ index, symbol }) => (
            <View
              key={index}
              style={tw('border border-gray-200 w-14 h-14 flex justify-center items-center rounded-md mx-1')}
            >
              <Text style={tw('text-3xl')}>
                {symbol}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={tw('flex justify-center items-center mb-4')}>
        <Text style={tw('text-gray-600')}>
          This keeps your documents secure.
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}
