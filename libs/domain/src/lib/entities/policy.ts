import { PolicyDocument, PolicyDocumentV } from './document'
import { date } from 'io-ts-types'
import * as t from 'io-ts'

export interface Policy {
  ogi_ref: string
  start: Date
  end: Date
  documents: PolicyDocument[]
}

export const PolicyV = t.strict({
  ogi_ref: t.string,
  start: date,
  end: date,
  documents: t.array(PolicyDocumentV)
})
