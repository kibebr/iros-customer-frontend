import { Customer, CustomerV } from './customer'
import { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { Policy } from './policy'
import { RequestedDocument, PolicyDocument, RequestedDocumentV } from './document'
import { CustomerTelephone, CustomerTelephoneV, MobileCustomerTelephone } from '../value_objects/customer_telephone'
import { Notification, NotificationV } from './notification'
import { prop } from 'fp-ts-ramda'
import { pipe, flow } from 'fp-ts/function'
import { Option } from 'fp-ts/Option'
import { findFirst, chain } from 'fp-ts/Array'
import { NewAccount } from '../value_objects/new_account'
import { nonEmptyArray } from 'io-ts-types'
import * as t from 'io-ts'

export type Account = {
  email: string
  postcodes: NonEmptyArray<string>
  requestedDocuments: RequestedDocument[]
  telephones: CustomerTelephone[]
  customers: Customer[]
  notifications: Notification[]
}

export const AccountV = t.strict({
  email: t.string,
  postcodes: nonEmptyArray(t.string),
  customers: t.array(CustomerV),
  requestedDocuments: t.array(RequestedDocumentV),
  telephones: t.array(CustomerTelephoneV),
  notifications: t.array(NotificationV)
})

export const insertRequestedDocument = (requestedDocument: RequestedDocument) => (account: Account) => ({
  ...account,
  requestedDocuments: account.requestedDocuments.concat(requestedDocument)
})

export const insertNotification = (notification: Notification) => (account: Account): Account => ({
  ...account,
  notifications: account.notifications.concat(notification)
})

export const getEmail = ({ email }: Account): string => email

export const getNotifications: (account: Account) => Notification[] = prop('notifications')

export const getAllCustomers: (account: Account) => Customer[] = prop('customers')

export const getAllPolicies: (account: Account) => Policy[] = flow(
  getAllCustomers,
  chain(prop('policies'))
)

export const getAllPolicyDocuments: (account: Account) => PolicyDocument[] = flow(
  getAllPolicies,
  chain(prop('documents'))
)

export const getAllRequestedDocuments: (account: Account) => RequestedDocument[] = prop('requestedDocuments')

export const getPolicyDocumentWithId = (_uuid: string) => (account: Account): Option<PolicyDocument> => pipe(
  account,
  getAllPolicyDocuments,
  findFirst(({ uuid }) => uuid === _uuid)
)

export const getTelephoneWithNumber = (number: string) => (account: Account): Option<CustomerTelephone> => pipe(
  account,
  prop('telephones'),
  findFirst(({ contact }) => contact === number)
)

export const getMobilePhone: (account: Account) => Option<MobileCustomerTelephone> = flow(
  prop('telephones'),
  findFirst(({ _type }) => _type === 'Mobile')
)

export const getPostcode = (postcode: string) => (account: Account): Option<string> => pipe(
  account,
  prop('postcodes'),
  findFirst((p) => postcode === p)
)

export const fromNewAccount = (n: NewAccount): Account => ({
  ...n,
  requestedDocuments: [],
  customers: [],
  notifications: []
})
