import * as t from 'io-ts'
import { date } from 'io-ts-types'

export const EmailMessageV = t.strict({
  createdAt: date,
  subject: t.string,
  content: t.string,
  read: t.boolean
})

export type EmailMessage = t.TypeOf<typeof EmailMessageV>
