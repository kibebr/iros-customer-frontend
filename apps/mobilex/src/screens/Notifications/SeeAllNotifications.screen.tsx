import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNotifications } from '@app/hooks/useNotifications'
import { Notification, isUnread } from '@mobile/domain/entities/notification'
import tw from 'tailwind-rn'

const ListItemNotification = ({ notification }: { notification: Notification }): JSX.Element => {
  const [, { markAsRead }] = useNotifications()

  return (
    <View
      style={tw(
        'bg-white rounded-md p-4 mx-2 my-2 flex flex-row items-center justify-between'
      )}
    >
      <View style={tw('flex flex-col')}>
        <Text>{notification.createdAt.toISOString()}</Text>

        <View style={tw('my-1')} />

        <Text style={tw('text-gray-500')}>{notification.content}</Text>

        <View style={tw('my-1')} />
        {isUnread(notification) && (
          <Button
            title='Read'
            onPress={() => markAsRead(notification)}
          />
        )}
      </View>
      {isUnread(notification) && (
        <View style={tw('w-3 h-3 bg-blue-600 rounded')} />
      )}
    </View>
  )
}

export const SeeAllNotificationsScreen = (): JSX.Element => {
  const [notifications] = useNotifications()

  return (
    <View>
      {notifications.map((n, i) => (
        <ListItemNotification
          key={i}
          notification={n}
        />
      ))}
    </View>
  )
}
