const matchDecimalInteger = (num: number | string): boolean => {
  if (num === '') return false
  // string是为了test
  const convertString: string = String(num)
  // TODO: 再不拆的情况下排除空字符串的匹配
  const regExpTestDecimalInteger = /^(0|([^0]?[1-9](\d+)?))?(\.|(\.\d*)?([eE]([+-])?\d+)?)?$/
  return regExpTestDecimalInteger.test(convertString)
}
const mathBinaryIntegerLiteral = (num: string): boolean => {
  const regRxpBinaryIntegerLiteral = /^(0b|0B)[01]+$/
  return regRxpBinaryIntegerLiteral.test(num)
}
const mathOctalIntegerLiteral = (num: string): boolean => {
  const regRxpBinaryIntegerLiteral = /^(0o|0O)[0-7]+$/
  return regRxpBinaryIntegerLiteral.test(num)
}
const mathHexIntegerLiteral = (num: string): boolean => {
  const regRxpBinaryIntegerLiteral = /^(0x|0X)[0-9a-fA-F]+$/
  return regRxpBinaryIntegerLiteral.test(num)
}
const mathNumberIntegerLiteral = (num: string): boolean => {
  const regExp = /^((0|([^0]?[1-9](\d+)?))(\.|(\.\d*)?([eE]([+-])?\d+)?)?)$|^((0|([^0]?[1-9](\d+)?))?(\.|(\.\d*)?([eE]([+-])?\d+)?))$|^((0b|0B)[01]+)$|^((0o|0O)[0-7]+)$|^((0x|0X)[0-9a-fA-F]+)$/
  return regExp.test(num)
}
export {
  matchDecimalInteger,
  mathBinaryIntegerLiteral,
  mathOctalIntegerLiteral,
  mathHexIntegerLiteral,
  mathNumberIntegerLiteral
}
