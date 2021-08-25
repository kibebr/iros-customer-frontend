import React from 'react'
import { View } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { DocumentsStackParamList } from '@app/navigators/Documents'
import Pdf from 'react-native-pdf'
import tailwind from 'tailwind-rn'

export const SeeDocumentScreen = ({ route }: { route: RouteProp<DocumentsStackParamList, 'SeeDocument'> }): JSX.Element => {
  return (
    <View>
      <Pdf
        source={{ uri: route.params.document.source, cache: false }}
        style={tailwind('h-full')}
      />
    </View>
  )
}
