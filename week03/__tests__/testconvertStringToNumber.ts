import convertStringToNumber from '../convertStringToNumber'
describe('test convert string to number', () => {
  test('test 10进制', () => {
    expect(convertStringToNumber('1')).toBe(1)
    expect(convertStringToNumber('1.')).toBe(1)
    expect(convertStringToNumber('.1')).toBe(0.1)
    expect(convertStringToNumber('0')).toBe(0)
    // // // 不清楚是不是做了这个处理
    expect(convertStringToNumber('-0')).toBe(-0)
    expect(convertStringToNumber('-1')).toBe(-1)
    expect(convertStringToNumber('-1.123')).toBe(-1.123)
  })
  test('test 10 进制 指数', () => {
    expect(convertStringToNumber('1e1')).toBe(10)
    expect(convertStringToNumber('.1e1')).toBe(1)
    // 这种总数有精度问题
    expect(convertStringToNumber('.1e-1')).toBe(0.010000000000000002)
    expect(convertStringToNumber('11.123e11')).toBe(1112300000000)
    // TODO: 处理NaN
    // expect(convertStringToNumber('.e1')).toBe(NaN)
  })
  test('handle 2进制', () => {
    expect(convertStringToNumber('ob1', 2)).toBe(1)
    expect(convertStringToNumber('ob11', 2)).toBe(3)
  })
  test('handle 16进制', () => {
    expect(convertStringToNumber('0x1', 16)).toBe(1)
    expect(convertStringToNumber('0x11', 16)).toBe(17)
    expect(convertStringToNumber('0xa', 16)).toBe(10)
  })
})
