# 理解KMP算法背后的原理

在平时开发中，我们常常需要知道一个字符串是否包含另一个字符串，当然js也为我们提供了方法，比如~'abc'.indexOf('x') === 0或者startsWith等方法，但是这些方法都有自己的局限性，indexOf只能是单个字符，而startsWith和endsWith只能查找开头和结尾的字符串，并不能找到中间是不是连贯包含，所以这时候就要封装方法了，比如想要知道abca是否包含bc
```javascript
// 例子一
const findString = (text) => {
  let isExistB = false
  let isExistC = false
  for (let char of text) {
    if (char === 'b') {
      isExistB = true
    } else if (char === 'c') {
      isExistC = true
    } else {
      isExistB = false
      isExistC = false
    }
    if (isExistB && isExistC) break
  }
  return isExistB && isExistC
}
```
👆的代码有一个缺点就是把模式匹配的字符串写死在代码里，不满足软件设计的封装性和可维护行，那么怎么改👆的代码呢，那只需要把比较的字符串作为形参传入函数
```javascript
// 例子二
const findString = (pattern, text) => {
  let i
  let j
  let isExist = false
  for (i = 0; i < text.length) {
    for (j = 0; j < pattern.length) {
      if (text[i] === pattern[j]) {
        i++
        j++
      } else {
        i++
        j = 0
      }
      if (j === pattern.length) isExist = true
    }
  }
  return isExist
}
```
👆的代码看似已经很不错了，但是它的时间复杂度却是O(pattern.length * text.length)， 是指数型的，但是例子一的时间复杂度是线性的，那有没有什么方法既可以是线性时间复杂度，有满足封装性和可维护性，那我们就需要引入一个概念有限自动状态机(DFA)，什么是有限自动状态

从例子一可以发现每当输入text[i] 当前的就会放生状态的转移，无论是输入正确的转入下一个状态，还是输入错误恢复到某一个状态，那用有限自动状态机改写例子一的代码
```javascript
const findString = (text) => {
  let state = startState
  for (let char of text) {
    state = state(char)
  }
  return state === end
}
const changeStateAnyToStart = function startState (char) {
  if (char === 'b') {
    return changeStateBToStateC
  } else {
    return changeStateAnyToStart
  }
}
function changeStateBToStateC (char) {
  if (char === 'c') {
    return end
  } else {
    return changeStateAnyToStart
  }
}
function end (char) {
  return end
}
```
👆的有限自动状态机的代码时间复杂度变成线性的，但还是存在老问题，就是软件设计的封装性和可维护行，那就用例子二的方法。但存在一个问题就是：👆代码的状态转换的模式字符串是写在在代码里面的，当模式字符串作为形参穿进去，怎么生成状态和什么时候切换状态？这时候引入一个概念：有限自动状态机状态表dfa[][j],有了这张表就可以知道，在j状态下输入任意字符，当前状态要转换到哪一个状态。此时，转换状态就要临成功状态和失败状态。初始化一个状态dfa[pat[0]][0] = 1
```javascript
const findString = (pattern, text) => {
  const dfa = Array(255).fill(Array(pattern.length).fill(0))
  const reStartState = []
  // 在0 状态下只有输入 text[i] === pattern.chatAt(0)才能进入成功状态
  dfa[0][pattern.chatAt(0)] = 1
  // 恢复 到 状态
  reStartState[0] = 0
  for (let j = 1; j < pattern.length; j++) {
    for (let c = 0; i < 256; i++) {
      dfa[j][c] = dfa[reStartState[j-1]][c]
    }
    dfa[j][pattern.charAt(j)] = j + 1
    // 可以看出 只有存在最大前缀等于最大后缀的时候 才会更新 reStartState的值 且reStartState的值=最大前缀的值
    reStartState[j] = dfa[reStartState[j-1]][pattern.charAt(j)]
  }
  const M = pattern.length
  const N = text.length
  // pat 的初始态为 0
  let j = 0;
  for (int i = 0; i < N; i++) {
      // 计算 pat 的下一个状态
      j = dfa[j][text.charAt(i)]
      // 到达终止态，返回结果
      if (j == M) return i - M + 1
  }
  // 没到达终止态，匹配失败
  return -1
}
```
成功状态下：在j状态下输入text[i],此时text[i] == pat[j],那么可以推导出dfa[pat[j]][j] = j+1
失败状态下：初始的第一列，即状态0时，匹配失败应该还是状态0，也就是除上述dfa[pat[0]][0] = 1外，其他都为状态0。先初始换一个恢复状态的数组reStartState[0]=0

那么状态j时，匹配失败：（模拟回溯）text[i] !== pattern[j]
0 1 2 3 4
        i
a b a b w k h a b c d a
      b c d a
        j
        1
     0 1 2 3 4
// TODO 不太好些  不知道怎么用一些