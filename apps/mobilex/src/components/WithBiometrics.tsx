import React, { FunctionComponent, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useBiometrics } from '@app/hooks/useBiometrics'
import { View } from 'react-native'
import { BiometricsAuthenticatorError } from '@app/modules/biometrics'

type WithBiometricsProps = {
  description: string
  handleError: (error: BiometricsAuthenticatorError) => void
}

export const WithBiometrics: FunctionComponent<WithBiometricsProps> = (props) => {
  const { children, description, handleError } = props
  const [authenticatedState, { authenticate, unauthenticate }] = useBiometrics()
  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      authenticate({ description })
    }

    if (!focused) {
      unauthenticate()
    }
  }, [focused])

  if (authenticatedState._type === 'Authenticated') {
    return <>{children}</>
  }

  return (
    <View>
    </View>
  )
}
