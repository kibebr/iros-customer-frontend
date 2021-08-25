import { Combination } from 'domain/entities/pincode'
import { useState } from 'react'
import { flow } from 'fp-ts/function'
import { dropRight, append } from 'fp-ts/Array'

type UsePinCodeCombination = [Combination, {
  add: (_: number) => unknown
  erase: () => unknown
  reset: () => unknown
}]

export const usePinCodeCombination = (length: number): UsePinCodeCombination => {
  const [combination, setCombination] = useState<Combination>([])

  return [combination, {
    add: flow(
      (number) => combination.length < length ? append(number)(combination) : combination,
      setCombination
    ),
    erase: () => setCombination(dropRight(1)),
    reset: () => setCombination([])
  }]
}
