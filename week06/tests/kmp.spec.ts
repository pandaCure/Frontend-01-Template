import { kmp, handlePattern, movePrefixArrFun } from '../kmp'
const matchArr = [0, 0, 1, 2, 0, 1, 2, 3, 1]
const moveMatchArr = [-1, 0, 0, 1, 2, 0, 1, 2, 3]
describe('kmp test', () => {
  test('test prefix table', () => {
    expect(handlePattern('ababcabaa', [], 9)).toEqual(matchArr)
    expect(movePrefixArrFun(matchArr)).toEqual(moveMatchArr)
    expect(kmp('ad', 'abacad')).toEqual(undefined)
  })
})
