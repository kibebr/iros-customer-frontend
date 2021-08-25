import { useContext } from 'react'
import { DeviceConfigValue, DeviceConfigContext } from '@app/contexts/deviceConfig'

export const useDeviceConfig = (): DeviceConfigValue => useContext(DeviceConfigContext)
