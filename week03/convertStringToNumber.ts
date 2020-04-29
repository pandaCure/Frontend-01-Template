const letter = Array(26)
  .fill(1)
  .reduce((init, v, i) => {
    let charCode = 'a'.charCodeAt(0)
    init.set(charCode + i, 10 + i)
    return init
  }, new Map())
/* eslint-disable max-params */
const getNumberCodePoint = (current: string | undefined) => {
  if (!current) return 0
  const zero = '0'.codePointAt(0)
  const currentValue = current.codePointAt(0)
  if (letter.has(currentValue)) return letter.get(currentValue)
  // TODO: 0-9a-z 不然抛出错误
  if (typeof zero === 'number' && typeof currentValue === 'number') {
    return currentValue - zero
  }
  throw new Error(`${current} params has not a correct code point`)
}
const handleExponent = (
  number: number,
  index: number,
  charArr: string[],
  del: number,
  negativeFlag: boolean
): number => {
  const exponentValue = Number(
    charArr.slice(index + 1, charArr.length).join('')
  )
  const negative = negativeFlag ? -1 : 1
  const result = number * del ** (exponentValue * negative)
  return result
}
const convertStringToNumber = (
  stringParams: string,
  del: number = 10
): number => {
  const str = stringParams.toLowerCase()
  if (str === '-0') return -0
  let convertStr = str
  if (del === 2) convertStr = stringParams.slice(2)
  if (del === 16) convertStr = stringParams.slice(2)
  const charsArr = convertStr.split('')
  let number = 0
  let fraction = 1
  const negativeFlag = charsArr[0] === '-'
  let i = negativeFlag ? 1 : 0
  let isFraction = false
  try {
    while (i < charsArr.length) {
      switch (charsArr[i]) {
        case '.':
          i++
          isFraction = true
          break
        case 'e':
          return handleExponent(number, i, charsArr, del, negativeFlag)
        default:
          if (isFraction) {
            fraction = fraction / del
            const currentValue = getNumberCodePoint(charsArr[i])
            number = number + fraction * currentValue
          } else {
            number = number * del
            number += getNumberCodePoint(charsArr[i])
          }
          i++
      }
    }
  } catch (e) {
    return NaN
  }
  return number * (negativeFlag ? -1 : 1)
}
export default convertStringToNumber
