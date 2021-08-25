import React from 'react'
import { StatusBarProps, StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

export const FocusAwareStatusbar = (props: StatusBarProps): JSX.Element => {
  const focused = useIsFocused()

  return focused
    ? (
        <StatusBar {...props} />
      )
    : <></>
}
