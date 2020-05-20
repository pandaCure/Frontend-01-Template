import dfa from '../abababx_dfa'
test('', () => {
  expect(dfa('abababx')).toBeTruthy()
  expect(dfa('abaaxsababx')).toBeFalsy()
  expect(dfa('ababababx')).toBeTruthy()
  expect(dfa('abababababababababababababababx')).toBeTruthy()
  expect(dfa('ababababcabababcabababbabababababx')).toBeTruthy()
})
