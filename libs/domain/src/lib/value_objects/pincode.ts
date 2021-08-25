import * as F from 'fp-ts/function'
import { not } from 'fp-ts/Predicate'
import { prop } from 'fp-ts-ramda'
import { addMilliseconds, differenceInMilliseconds } from 'date-fns/fp'

export const EXPIRE_IN = 10 * 60 * 1000

export type Pincode = string

export type ExpirablePincode = {
  pincode: Pincode
  expiryDate: Date
}

export const addExpiryDate = (pincode: Pincode): ExpirablePincode => ({
 pincode,
  expiryDate: F.pipe(
    new Date(),
    addMilliseconds(EXPIRE_IN)
  )
})

export const isExpired: (pincode: ExpirablePincode) => boolean = F.flow(
  prop('expiryDate'),
  differenceInMilliseconds(new Date()),
  (n) => n > EXPIRE_IN
)

export const isNotExpired = not(isExpired)
