import { Either, left, right } from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import { launchCamera, ImagePickerResponse, Asset } from 'react-native-image-picker'

export type Image = {
  base64: string
  uri: string
  width: number
  height: number
  fileSize: number
  type: string
}

export type ResponseError
  = 'CameraUnavailable'
  | 'UserCancelled'
  | 'NoPermission'
  | 'FatalError'

export type Response = {
  images: Image[]
}

export type Camera = {
  launch: (callback: ((response: Either<ResponseError, Response>) => unknown)) => unknown
}

// here, we map the response we get from the library to our response (makes things clearer, and if we ever need to change the library, we only need to change this code below)
const imagePickerResponseToDomainResponse = (response: ImagePickerResponse): Either<ResponseError, Response> => {
  if (response?.didCancel !== null) {
    return left('UserCancelled')
  }

  if (response?.errorCode !== null && (response.errorMessage != null)) {
    if (response.errorCode === 'permission') {
      return left('NoPermission')
    }

    return left('FatalError')
  }

  return right({
    images: response.assets as Array<Required<Asset>>
  })
}

export const camera: Camera = {
  launch: (callback) => launchCamera(
    { mediaType: 'photo', maxWidth: 400, maxHeight: 400 },
    flow(imagePickerResponseToDomainResponse, callback)
  )
}
