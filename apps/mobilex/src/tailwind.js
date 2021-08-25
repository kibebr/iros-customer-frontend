import { create } from 'tailwind-rn'
import styles from '../styles.json'

const extraStyles = {
  'font-karla': {
    fontFamily: 'Karla-Medium'
  },
  'font-bold': {
    fontFamily: 'Karla-Bold'
  }
}

export const { tailwind: tw, getColor } = create({
  ...styles,
  ...extraStyles
})
