import { getEq, elem } from 'fp-ts/Array'
import { Eq as NumberEq } from 'fp-ts/number'
import { Eq as StringEq, split } from 'fp-ts/string'

export const join = (separator: string) => <A>(x: A[]): string => x.join(separator)

// Equal instance for Array<number>
export const eqNumbers = getEq(NumberEq)

// elem with a StringEq instance partially applied
export const elemString = elem(StringEq)

// string -> Array<string>, with no delimiter
export const fromString = split('')

// Array<A> -> number
export const length = (arr: unknown[]): number => arr.length
