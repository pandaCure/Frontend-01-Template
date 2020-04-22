import {
  mathHexIntegerLiteral,
  mathNumberIntegerLiteral
} from '../../matchNumericLiterals'
describe('mathHexIntegerLiteral', () => {
  test('mathHexIntegerLiteral :: 0x HexDigits 0X HexDigits', () => {
    expect(mathHexIntegerLiteral('0x0')).toBeTruthy()
    expect(mathHexIntegerLiteral('0X0')).toBeTruthy()

    expect(mathHexIntegerLiteral('0x0123456789')).toBeTruthy()
    expect(mathHexIntegerLiteral('0X0123456789')).toBeTruthy()

    expect(mathHexIntegerLiteral('0xabcdef')).toBeTruthy()
    expect(mathHexIntegerLiteral('0Xabcdef')).toBeTruthy()

    expect(mathHexIntegerLiteral('0xABCDEF')).toBeTruthy()
    expect(mathHexIntegerLiteral('0XABCDEF')).toBeTruthy()

    expect(mathHexIntegerLiteral('0xABCDEFabcdef0123456789')).toBeTruthy()
    expect(mathHexIntegerLiteral('0XABCDEF0123456789abcdef')).toBeTruthy()

    expect(mathHexIntegerLiteral('0x0123456789abcdefABCDEF')).toBeTruthy()
    expect(mathHexIntegerLiteral('0Xbcdef0123456789ABCDEF')).toBeTruthy()

    expect(mathHexIntegerLiteral('0x47324274adefbCDA8234')).toBeTruthy()
    expect(mathHexIntegerLiteral('0XBCFDaced673482372312')).toBeTruthy()

    expect(mathHexIntegerLiteral('0o')).toBeFalsy()
    expect(mathHexIntegerLiteral('0O')).toBeFalsy()

    expect(mathHexIntegerLiteral('0o-1')).toBeFalsy()
    expect(mathHexIntegerLiteral('0O-1')).toBeFalsy()

    expect(mathHexIntegerLiteral('0oh')).toBeFalsy()
    expect(mathHexIntegerLiteral('0Oh')).toBeFalsy()

    expect(mathHexIntegerLiteral('0oH')).toBeFalsy()
    expect(mathHexIntegerLiteral('0OH')).toBeFalsy()

    expect(mathHexIntegerLiteral('0a0')).toBeFalsy()
    expect(mathHexIntegerLiteral('0A0')).toBeFalsy()
  })

  test('mathNumberIntegerLiteral run HexIntegerLiteral is success', () => {
    expect(mathNumberIntegerLiteral('0x0')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0X0')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0x0123456789')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0X0123456789')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0xabcdef')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0Xabcdef')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0xABCDEF')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0XABCDEF')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0xABCDEFabcdef0123456789')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0XABCDEF0123456789abcdef')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0x0123456789abcdefABCDEF')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0Xbcdef0123456789ABCDEF')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0x47324274adefbCDA8234')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0XBCFDaced673482372312')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0o')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0O')).toBeFalsy()

    expect(mathNumberIntegerLiteral('0o-1')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0O-1')).toBeFalsy()

    expect(mathNumberIntegerLiteral('0oh')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0Oh')).toBeFalsy()

    expect(mathNumberIntegerLiteral('0oH')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0OH')).toBeFalsy()

    expect(mathNumberIntegerLiteral('0a0')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0A0')).toBeFalsy()
  })
})
