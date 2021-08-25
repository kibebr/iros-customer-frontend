import * as t from 'io-ts'

export const SMSMessageV = t.strict({
  from: t.string,
  to: t.string,
  content: t.string,
  message_id: t.string
})

export type SMSMessage = t.TypeOf<typeof SMSMessageV>
