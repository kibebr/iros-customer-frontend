import { setGenericPassword, getGenericPassword } from 'react-native-keychain'
import { toError } from 'fp-ts/Either'
import { TaskEither, map, tryCatch } from 'fp-ts/TaskEither'
import { Option, some, none } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

export type Keychain = {
  set: (key: string, item: string) => TaskEither<Error, {}>
  get: (key: string) => TaskEither<Error, Option<string>>
}

const set: Keychain['set'] = (key, item) => tryCatch(
  () => setGenericPassword(key, item, { service: key }),
  toError
)

const get: Keychain['get'] = (key) => pipe(
  tryCatch(
    () => getGenericPassword({ service: key }),
    toError
  ),
  map((result) => result === false ? none : some(result.password))
)

export const keychain: Keychain = {
  set,
  get
}
