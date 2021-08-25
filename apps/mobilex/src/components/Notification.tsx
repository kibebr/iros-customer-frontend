import React from 'react'
import { View, Text } from 'react-native'
import { useNotifications } from '@app/hooks/useNotifications'
import { unreadCount } from '@mobile/domain/entities/notification'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import tailwind from 'tailwind-rn'

export const Notification = (): JSX.Element => {
  const [notifications] = useNotifications()
  const { navigate } = useNavigation()

  return (
    <View style={tailwind('flex-row items-center')}>
      <Icon onPress={() => navigate('SeeAllNotifications' as never)} name='notifications' color='#fff' />
      <Text style={tailwind('text-white font-bold')}>
        {unreadCount(notifications)}
      </Text>
    </View>
  )
}
