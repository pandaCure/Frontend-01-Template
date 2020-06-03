import parseCssRules from '../parse-css-rules'
test('test parse css rules', () => {
  expect(parseCssRules('div', document.querySelector('div')))
})
