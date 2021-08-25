import { useState } from 'react'
import { flow } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import { map } from '@app/utils/Promise'
import { run } from '@app/utils/TaskEither'
import { biometrics, BiometricsAuthenticatorConfig, BiometricsAuthenticatorError } from '@app/modules/biometrics'
import { ADT } from 'ts-adt'

type State = ADT<{
  Unauthenticated: {}
  Authenticated: {}
  AuthenticateFailed: { error: BiometricsAuthenticatorError }
}>

type Functions = {
  authenticate: (_: BiometricsAuthenticatorConfig) => void
  unauthenticate: () => void
}

type ReturnType = [State, Functions]

export const useBiometrics = (): ReturnType => {
  const [state, setState] = useState<State>({ _type: 'Unauthenticated' })

  return [state, {
    authenticate: flow(
      biometrics.authenticate,
      run,
      map(fold(
        (error) => setState({ _type: 'AuthenticateFailed', error }),
        () => setState({ _type: 'Authenticated' })
      ))
    ),
    unauthenticate: () => setState({ _type: 'Unauthenticated' })
  }]
}
