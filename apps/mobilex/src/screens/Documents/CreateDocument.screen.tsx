import React, { useState } from 'react'
import { Either } from 'fp-ts/Either'
import { Text, View } from 'react-native'
import { DefaultView } from '@app/components/View'
import { Button, Card, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'
import {
  camera,
  ResponseError as CameraResponseError,
  Response as CameraResponse
} from '@app/modules/camera'
import { cameraRoll } from '@app/modules/camera-roll'
import tailwind from 'tailwind-rn'

export const CreateDocumentScreen = (): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [type, setType] = useState<string>('')
  const { navigate, goBack } = useNavigation()

  const onAddPicture = (response: Either<CameraResponseError, CameraResponse>): void => {
    console.log(JSON.stringify(response))
  }

  return (
    <DefaultView>
      <Text>what up bro submit your document</Text>

      <Card>
        <Text>Document details</Text>
        <Input placeholder='Title' />
        <Input placeholder='Type' />
      </Card>

      <Card>
        <Text>
          Next, take a picture of your document or submit one from your camera roll.
        </Text>

        <Button
          title='Upload by taking a picture'
          onPress={() => camera.launch(onAddPicture)}
        />

        <Button
          title='Upload from camera roll'
          onPress={() => cameraRoll.launch(onAddPicture)}
        />
      </Card>
    </DefaultView>
  )
}
