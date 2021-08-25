import * as t from 'io-ts'
import { UUID, date } from 'io-ts-types'
import { Policy, PolicyV } from './policy'

export type Customer = {
  uuid: string
  first_name: string
  last_name: string
  company: string
  ogi_ref: string
  policies: Policy[]
  createdAt: Date
  updatedAt: Date
}

export const CustomerV = t.strict({
  uuid: UUID,
  first_name: t.string,
  last_name: t.string,
  company: t.string,
  ogi_ref: t.string,
  policy: t.array(PolicyV),
  createdAt: date,
  updatedAt: date
})
