import styled from 'styled-components/native'
import tailwind from 'tailwind-rn'

export const Circle = styled.View(tailwind('rounded-full'))
export const MediumCircle = styled(Circle)(tailwind('w-14 h-14'))
