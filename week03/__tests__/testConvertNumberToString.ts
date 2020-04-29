import convertNumberToString from '../convertNumberToString'
describe('convert number to string', () => {
  test('start', () => {
    // 0 +0 -0 123 123.123 123E10 123E+10 123E-10 123. .123 123.e+10 .1e+10 123.E+10 .1E+10
    expect(convertNumberToString(11111)).toBe('11111')
    expect(convertNumberToString(0)).toBe('0')
    expect(convertNumberToString(+0)).toBe('0')
    expect(convertNumberToString(-0)).toBe('-0')
    expect(convertNumberToString(123.5)).toBe('123.5')
    expect(convertNumberToString(0.123456789)).toBe('0.1234567889')
  })
})
