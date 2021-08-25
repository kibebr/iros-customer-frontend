import { Account } from '@mobile/domain/entities/account'
import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import { storage } from '@app/modules/storage'
import { pipe, flow } from 'fp-ts/function'

export type RequestPincodeProps = {
  email: string
  postcode: string
}

type LoginError
  = 'CredentialsInvalid'

export const isTokenExpired = (_token: string): TE.TaskEither<Error, boolean> => TE.right(false)

export const storeAccount: (user: Account) => TE.TaskEither<Error, void> = flow(
  JSON.stringify,
  storage.set('account')
)

export const requestPincode = (_: RequestPincodeProps): TE.TaskEither<Error, {}> => TE.right({})

export const login = (_: string): TE.TaskEither<Error | LoginError, Account> => TE.right({
  name: 'Vitor',
  email: 'vitor@mail.com',
  customers: [],
  postcodes: ['123'],
  requestedDocuments: [],
  telephones: [],
  notifications: []
})

export const loginAndStoreAccount: (_: string) => TE.TaskEither<Error | LoginError, Account> = flow(
  login,
  TE.chainFirstW(storeAccount)
)

export const loginFromStorage: TE.TaskEither<Error, O.Option<Account>> = pipe(
  storage.get('user'),
  TE.map(O.map(JSON.parse))
)
