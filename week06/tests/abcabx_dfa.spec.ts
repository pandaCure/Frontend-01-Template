import dfa from '../abcabx_dfa'
test('test dfs', () => {
  expect(dfa('abcbabcabx')).toBeTruthy()
  expect(dfa('abcaabcabx')).toBeTruthy()
  expect(dfa('abcbabcabc')).toBeFalsy()
})
