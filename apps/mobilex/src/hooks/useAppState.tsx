import { useState, useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export const useAppState = (): AppStateStatus => {
  const [state, setState] = useState<AppStateStatus>(AppState.currentState)

  const handleChangeState = setState

  useEffect(() => {
    AppState.addEventListener('change', handleChangeState)

    return () => AppState.removeEventListener('change', handleChangeState)
  }, [])

  return state
}
