// 疑问：
// 思路：匹配所有的Unicode 就要把不合法排除掉就行 这些emoji太难处理 \u{0-10FFFF}怎么处理
// TODO: 参考写法？？？？？
const mathStringLiterals = (str: string): boolean => {
  // const regExpDoubleQuote = /^"([^"\n\r\u000A\u000D])?|(\u2028|\u2029)*|(\\["'\\bfnrtv])*|(\\[^xu1-9])?(\0[^\.])*|(\x[0-9]{2,})*|(\u[0-9]{4,})*|(\u{\\[xX][0-9]{4,7}})*|[\u0000-\uFFFF]*|[0-9]*"$/g
  const regExpDoubleQuote = /^""+"$|\n|\r|\u|000A|\u000D|(^"\x[0-9]?"$)|(\u[0-9]{0,3}?)|(\u{[0-9a-fA-f]{7,}})|^\\$|\0\.[0-9]+/
  return !regExpDoubleQuote.test(str)
}
export default mathStringLiterals
