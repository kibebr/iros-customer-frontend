import { useState, useEffect } from 'react'
import { Pincode } from 'domain/entities/pincode'
import { pincode as pincodeModule } from '@app/modules/pincode'
import { fold } from 'fp-ts/Either'

export const usePinCodeAuth = (pincode: Pincode): boolean => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    pincodeModule.validate(pincode)()
      .then(fold(
        console.error,
        setAuthenticated
      ))
  }, [pincode])

  return authenticated
}
