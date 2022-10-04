import { describe, test, expect } from 'vitest'
import {
  cardNumberValidator,
  CardStyle,
  cardStyleValidator,
  newWithCardSet,
} from './cardSet'

describe('testing cardSet', () => {
  test('test card number validation',() => {
    const specInfo: {
      input: number;
      expected: boolean;
    }[] = []

    for(let i  = -1; i < 20; i++) {
      specInfo.push({
        input: i,
        expected: i <= 13 && i >=1,
      })
    }

    specInfo.forEach(item => {
      const {
        success: isCardNumberExpected,
      } = cardNumberValidator.safeParse(item.input)
      expect(isCardNumberExpected).toBe(item.expected)
    })
  })

  test('test card style validation', () => {
    const specInfo: {
      input: number;
      expected: boolean;
    }[] = []

    for(let i  = -1; i < 5; i++) {
      specInfo.push({
        input: i,
        expected: i >=0 && i < 4,
      })
    }

    specInfo.forEach(item => {
      const {
        success: isCardStyleExpected,
      } = cardStyleValidator.safeParse(item.input)
      expect(isCardStyleExpected).toBe(item.expected)
    })
  })

  test('build newWithCardSet() all cluster style success', () => {
    const result = newWithCardSet();
    const getAllStyle = result.map((styleItem) => {
      return styleItem[0]
    })
    const styleNoRepeat = new Set(getAllStyle)
    const styleNoRepeatArray = [...styleNoRepeat]
    styleNoRepeatArray.forEach(item => {
      const specIncludeArray = [
        CardStyle.SPADE,
        CardStyle.HEART,
        CardStyle.SQUARE,
        CardStyle.FLOWER,
      ]
      expect(specIncludeArray).contain(item)
    })
  })

  test('build newWithCardSet() all cluster number success', () => {
    const result = newWithCardSet();
    const getAllNumber = result.map((numberItem) => {
      return numberItem[1]
    })
    const numberNoRepeat = new Set(getAllNumber)
    const numberNoRepeatArray = [...numberNoRepeat]
    numberNoRepeatArray.forEach(item => {
      const specIncludeArray: number[] = []
      for (let i = 1; i<= 13; i++) {
        specIncludeArray.push(i)
      }
      expect(specIncludeArray).contain(item);
    })
  })

})
