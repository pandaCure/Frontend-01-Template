const convertNumberToString = (num: number, dec: number = 10): string => {
  // 由于传进来的时候number会自动转换成相应的10进制数 不然就得模拟字符串了
  /**
   * TODO:
   * 1、number length 溢出 转换为 e10这种
   * 2、16进制处理
   * */

  if (1 / num === -Infinity) return '-0'
  if (1 / num === Infinity) return '0'
  let integer = Math.floor(num)
  let fraction = num - integer
  let str = integer > 0 ? '' : '0'
  while (integer > 0) {
    str = String(integer % dec) + str
    integer = Math.floor(integer / dec)
  }
  str += fraction > 0 ? '.' : ''
  const convertStr = fraction
  const bufferArray = []
  while (fraction && bufferArray.length <= 53) {
    fraction = fraction * dec
    const index = Math.floor(fraction)
    fraction = fraction - index
    bufferArray.unshift(index)
  }
  if (convertStr) {
    // 精度问题处理 难处理  可能需要转成2进制 让IEEE 754来处理
    const truthLength = String(convertStr).length - 2
    if (truthLength !== bufferArray.length) {
      const m = bufferArray
        .splice(-truthLength - 1)
        .reverse()
        .join('')
      str += m
    } else {
      str += bufferArray.reverse().join('')
    }
  }
  return str
}
export default convertNumberToString
// The following switch statement is only concerned about placement,
// updates, and deletions. To avoid needing to add a case for every possible
// bitmap value, we remove the secondary effects from the effect tag and
// switch on that value.
