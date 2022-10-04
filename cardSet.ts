import * as zod from 'zod'

export const cardNumberValidator = zod.number()
  .int('卡片必須為整數')
  .gte(1, '卡片必須大於等於1')
  .lte(13, '卡片必須小於等於13')

export type CardNumberType = zod.infer<typeof cardNumberValidator>

export enum CardStyle {
  SPADE, 
  HEART,
  SQUARE,
  FLOWER,
}

export const cardStyleValidator = zod.nativeEnum(CardStyle, {
  errorMap: () => ({
    message: '花色不符合規範',
  })
})

export type CardStyleType = zod.infer<typeof cardStyleValidator>

export type CardType = [CardStyleType, CardNumberType];

export function newWithCardSet(): CardType[] {
  const result: CardType[] = [];
  const mainStyle = [
    CardStyle.SPADE,
    CardStyle.HEART,
    CardStyle.SQUARE,
    CardStyle.FLOWER,
  ]

  mainStyle.forEach((styleItem) => {
    for (let i = 1;i <= 13; i++) {
      result.push([
        styleItem,
        i,
      ])
    }
  });

  return result;
}
