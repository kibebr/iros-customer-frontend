import React from 'react'
import { View } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { DocumentsStackParamList } from '@app/navigators/Documents'
import Pdf from 'react-native-pdf'
import tailwind from 'tailwind-rn'
import { WebView } from 'react-native-webview'

const runFirst = `
  const elems = ['navbar', 'container', 'breadcrumb-wrapper', 'bottom-bar', 'footer'];
  elems.forEach(e => {
    const elem = document.querySelector('.' + e);
    elem.parentNode.removeChild(elem);
  })

  true; // note: this is required, or you'll sometimes get silent failures
`

export const TOBADocumentScreen = ({ route }: { route: RouteProp<DocumentsStackParamList, 'TOBADocument'> }): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: 'https://www.insurancerevolution.co.uk/toba/'
        }}
        injectedJavaScript={runFirst}
      />
    </View>
  )
}
