/**
 *
 *
 */
const handlePattern = (
  pattern: string,
  prefix: number[],
  patternLength: number
) => {
  prefix[0] = 0
  let patternMaxHeadTailSubstringLength = 0
  let currentPatternIndex = 1
  while (currentPatternIndex < patternLength) {
    if (
      pattern[patternMaxHeadTailSubstringLength] ===
      pattern[currentPatternIndex]
    ) {
      patternMaxHeadTailSubstringLength++
      prefix[currentPatternIndex] = patternMaxHeadTailSubstringLength
      currentPatternIndex++
    } else {
      // 重点：状态机需要重置的函数位置
      if (patternMaxHeadTailSubstringLength > 0) {
        patternMaxHeadTailSubstringLength =
          prefix[patternMaxHeadTailSubstringLength - 1]
      } else {
        prefix[currentPatternIndex] = patternMaxHeadTailSubstringLength
        currentPatternIndex++
      }
    }
  }
  return prefix
}
const movePrefixArrFun = (prefixArr: number[]) => {
  for (let i = prefixArr.length - 1; i > 0; i--) {
    prefixArr[i] = prefixArr[i - 1]
  }
  prefixArr[0] = -1
  return prefixArr
}
const kmpSearch = (pattern: string, text: string, movePrefixArr: number[]) => {
  const textArr = text.split('')
  const m = textArr.length
  let i = 0

  const patternArr = pattern.split('')
  const n = patternArr.length
  let j = 0
  while (i < m) {
    if (j === n - 1 && textArr[i] === patternArr[j]) {
      console.log(`字符串在${i - j}出匹配到了`)
      j = movePrefixArr[j]
    }
    if (textArr[i] === patternArr[j]) {
      i++
      j++
    } else {
      j = movePrefixArr[j]
      if (j === -1) {
        i++
        j++
      }
    }
  }
}
const kmp = (pattern: string, text: string) => {
  const prefixArr = handlePattern(pattern, [], pattern.length)
  const movePrefixArr = movePrefixArrFun(prefixArr)
  console.log(movePrefixArr)
  kmpSearch(pattern, text, movePrefixArr)
}
export { kmp, handlePattern, movePrefixArrFun }
