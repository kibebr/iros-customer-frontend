import { Pincode } from '@mobile/domain/value_objects/pincode'
import { TaskEither, map, right } from 'fp-ts/TaskEither'
import { storage } from '@app/modules/storage'
import { foldW } from 'fp-ts/Option'
import { flow, pipe } from 'fp-ts/function'
import { elemString } from '@app/utils/Array'

export type PincodeModule = {
  set: (code: Pincode) => TaskEither<Error, void>
  hasPincode: TaskEither<Error, boolean>
  validate: (code: Pincode) => TaskEither<Error, boolean>
}

const serializePincode: (code: Pincode) => string = JSON.stringify

const set: PincodeModule['set'] = flow(
  serializePincode,
  storage.set('pincode')
)

const validate: PincodeModule['validate'] = (code) => pipe(
  storage.get('pincode'),
  map(foldW(
    () => false,
    (storedCode) => serializePincode(code) === storedCode
  ))
)

const hasPincode: TaskEither<Error, boolean> = pipe(
  storage.getAllKeys,
  map(elemString('pincode'))
)

// stub, will validate if the code is 1111
const stubValidate: PincodeModule['validate'] = () => right(true)

export const pincode: PincodeModule = {
  set,
  hasPincode,
  validate: stubValidate
}
