import { useContext } from 'react'
import { NotificationsContextValue, NotificationsContext } from '@app/contexts/notifications.context'

export const useNotifications = (): NotificationsContextValue => useContext(NotificationsContext)
