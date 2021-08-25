import { ADT } from 'ts-adt'
import { useState, useCallback } from 'react'
import { requestPincode, RequestPincodeProps } from '@app/modules/auth'
import { flow } from 'fp-ts/function'
import { map } from '@app/utils/Promise'
import { run } from '@app/utils/TaskEither'
import { fold } from 'fp-ts/Either'

type State = ADT<{
  Waiting: {}
  Requested: {}
  RequestFailed: { error: Error }
}>

type Functions = {
  request: (_: RequestPincodeProps) => void
  unrequest: () => void
}

type ReturnType = [State, Functions]

export const useRequestPincode = (): ReturnType => {
  const [state, setState] = useState<State>({ _type: 'Waiting' })

  const handleRequest: Functions['request'] = useCallback(flow(
    requestPincode,
    run,
    map(fold(
      (error) => setState({ _type: 'RequestFailed', error }),
      () => setState({ _type: 'Requested' })
    ))
  ), [])

  return [state, {
    request: handleRequest,
    unrequest: () => setState({ _type: 'Waiting' })
  }]
}
