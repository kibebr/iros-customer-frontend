import React from 'react'
import BellIcon from '../../assets/icons/bell.svg'
import DocumentsIcon from '../../assets/icons/file-blank.svg'
import PersonIcon from '../../assets/icons/user-circle.svg'
import HomeIcon from '../../assets/icons/estate.svg'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ClaimsNavigator } from './Claims'
import { DocumentsNavigator } from './Documents'
import { SettingsNavigator } from './Settings'
import { SeeAllNotificationsScreen } from '@app/screens/Notifications/SeeAllNotifications.screen'
import { useNotifications } from '@app/hooks/useNotifications'
import { isUnread } from '@mobile/domain/entities/notification'
import { filter } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { length } from '@app/utils/Array'
import { tw, getColor } from '@app/tailwind'

const Tab = createBottomTabNavigator()

export const TabNavigator = (): JSX.Element => {
  const [notifications] = useNotifications()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
      }}
      initialRouteName='ClaimsNavigator'
    >
      <Tab.Screen
        name='ClaimsNavigator'
        component={ClaimsNavigator}
        options={{
          tabBarShowLabel: false,
          title: 'Claims',
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width='24'
              height='24'
              fill='currentColor'
              style={tw(focused ? 'text-purple-600' : 'text-black')}
            />
          )
        }}
      />
      <Tab.Screen
        name='DocumentsNavigator'
        component={DocumentsNavigator}
        options={{
          title: 'Documents',
          tabBarIcon: ({ focused }) => (
            <DocumentsIcon
              width='24'
              height='24'
              fill='currentColor'
              style={tw(focused ? 'text-purple-600' : 'text-black')}
            />
          )
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={SeeAllNotificationsScreen}
        options={{
          title: 'Notifications',
          headerShown: true,
          headerTintColor: getColor('purple-600'),
          headerStyle: tw('bg-white'),
          tabBarIcon: ({ focused }) => (
            <BellIcon
              width='24'
              height='24'
              fill='currentColor'
              style={tw(focused ? 'text-purple-600' : 'text-black')}
            />
          ),
          tabBarBadge: pipe(notifications, filter(isUnread), length, (len) => len > 0 ? len : undefined)
        }}
      />
      <Tab.Screen
        name='SettingsNavigator'
        component={SettingsNavigator}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <PersonIcon
              width='24'
              height='24'
              fill='currentColor'
              style={tw(focused ? 'text-purple-600' : 'text-black')}
            />
          )
        }}
      />
    </Tab.Navigator>

  )
}
