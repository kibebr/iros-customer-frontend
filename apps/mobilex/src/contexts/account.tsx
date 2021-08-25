import React, { useState, FunctionComponent, createContext } from 'react'
import { Account } from '@mobile/domain/entities/account'
import { none } from 'fp-ts/Option'

export type AccountContextValue = [Account]

const emptyAccount: Account = {
  email: '',
  requestedDocuments: [],
  telephones: [],
  customers: [],
  postcodes: [],
  notifications: none
}

export const AccountContext = createContext<AccountContextValue>([emptyAccount])

export const AccountContextProvider: FunctionComponent<{ account: Account }> = ({ children, account }) => {
  const [_account] = useState<Account>(account)

  return (
    <AccountContext.Provider value={[_account]}>
      {children}
    </AccountContext.Provider>
  )
}
