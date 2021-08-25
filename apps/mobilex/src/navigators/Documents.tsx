import React from 'react'
import { Document } from '@mobile/domain/entities/document'
import { SeeDocumentScreen } from '@app/screens/Documents/SeeDocument.screen'
import { CreateDocumentScreen } from '@app/screens/Documents/CreateDocument.screen'
import { SeeAllDocumentsScreen } from '@app/screens/Documents/SeeAllDocuments.screen'
import { TOBADocumentScreen } from '@app/screens/Documents/TOBADocument.screen'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'react-native'
import { tw, getColor } from '@app/tailwind'

export type DocumentsStackParamList = {
  SeeDocument: {
    document: Document
  }
  CreateDocument: undefined
  Documents: undefined
  TOBADocument: undefined
}

const DocumentsStack = createStackNavigator<DocumentsStackParamList>()

export const DocumentsNavigator = (): JSX.Element => {
  return (
    <>
      <StatusBar
        backgroundColor='white'
        barStyle='dark-content'
        translucent={true}
      />
      <DocumentsStack.Navigator>
        <DocumentsStack.Screen
          name='Documents'
          component={SeeAllDocumentsScreen}
          options={() => ({
            headerTintColor: getColor('purple-600'),
            headerStyle: tw('text-white bg-white')
          })}
        />
        <DocumentsStack.Screen
          name='CreateDocument'
          component={CreateDocumentScreen}
          options={() => ({
            title: 'Create a document'
          })}
        />
        <DocumentsStack.Screen
          name='SeeDocument'
          component={SeeDocumentScreen}
          options={() => ({
            title: 'Viewing document'
          })}
        />
        <DocumentsStack.Screen
          name='TOBADocument'
          component={TOBADocumentScreen}
          options={() => ({
            title: 'Terms of Business Agreement'
          })}
        />
      </DocumentsStack.Navigator>
    </>
  )
}
