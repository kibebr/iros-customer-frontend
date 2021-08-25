import { useContext } from 'react'
import { AuthContext, AuthContextValue } from '@app/contexts/auth'

export const useAuth = (): AuthContextValue => useContext(AuthContext)
