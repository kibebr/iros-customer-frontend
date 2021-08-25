import React from 'react'
import HomeIcon from '../../assets/icons/home-outline.svg'
import ClaimIcon from '../../assets/icons/file-exclamation.svg'
import DocumentsIcon from '../../assets/icons/file-blank.svg'
import NotificationsIcon from '../../assets/icons/bell.svg'
import { FocusAwareStatusbar } from '@app/components/FocusAwareStatusbar'
import { DefaultView } from '@app/components/View'
import { Pressable, View, Text } from 'react-native'
import { tw, getColor } from '@app/tailwind'

export const HomeScreen = ({ navigation }): JSX.Element => {
  return (
    <DefaultView>
      <FocusAwareStatusbar
        barStyle="light-content"
        backgroundColor={getColor('purple-600')}
      />
      <View
        style={tw(
          'bg-purple-600 h-64 p-4 flex flex-col items-center justify-center'
        )}
      >
        <HomeIcon
          width="48"
          height="48"
          fill="currentColor"
          style={tw('text-yellow-100')}
        />

        <View style={tw('mb-14')} />

        <Text style={tw('text-white text-4xl font-bold text-center')}>
          What would you like to do?
        </Text>
      </View>

      <View style={tw('my-2')} />

      <View style={tw('px-4')}>
        <Pressable
          onPress={() => navigation.navigate('Claims')}
          style={tw('flex flex-row items-center bg-white rounded-md py-8 px-4')}
        >
          <ClaimIcon width="34" height="34" style={tw('text-yellow-300')} />

          <View style={tw('mr-4')} />

          <Text style={tw('font-bold text-xl')}>Make a claim</Text>
        </Pressable>

        <View style={tw('my-2')} />

        <Pressable
          style={tw('flex flex-row items-center bg-white rounded-md py-8 px-4')}
        >
          <DocumentsIcon width="34" height="34" style={tw('text-yellow-300')} />

          <View style={tw('mr-4')} />

          <Text style={tw('font-bold text-xl')}>See your documents</Text>

          <View
            style={{
              ...tw(
                'bg-red-500 rounded-full w-6 h-6 flex items-center justify-center'
              ),
              marginLeft: 'auto'
            }}
          >
            <Text style={tw('text-white font-karla')}>1</Text>
          </View>
        </Pressable>

        <View style={tw('my-2')} />

        <Pressable
          style={tw('flex flex-row items-center bg-white rounded-md py-8 px-4')}
        >
          <NotificationsIcon
            width="34"
            height="34"
            style={tw('text-yellow-300')}
          />

          <View style={tw('mr-4')} />

          <Text style={tw('font-bold text-xl')}>See notifications</Text>
        </Pressable>
      </View>
    </DefaultView>
  )
}
