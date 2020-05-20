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