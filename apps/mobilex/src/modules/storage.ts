import AsyncStorage from '@react-native-async-storage/async-storage'
import { Option, fromNullable } from 'fp-ts/Option'
import { some } from 'fp-ts/Array'
import { TaskEither, tryCatchK, tryCatch, map } from 'fp-ts/TaskEither'
import { toError } from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'

export type Storage = {
  set: (key: string) => (item: string) => TaskEither<Error, void>
  get: (key: string) => TaskEither<Error, Option<string>>
  clear: TaskEither<Error, void>
  getAllKeys: TaskEither<Error, string[]>
  hasKey: (key: string) => TaskEither<Error, boolean>
}

// we map(fromNullable) here because although AsyncStorage.getItem returns a Promise<string>, the string can somehow be null???
// see https://reactnative.dev/docs/asyncstorage
// this makes no NullExceptionErrors are thrown in the runtime
const get: Storage['get'] = flow(tryCatchK(AsyncStorage.getItem, toError), map(fromNullable))

const getAllKeys: Storage['getAllKeys'] = tryCatch(AsyncStorage.getAllKeys, toError)

const set: Storage['set'] = (key) => (item) => tryCatch(
  () => AsyncStorage.setItem(key, item),
  toError
)

const clear: Storage['clear'] = tryCatch(AsyncStorage.clear, toError)

const hasKey: Storage['hasKey'] = (key) => pipe(getAllKeys, map(some((k) => k === key)))

export const storage: Storage = {
  get,
  set,
  clear,
  getAllKeys,
  hasKey
}
