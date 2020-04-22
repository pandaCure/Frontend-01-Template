import {
  mathOctalIntegerLiteral,
  mathNumberIntegerLiteral
} from '../../matchNumericLiterals'
describe('OctalIntegerLiteral', () => {
  test('OctalIntegerLiteral :: 0o OctalDigits 0O OctalDigits', () => {
    expect(mathOctalIntegerLiteral('0o7')).toBeTruthy()
    expect(mathOctalIntegerLiteral('0O7')).toBeTruthy()

    expect(mathOctalIntegerLiteral('0o01234567')).toBeTruthy()
    expect(mathOctalIntegerLiteral('0O01234567')).toBeTruthy()

    expect(mathOctalIntegerLiteral('0o00000000')).toBeTruthy()
    expect(mathOctalIntegerLiteral('0O00000000')).toBeTruthy()

    expect(mathOctalIntegerLiteral('0o77777777')).toBeTruthy()
    expect(mathOctalIntegerLiteral('0O77777777')).toBeTruthy()

    expect(mathOctalIntegerLiteral('0o3122535123515')).toBeTruthy()
    expect(mathOctalIntegerLiteral('0O3125512341253521')).toBeTruthy()

    expect(mathOctalIntegerLiteral('0o012345678')).toBeFalsy()
    expect(mathOctalIntegerLiteral('0O012345678')).toBeFalsy()

    expect(mathOctalIntegerLiteral('0o-1')).toBeFalsy()
    expect(mathOctalIntegerLiteral('0O-1')).toBeFalsy()

    expect(mathOctalIntegerLiteral('0o88888888')).toBeFalsy()
    expect(mathOctalIntegerLiteral('0O88888888')).toBeFalsy()

    expect(mathOctalIntegerLiteral('0o8')).toBeFalsy()
    expect(mathOctalIntegerLiteral('0O8')).toBeFalsy()

    expect(mathOctalIntegerLiteral('0a11111111')).toBeFalsy()
    expect(mathOctalIntegerLiteral('0A11111111')).toBeFalsy()

    expect(mathOctalIntegerLiteral('0a1')).toBeFalsy()
    expect(mathOctalIntegerLiteral('0A1')).toBeFalsy()
  })

  test('mathNumberIntegerLiteral run OctalIntegerLiteral is success', () => {
    expect(mathNumberIntegerLiteral('0o7')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0O7')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0o01234567')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0O01234567')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0o00000000')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0O00000000')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0o77777777')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0O77777777')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0o3122535123515')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0O3125512341253521')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0o012345678')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0O012345678')).toBeFalsy()

    expect(mathNumberIntegerLiteral('0o-1')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0O-1')).toBeFalsy()

    expect(mathNumberIntegerLiteral('0o88888888')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0O88888888')).toBeFalsy()

    expect(mathNumberIntegerLiteral('0o8')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0O8')).toBeFalsy()

    expect(mathNumberIntegerLiteral('0a11111111')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0A11111111')).toBeFalsy()

    expect(mathNumberIntegerLiteral('0a1')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0A1')).toBeFalsy()
  })
})
