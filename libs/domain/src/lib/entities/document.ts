import { UUID, date } from 'io-ts-types'
import * as t from 'io-ts'

export type Extension
  = 'pdf'
  | 'jpeg'
  | 'png'

export type Mime
  = 'application/pdf'
  | 'image/jpeg'
  | 'image/png'

export type RequestedDocumentDetails = {
  uuid: string
  type: string
  message: string
  name: string
}

export const RequestedDocumentDetailsV = {
  uuid: UUID,
  type: t.string,
  message: t.string,
  name: t.string
}

export type PendingDocument
  = RequestedDocumentDetails
  & { _type: 'PendingDocument' }

export const PendingDocumentV = t.type({
  _type: t.literal('PendingDocument') ,
  ...RequestedDocumentDetailsV
})

export type RejectedPendingDocument
  = RequestedDocumentDetails
  & { _type: 'RejectedPendingDocument' }

export const RejectedPendingDocumentV = t.type({
  _type: t.literal('RejectedPendingDocument') ,
  ...RequestedDocumentDetailsV
})

export type ApprovedPendingDocument
  = RequestedDocumentDetails
  & { path: string }
  & { _type: 'ApprovedPendingDocument' }

export const ApprovedPendingDocumentV = t.type({
  _type: t.literal('ApprovedPendingDocument') ,
  path: t.string,
  ...RequestedDocumentDetailsV
})

export type RequestedDocument
  = PendingDocument
  | RejectedPendingDocument
  | ApprovedPendingDocument

export const RequestedDocumentV = t.union([
  ApprovedPendingDocumentV, 
  RejectedPendingDocumentV,
  PendingDocumentV
])

export type PolicyDocument = {
  _type: 'PolicyDocument'
  uuid: string
  type: string
  createdAt: Date
  size: number
  hash: string
  path: string
  mime: Mime
}

export const PolicyDocumentV = t.strict({
  _type: t.literal('PolicyDocument'),
  uuid: UUID,
  type: t.string,
  createdAt: date,
  size: t.number,
  hash: t.string,
  path: t.string,
  mime: t.string
})

export type Document
  = RequestedDocument
  | PolicyDocument

export const DocumentV = t.union([
  RequestedDocumentV,
  PolicyDocumentV
])

export const getExtension = ({ mime }: PolicyDocument): Extension => {
  switch (mime) {
    case 'application/pdf':
      return 'pdf'
    case 'image/jpeg':
      return 'jpeg'
    case 'image/png':
      return 'png'
  }
}
