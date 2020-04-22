import {
  matchDecimalInteger,
  mathNumberIntegerLiteral
} from '../../matchNumericLiterals'
describe('DecimalLiteral', () => {
  test('DecimalIntegerLiteral . DecimalDigits(opt) ExponentPart(opt)', () => {
    expect(matchDecimalInteger('')).toBeFalsy()
    //
    expect(matchDecimalInteger('1.')).toBeTruthy()
    // 10进制小数测试
    expect(matchDecimalInteger(1.1)).toBeTruthy()
    expect(
      matchDecimalInteger(1.18888882128123813819239128331873813)
    ).toBeTruthy()
    // 10进制小数指数测试
    expect(matchDecimalInteger(1.011111e10)).toBeTruthy()
    expect(matchDecimalInteger('1.011111e+10')).toBeTruthy()
    expect(matchDecimalInteger(1.011111e-10)).toBeTruthy()
    // 错误写法
    expect(matchDecimalInteger('1.0000e')).toBeFalsy()
    expect(matchDecimalInteger('1.e')).toBeFalsy()
    expect(matchDecimalInteger('01')).toBeFalsy()
    expect(matchDecimalInteger('1s10')).toBeFalsy()
    expect(matchDecimalInteger('1e/10')).toBeFalsy()
    expect(matchDecimalInteger('000000')).toBeFalsy()
  })
  test('. DecimalDigits ExponentPart(opt)', () => {
    // 10进制小数指数测试
    expect(matchDecimalInteger('.1')).toBeTruthy()
    expect(matchDecimalInteger('.11111787677')).toBeTruthy()
    expect(matchDecimalInteger('.1e10')).toBeTruthy()
    expect(matchDecimalInteger('.1e+10')).toBeTruthy()
    expect(matchDecimalInteger('.1e-10')).toBeTruthy()
  })
  test('DecimalIntegerLiteral ExponentPart(opt)', () => {
    // 10整数进制测试
    expect(matchDecimalInteger(0)).toBeTruthy()
    expect(matchDecimalInteger(1)).toBeTruthy()
    expect(matchDecimalInteger(1882737)).toBeTruthy()
    // 10进制整数指数
    expect(matchDecimalInteger(1e10)).toBeTruthy()
    expect(matchDecimalInteger('1e+10')).toBeTruthy()
    expect(matchDecimalInteger(1e-10)).toBeTruthy()
  })

  test('mathNumberIntegerLiteral run DecimalInteger is success', () => {
    //
    expect(mathNumberIntegerLiteral('1.')).toBeTruthy()
    // 10进制小数测试
    expect(mathNumberIntegerLiteral('1.1')).toBeTruthy()
    expect(
      mathNumberIntegerLiteral('1.18888882128123813819239128331873813')
    ).toBeTruthy()
    // 10进制小数指数测试
    expect(mathNumberIntegerLiteral('1.011111e10')).toBeTruthy()
    expect(mathNumberIntegerLiteral('1.011111e+10')).toBeTruthy()
    expect(mathNumberIntegerLiteral('1.011111e-10')).toBeTruthy()
    // 错误写法
    expect(mathNumberIntegerLiteral('1.0000e')).toBeFalsy()
    expect(mathNumberIntegerLiteral('1.e')).toBeFalsy()
    expect(mathNumberIntegerLiteral('01')).toBeFalsy()
    expect(mathNumberIntegerLiteral('1s10')).toBeFalsy()
    expect(mathNumberIntegerLiteral('1e/10')).toBeFalsy()
    expect(mathNumberIntegerLiteral('000000')).toBeFalsy()

    expect(mathNumberIntegerLiteral('.1')).toBeTruthy()
    expect(mathNumberIntegerLiteral('.11111787677')).toBeTruthy()
    expect(mathNumberIntegerLiteral('.1e10')).toBeTruthy()
    expect(mathNumberIntegerLiteral('.1e+10')).toBeTruthy()
    expect(mathNumberIntegerLiteral('.1e-10')).toBeTruthy()

    // 10整数进制测试
    expect(mathNumberIntegerLiteral('0')).toBeTruthy()
    expect(mathNumberIntegerLiteral('1')).toBeTruthy()
    expect(mathNumberIntegerLiteral('1882737')).toBeTruthy()
    // 10进制整数指数
    expect(mathNumberIntegerLiteral('1e10')).toBeTruthy()
    expect(mathNumberIntegerLiteral('1e+10')).toBeTruthy()
    expect(mathNumberIntegerLiteral('1e-10')).toBeTruthy()
  })
})
