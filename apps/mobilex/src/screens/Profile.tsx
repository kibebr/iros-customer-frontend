import React from 'react'
import LogoutIcon from '../../../assets/icons/signout.svg'
import { MediumCircle } from '@app/components/Shapes/Circle'
import { SafeAreaView, View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { FocusAwareStatusbar } from '@app/components/FocusAwareStatusbar'
import { useAuth } from '@app/hooks/useAuth'
import { useAccount } from '@app/hooks/useAccount'
import { tw, getColor } from '@app/tailwind'

export const Profile = (): JSX.Element => {
  const [account] = useAccount()
  const [, { logout }] = useAuth()

  return (
    <>
      <FocusAwareStatusbar
        barStyle='light-content'
        backgroundColor={getColor('purple-600')}
      />
      <View style={tw('flex flex-col justify-center items-center bg-purple-600 w-full p-8 font-karla')}>
        <MediumCircle style={tw('bg-purple-500 border border-purple-700 flex justify-center items-center')}>
          <Text style={tw('text-white text-2xl')}>
            {account.email[0].toUpperCase()}
          </Text>
        </MediumCircle>

        <View style={tw('my-2')} />

        <Text style={tw('font-bold text-xl text-white')}>
          {account.email}
        </Text>

        <Text style={tw('text-gray-200 font-karla')}>
          {account.email}
        </Text>
      </View>

      <View style={tw('my-4')} />

      <ListItem onPress={logout}>
        <LogoutIcon
          width='18'
          height='18'
          fill='currentColor'
          style={tw('text-red-500')}
        />
        <ListItem.Content>
          <ListItem.Title style={tw('text-red-500 font-bold')}>
            Log-out
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </>
  )
}
