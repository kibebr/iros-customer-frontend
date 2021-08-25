import React, {
  FunctionComponent,
  createContext,
  useEffect,
  useState
} from 'react'
import { Notification } from '@mobile/domain/entities/notification'
import { constVoid } from 'fp-ts/function'
import { configure } from '@app/modules/push-notifications'
import { useAccount } from '@app/hooks/useAccount'
import axios, { AxiosResponse } from 'axios'

const stubNotifs: Notification[] = [
  { uuid: '123', createdAt: new Date(), content: 'hi', _type: 'UnreadNotification', accountEmail: '', headline: 'Notification!' },
  { uuid: '456', createdAt: new Date(), content: 'hello', _type: 'UnreadNotification', accountEmail: '', headline: 'Notification!' },
  { uuid: '789', createdAt: new Date(), content: 'id doc required', _type: 'UnreadNotification', accountEmail: '', headline: 'Notification' }
]

const getAllNotifications = (accountEmail: string): Promise<AxiosResponse<Notification[]>> => {
  return axios.get<Notification[]>(`http://192.168.56.1:4045/admin/notification/?accountEmail=${accountEmail}`)
  // TODO: emails will be account's unique identifier now
}

const getAxiosResponse = <T,>(data: AxiosResponse<T>): T => data.data

export type NotificationsContextValue = [Notification[], {
  markAsRead: (notification: Notification) => void
  fetchNotifications: () => Promise<void>
}]

export const NotificationsContext = createContext<NotificationsContextValue>([[], {
  markAsRead: constVoid,
  fetchNotifications: Promise.resolve
}])

export const NotificationsContextProvider: FunctionComponent = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [account] = useAccount()

  const onOpenNotification = (notification: Notification): void => {
    console.log('received: ', notification)
  }

  const onMarkAsRead = (notification: Notification): void => {
    // here, we are going to make a request to the server, telling it this notifications needs to be read.
    // the server will return a new notification, which will be marked as read
    // all we do is then setState, we dont need a reducer anymore because we are not actually changing the state (read or not), the server is
  }

  const fetchNotifications = (): Promise<void> =>
    getAllNotifications(account.email)
      .then(getAxiosResponse)
      .then(setNotifications)

  useEffect(() => {
    configure({
      handleOpenNotification: onOpenNotification,
      handleReceivedToken: constVoid // TODO: we need to store the firebase token in the server. dont worry about it im working on it
    })
  }, [])

  return (
    <NotificationsContext.Provider value={[notifications, {
      markAsRead: onMarkAsRead,
      fetchNotifications
    }]}>
      {children}
    </NotificationsContext.Provider>
  )
}
