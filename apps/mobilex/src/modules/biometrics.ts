import ReactNativeBiometrics from 'react-native-biometrics'
import { TaskEither, map, left, right, chain, tryCatch } from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { toError } from 'fp-ts/Either'
import { prop } from 'fp-ts-ramda'
import { fold } from 'fp-ts/boolean'

export type BiometricsModule = {
  authenticate: (_: BiometricsAuthenticatorConfig) => TaskEither<BiometricsAuthenticatorError, {}>
  isSensorAvailable: TaskEither<Error, boolean>
}

export type LibraryAuthenticatorResponse = {
  success: boolean
  error: string
}

export type BiometricsAuthenticatorError
  = 'UserCancel'
  | 'FatalError'

export type BiometricsAuthenticatorConfig = {
  description: string
}

const authenticate: BiometricsModule['authenticate'] = (config) => pipe(
  tryCatch(
    () => ReactNativeBiometrics.simplePrompt({ promptMessage: config.description }),
    () => 'FatalError' as BiometricsAuthenticatorError
  ),
  map(prop('success')),
  chain(fold(
    () => left('UserCancel' as BiometricsAuthenticatorError),
    () => right({})
  ))
)

const isSensorAvailable: BiometricsModule['isSensorAvailable'] = pipe(
  tryCatch(
    () => ReactNativeBiometrics.isSensorAvailable(),
    toError
  ),
  map(prop('available'))
)

export const biometrics: BiometricsModule = {
  authenticate,
  isSensorAvailable
}
