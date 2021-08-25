import { local } from 'fp-ts/Reader'
import { fromNewNotification } from '../entities/notification'

// converts a function Notification -> A to NewNotification -> A
export const withNewNotification = local(fromNewNotification)
