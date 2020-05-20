const dfa = (text: string) => {
  let state = start
  for (let char of text) {
    state = state(char)
  }
  return state === end
}
function start(char: string) {
  return char === 'a' ? foundB1 : start
}
function foundB1(char: string) {
  return char === 'b' ? foundA1 : start
}

function foundA1(char: string) {
  return char === 'a' ? foundB2 : foundB1(char)
}
function foundB2(char: string) {
  return char === 'b' ? foundA2 : start
}

function foundA2(char: string) {
  return char === 'a' ? foundA3 : start
}

function foundA3(char: string) {
  return char === 'b' ? foundX : start
}

function foundX(char: string) {
  return char === 'x' ? end : foundA2(char)
}
function end(char: string) {
  return end
}
export default dfa
