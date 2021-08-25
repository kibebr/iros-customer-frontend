import React, { useEffect } from 'react'
import { Document } from '@mobile/domain//entities/document'
import { getAllPolicyDocuments, getAllRequestedDocuments } from '@mobile/domain/entities/account'
import { useAccount } from '@app/hooks/useAccount'
import { SearchBar } from 'react-native-elements'
import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar'
import { pipe } from 'fp-ts/function'
import { map } from 'fp-ts/Array'
import tailwind from 'tailwind-rn'
import styled from 'styled-components/native'

const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>

const ListItemDocument = ({ document }: { document: Document }): JSX.Element => {
  return (
    <View style={tailwind('bg-white rounded-md p-4 mx-2 flex flex-row items-center justify-between')}>
      <View style={tailwind('flex flex-col')}>
        <Text>
          {document.type}
        </Text>

        <View style={tailwind('my-1')} />

        <Text style={tailwind('text-gray-500')}>
          Sent in 04/14/2003
        </Text>
      </View>
      <View>
        <Text>
          PENDING
        </Text>
      </View>
    </View>
  )
}

export const SeeAllDocumentsScreen = (): JSX.Element => {
  const [account] = useAccount()
  const { navigate } = useNavigation()

  return (
    <View style={tailwind('bg-gray-100')}>
      {/* <SafeSearchBar placeholder='Search for documents...' value={'a'} platform='android' /> */}

      <View style={tailwind('mb-4')} />

      <Text style={tailwind('text-gray-500 ml-4')}>ALL DOCUMENTS</Text>

      <View style={tailwind('mb-2')} />

      <View style={tailwind('bg-white rounded-md p-4 mx-2 flex flex-row items-center justify-between')}>
          <View style={tailwind('flex flex-col')}>
            <Text>
              Terms of Business Agreement
            </Text>
          </View>
          <View>
            <Button onPress={() => { navigate('TOBADocument') }} title="View" accessibilityLabel="View document"/>
          </View>
        </View>

      {/* {pipe( */}
      {/*   user, */}
      {/*   getAllPolicyDocuments, */}
      {/*   map((document) => ( */}
      {/*     <> */}
      {/*       <ListItemDocument */}
      {/*         key={document.uuid} */}
      {/*         document={{ _type: 'PolicyDocument', ...document }} */}
      {/*       /> */}
      {/*       <View style={tailwind('mb-2')} /> */}
      {/*     </> */}
      {/*   )) */}
      {/* )} */}

      <View style={tailwind('mb-4')} />

      <Text style={tailwind('text-gray-500 ml-4')}>PENDING</Text>

      <View style={tailwind('mb-2')} />

      {/* {pipe( */}
      {/*   user, */}
      {/*   getAllRequestedDocuments, */}
      {/*   map((pendingDocument) => ( */}
      {/*     <> */}
      {/*       <ListItemDocument */}
      {/*         key={pendingDocument.uuid} */}
      {/*         document={pendingDocument} */}
      {/*       /> */}
      {/*       <View style={tailwind('mb-2')} /> */}
      {/*     </> */}
      {/*   )) */}
      {/* )} */}
    </View>
  )
}
