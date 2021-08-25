import React, { FunctionComponent, createContext, useState, useCallback } from 'react'
import { ADT } from 'ts-adt'
import { login, loginAndStoreAccount, loginFromStorage } from '@app/modules/auth'
import { Account } from '@mobile/domain/entities/account'
import { fold } from 'fp-ts/Either'
import { constVoid } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

type AuthContextValueFunctions = {
  login: (_: string) => void
  logout: () => void
  loginAndStoreAccount: (_: string) => void
  loginFromStorage: () => void
}

export type Errors
  = 'CredentialsInvalid'
  | Error

export type State = ADT<{
  Unauthenticated: {}
  Authenticated: { account: Account }
  AuthenticationFailed: { error: Errors }
}>

export type AuthContextValue = [State, AuthContextValueFunctions]

export const AuthContext = createContext<AuthContextValue>([{ _type: 'Unauthenticated' }, {
  login: constVoid,
  logout: constVoid,
  loginAndStoreAccount: constVoid,
  loginFromStorage: constVoid
}])

export const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [session, setSession] = useState<State>({ _type: 'Unauthenticated' })

  const handleReceivedAccount: (account: Account) => void = useCallback((account) => setSession({ _type: 'Authenticated', account }), [])

  const handleReceivedError: (error: Errors) => void = useCallback((error) => setSession({ _type: 'AuthenticationFailed', error }), [])

  const handleLogout: AuthContextValueFunctions['logout'] = () => setSession({ _type: 'Unauthenticated' })

  const handleLogin: AuthContextValueFunctions['login'] = (combination) => {
    login(combination)()
      .then(fold(
        handleReceivedError,
        handleReceivedAccount
      ))
  }

  const handleLoginAndStoreAccount: AuthContextValueFunctions['loginAndStoreAccount'] = (combination) => {
    loginAndStoreAccount(combination)()
      .then(fold(
        handleReceivedError,
        handleReceivedAccount
      ))
  }

  const handleLoginFromStorage: AuthContextValueFunctions['loginFromStorage'] = () => {
    loginFromStorage()
      .then(fold(
        handleReceivedError,
        O.fold(
          () => handleReceivedError('CredentialsInvalid'),
          handleReceivedAccount
        )
      ))
  }

  return (
    <AuthContext.Provider
      value={[session, {
        login: handleLogin,
        loginAndStoreAccount: handleLoginAndStoreAccount,
        loginFromStorage: handleLoginFromStorage,
        logout: handleLogout
      }]}
    >
      {children}
    </AuthContext.Provider>
  )
}
