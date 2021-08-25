import React, { useState, useEffect, createContext, FunctionComponent } from 'react'
import { biometrics } from '@app/modules/biometrics'
import { pincode } from '@app/modules/pincode'
import { isRight } from 'fp-ts/Either'

export type DeviceConfigValue = {
  isSensorAvailable: boolean
  hasPincode: boolean
}

const defaultDeviceConfigValue: DeviceConfigValue = {
  isSensorAvailable: false,
  hasPincode: false
}

export const DeviceConfigContext = createContext<DeviceConfigValue>(defaultDeviceConfigValue)

export const DeviceConfigProvider: FunctionComponent = ({ children }) => {
  const [deviceConfig, setDeviceConfig] = useState<DeviceConfigValue>(defaultDeviceConfigValue)

  useEffect(() => {
    Promise.all([
      biometrics.isSensorAvailable(),
      pincode.hasPincode()
    ])
      .then(([isSensorAvailable, hasPincode]) => {
        if (isRight(isSensorAvailable)) {
          setDeviceConfig({ ...deviceConfig, isSensorAvailable: isSensorAvailable.right })
        }

        if (isRight(hasPincode)) {
          setDeviceConfig({ ...deviceConfig, hasPincode: hasPincode.right })
        }
      })
  }, [])

  return (
    <DeviceConfigContext.Provider value={deviceConfig}>
      {children}
    </DeviceConfigContext.Provider>
  )
}
