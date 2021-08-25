import * as t from 'io-ts'
import { CustomerTelephoneV } from './customer_telephone'
import { date, nonEmptyArray } from 'io-ts-types'

export const NewAccountV = t.strict({
  email: t.string,
  postcodes: nonEmptyArray(t.string),
  telephones: t.array(CustomerTelephoneV)
})

export type NewAccount = t.TypeOf<typeof NewAccountV>
