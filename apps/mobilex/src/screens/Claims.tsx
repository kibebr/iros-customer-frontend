import React from 'react'
import { Pressable, View, Text, Linking, Platform } from 'react-native'
import { tw, getColor } from '@app/tailwind'
import { FocusAwareStatusbar } from '@app/components/FocusAwareStatusbar'
import { DefaultView } from '@app/components/View'
import ClaimIcon from '../../../assets/icons/file-exclamation.svg'

const dialCall = (): void => {
  let phoneNumber = ''

  Platform.OS === 'android'
    ? (phoneNumber = 'tel:${0330 808 0606}')
    : (phoneNumber = 'telprompt:${0330 808 0606}')

  Linking.openURL(phoneNumber)
}

export const Claims = (): JSX.Element => {
  return (
    <DefaultView>
      <FocusAwareStatusbar
        barStyle="light-content"
        backgroundColor={getColor('black')}
      />
      <View
        style={tw(
          'bg-red-500 h-64 p-4 flex flex-col items-center justify-center'
        )}
      >
        <View style={tw('my-20')} />

        <ClaimIcon width="34" height="34" style={tw('text-yellow-300 mt-10')} />

        <Text style={tw('text-black text-4xl font-bold text-center')}>
          Make a claim
        </Text>

        <View style={tw('px-4')}>
          <Text style={tw('text-black text-base text-center my-2')}>
            If you wish to make a claim, please call our 24 hour line:
          </Text>
        </View>

        <View style={tw('h-24 my-2')}>
          <Pressable
            onPress={dialCall}
            style={tw('bg-white rounded-md py-4 px-4')}
          >
            <Text style={tw('text-black text-3xl font-bold text-center')}>
              0330 808 0606
            </Text>
          </Pressable>
        </View>

        <Text style={tw('text-black text-base text-center')}>
          03 numbers are mobile friendly and use your inclusive minutes
        </Text>
      </View>
    </DefaultView>
  )
}

export default Claims
