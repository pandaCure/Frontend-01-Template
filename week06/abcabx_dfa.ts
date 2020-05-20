const dfa = (text: string) => {
  let state = start
  for (let char of text) {
    state = state(char)
  }
  return state === end
}
function start(char: string) {
  return char === 'a' ? changeStateToB : start
}
function changeStateToB(char: string) {
  return char === 'b' ? changeStateToC : start
}
function changeStateToC(char: string) {
  return char === 'c' ? changeStateToA : start
}
function changeStateToA(char: string) {
  return char === 'a' ? changeStateToSecondB : start
}
function changeStateToSecondB(char: string) {
  return char === 'b' ? changeStateToX : start(char)
}
function changeStateToX(char: string) {
  return char === 'x' ? end : changeStateToC(char)
}
function end() {
  return end
}
export default dfa
//
//            j   0  1  2  3  4  5  6
// dfa[][j]   a   1  0     4
//            b   0  2        5
//            c   0  0  3
//            x   0  0            6

// 重置状态 X
//      a
//          0
//      a   b
//          0   0
//      a   b   c
//          0   0   0
//      a   b   c   a
//          0   0   0   1

// -1 0 0 0 1
