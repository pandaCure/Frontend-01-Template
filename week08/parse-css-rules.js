const parseCssRules = (rules, dom) => {
  // 将复杂选择器拆成复合选择器
  // div div.a#id[attr=1]
  const compositeStack = rules.split(' ')
  // 将复合选择器拆成简单选择器
  console.log(compositeStack)
  return false
}
parseCssRules('div div.a#id[attr=1]', document.querySelector('#target'))
