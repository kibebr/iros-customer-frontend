import { not } from 'fp-ts/Predicate'
import { UUID, date } from 'io-ts-types'
import { flow } from 'fp-ts/function'
import * as t from 'io-ts'
import { length, filter } from 'fp-ts/Array'
import {NewNotification} from '../value_objects/new_notification'

export type NotificationDetails = {
  uuid: string
  accountEmail: string
  createdAt: Date
  headline: string
  content: string
}

export type ReadNotification
  = NotificationDetails
  & { readAt: Date }
  & { _type: 'Read' }


export type UnreadNotification
  = NotificationDetails
  & { _type: 'Unread' }

export type Notification
  = ReadNotification
  | UnreadNotification

export const NotificationV = t.strict({
  _type: t.keyof({
    Read: null,
    Unread: null
  }),
  uuid: UUID,
  accountEmail: t.string,
  createdAt: date,
  headline: t.string,
  content: t.string
})

export const isRead = (notification: Notification): boolean => notification._type === 'Read'

export const isUnread = not(isRead)

export const unreadCount = flow(filter(isRead), (a) => a.length)

export const markAsRead = (n: Notification): ReadNotification => ({
  ...n,
  _type: 'Read',
  readAt: new Date() 
})

export const fromNewNotification = (accountEmail: string) => (n: NewNotification): Notification => ({
  ...n,
  _type: 'Unread',
  accountEmail,
  uuid: '1',
  createdAt: new Date()
})
