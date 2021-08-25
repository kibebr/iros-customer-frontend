import { useContext } from 'react'
import { AccountContext, AccountContextValue } from '@app/contexts/account'

export const useAccount = (): AccountContextValue => useContext(AccountContext)
