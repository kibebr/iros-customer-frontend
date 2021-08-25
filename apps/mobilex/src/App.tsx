import React, { useEffect } from 'react'
import { match } from 'ts-adt'
import { AccountContextProvider } from '@app/contexts/account'
import { useAuth } from '@app/hooks/useAuth'
import { pipe } from 'fp-ts/function'
import { TabNavigator } from '@app/navigators/Tab'
import { AuthenticationNavigator } from '@app/navigators/Authentication.navigator'
import { NotificationsContextProvider } from '@app/contexts/notifications.context'

export default (): JSX.Element => {
  const [session, { loginFromStorage }] = useAuth()

  useEffect(() => loginFromStorage(), [])

  return pipe(
    session,
    match({
      Unauthenticated: () => <AuthenticationNavigator />,
      AuthenticationFailed: () => <AuthenticationNavigator />,
      Authenticated: ({ account }) => (
        <AccountContextProvider account={account}>
          <NotificationsContextProvider>
            <TabNavigator />
          </NotificationsContextProvider>
        </AccountContextProvider>
      )
    })
  )
}
