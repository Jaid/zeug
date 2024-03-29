import formatThousandsOriginal from 'format-thousands'

const narrowNonBreakingSpace = String.fromCodePoint(8239)

export const formatThousands = number => {
  return formatThousandsOriginal(number, {
    seperator: narrowNonBreakingSpace,
    formatFourDigits: false,
  })
}
