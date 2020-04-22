import encodeString from '../../encodeString'
describe('test utf-8 encoding', () => {
  test('encoding', () => {
    expect(encodeString('a')).toEqual('%61')
    expect(encodeString('ۿ')).toEqual(encodeURIComponent('ۿ').toLowerCase())
    expect(encodeString('😊')).toEqual(encodeURIComponent('😊').toLowerCase())
    expect(encodeString('你')).toEqual(encodeURIComponent('你').toLowerCase())
  })
})
