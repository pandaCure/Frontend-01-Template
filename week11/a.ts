const isNumberOrString = (str: string): boolean => {
  const code = str.charCodeAt(0)
  return (code >= 48 && code <= 57) || (code >= 97 && code <= 122)
}
let i = 0
let j = 0
function isPalindrome(s: string): boolean {
  const toLocaleLowerCaseStr = s.toLocaleLowerCase()
  i = 0
  j = toLocaleLowerCaseStr.length - 1
  // 48 - 57 97 - 122
  while (i <= j) {
    console.log(`***********************`)
    console.log(toLocaleLowerCaseStr[i], i)

    console.log(toLocaleLowerCaseStr[j], j)
    console.log(`***********************`)
    if (!isNumberOrString(toLocaleLowerCaseStr[i])) {
      i++
      continue
    }
    if (!isNumberOrString(toLocaleLowerCaseStr[j])) {
      j--
      continue
    }
    if (toLocaleLowerCaseStr[i] === toLocaleLowerCaseStr[j]) {
      j--
      i++
    } else {
      i++
      j = toLocaleLowerCaseStr.length - 1
    }
  }
  return s.length === 1 ? true : i !== j
}
console.log(isPalindrome('race a car'), i, j)
console.log(isPalindrome('a'), i, j)
console.log(isPalindrome('aa'), i, j)
console.log(isPalindrome('aca'), i, j)
