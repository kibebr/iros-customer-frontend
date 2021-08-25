import * as t from 'io-ts'

export const NewNotificationV = t.strict({
  content: t.string,
  headline: t.string
})

export type NewNotification = t.TypeOf<typeof NewNotificationV>
