import {
  mathBinaryIntegerLiteral,
  mathNumberIntegerLiteral
} from '../../matchNumericLiterals'
describe('BinaryIntegerLiteral', () => {
  test('BinaryIntegerLiteral :: 0b BinaryDigits 0B BinaryDigits', () => {
    expect(mathBinaryIntegerLiteral('0b111111')).toBeTruthy()
    expect(mathBinaryIntegerLiteral('0b111111')).toBeTruthy()
    expect(mathBinaryIntegerLiteral('0b000000')).toBeTruthy()
    expect(mathBinaryIntegerLiteral('0b000000')).toBeTruthy()
    expect(mathBinaryIntegerLiteral('0b101010')).toBeTruthy()
    expect(mathBinaryIntegerLiteral('0b101010')).toBeTruthy()
    expect(mathBinaryIntegerLiteral('0b010101')).toBeTruthy()
    expect(mathBinaryIntegerLiteral('0b010101')).toBeTruthy()
    expect(mathBinaryIntegerLiteral('0b11110101010101')).toBeTruthy()
    expect(mathBinaryIntegerLiteral('0b10100110101011')).toBeTruthy()

    expect(mathBinaryIntegerLiteral('0b')).toBeFalsy()
    expect(mathBinaryIntegerLiteral('0B')).toBeFalsy()
    expect(mathBinaryIntegerLiteral('0b22222')).toBeFalsy()
    expect(mathBinaryIntegerLiteral('0B22222')).toBeFalsy()
    expect(mathBinaryIntegerLiteral('0a')).toBeFalsy()
    expect(mathBinaryIntegerLiteral('0A')).toBeFalsy()
    expect(mathBinaryIntegerLiteral('0a22222')).toBeFalsy()
    expect(mathBinaryIntegerLiteral('0A22222')).toBeFalsy()
  })
  test('mathNumberIntegerLiteral run BinaryIntegerLiteral is success', () => {
    expect(mathNumberIntegerLiteral('0b111111')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0b111111')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0b000000')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0b000000')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0b101010')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0b101010')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0b010101')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0b010101')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0b11110101010101')).toBeTruthy()
    expect(mathNumberIntegerLiteral('0b10100110101011')).toBeTruthy()

    expect(mathNumberIntegerLiteral('0b')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0B')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0b22222')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0B22222')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0a')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0A')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0a22222')).toBeFalsy()
    expect(mathNumberIntegerLiteral('0A22222')).toBeFalsy()
  })
})
