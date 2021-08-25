import React from 'react'
import tailwind from 'tailwind-rn'
import BackIcon from '../../assets/backspace-fill.svg'
import { View, Text, Pressable, PressableProps } from 'react-native'
import { pipe } from 'fp-ts/function'
import { map } from 'fp-ts/Array'

export type PinCodeProps = {
  length: number
  add: (_: number) => unknown
  erase: () => unknown
}

const rows = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

export const PinCodeNumber = ({ number, ...props }: { number: number } & PressableProps): JSX.Element => {
  return (
    <Pressable
      style={tailwind('flex justify-center items-center bg-gray-100 rounded-full w-20 h-20 m-2')}
      {...props}
    >
      <Text style={tailwind('font-bold text-2xl text-gray-600')}>
        {number}
      </Text>
    </Pressable>
  )
}

export const PinCodeCombination = ({ length }: { length: number }): JSX.Element => {
  return (
    <View style={tailwind('flex flex-row')}>
      {pipe(
        [...Array(length)],
        map(() => (
          <View style={tailwind('bg-gray-800 rounded-full w-4 h-4 mr-2')} />
        ))
      )}
    </View>
  )
}

export const PinCode = ({ length, add, erase }: PinCodeProps): JSX.Element => {
  return (
    <View style={tailwind('flex justify-center items-center')}>
      <PinCodeCombination length={length} />

      <View style={tailwind('mb-8')} />

      {pipe(
        rows,
        map((row) => (
          <View style={tailwind('flex flex-row mb-4')}>
            {pipe(row, map((number) => (
              <PinCodeNumber
                number={number}
                onPress={() => add(number)}
              />
            )))}
          </View>
        ))
      )}
      <View style={tailwind('flex flex-row content-around items-center')}>
        <PinCodeNumber
          number={0}
          onPress={() => add(0)}
        />
      </View>

      <Pressable onPress={erase} style={tailwind('absolute right-8 bottom-8')}>
        <BackIcon
          width='24'
          height='24'
          style={[{ fill: 'currentColor' }, tailwind('text-gray-600')]}
        />
      </Pressable>
    </View>
  )
}
