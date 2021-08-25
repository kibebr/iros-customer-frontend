import { date } from 'io-ts-types'
import * as t from 'io-ts'

export type CustomerTelephoneDetails = {
  contact: string
  updatedAt: Date
}

export type MobileCustomerTelephone
  = CustomerTelephoneDetails
  & { _type: 'Mobile' }

export type CustomerTelephone
  = MobileCustomerTelephone

export const CustomerTelephoneV = t.type({
  _type: t.literal('Mobile'),
  contact: t.string,
  updatedAt: date
})
