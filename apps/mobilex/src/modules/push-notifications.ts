import { Notification } from 'domain/entities/notification'
import PushNotification, { ReceivedNotification } from 'react-native-push-notification'
import { flow } from 'fp-ts/function'

export type PushNotificationConfig = {
  handleOpenNotification: (notification: Notification) => unknown
  handleReceivedToken: (token: string) => unknown
}

export const libraryNotifToDomainNotif = (notif: Omit<ReceivedNotification, 'userInfo'>): Notification => ({
  _type: 'UnreadNotification',
  uuid: String(notif.id),
  createdAt: new Date(),
  content: JSON.stringify(notif.data)
})

export const configure = (config: PushNotificationConfig): void => PushNotification.configure({
  onRegister: ({ token }) => config.handleReceivedToken(token),
  onNotification: flow(libraryNotifToDomainNotif, config.handleOpenNotification),
  popInitialNotification: true,
  requestPermissions: true
})
