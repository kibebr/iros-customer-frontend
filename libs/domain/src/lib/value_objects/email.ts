import { date } from 'io-ts-types'
import * as t from 'io-ts'

export type EmailMessage = {
  createdAt: Date
  subject: string
  content: string
  read: boolean
}

export const EmailMessageV = t.strict({
  createdAt: date,
  subject: t.string,
  content: t.string,
  read: t.boolean
})
