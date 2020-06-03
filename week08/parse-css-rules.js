// 可以用css库来实现
const mathCommonCssRules = /^\*/g
const mathElementCssRules = /^([^.#:\[]+)/g
const matchIdCssRules = /\#([a-zA-Z]+)/g
const matchClassCssRules = /\.([a-zA-Z]+)/g
const rulesArr = [
  { mathRule: mathCommonCssRules, flags: 'commonRule' },
  { mathRule: mathElementCssRules, flags: 'eleRule' },
  { mathRule: matchIdCssRules, flags: 'idRule' },
  { mathRule: matchClassCssRules, flags: 'classRule' }
]
const handleCompositeStack = (compositeRule, cssRuleTree) => {
  console.log(compositeRule)
  // 匹配*或者元素(二者只能保留一个)且在每一个复合选择器只能出现一次
  for (let rule of rulesArr) {
    const { mathRule, flags } = rule
    if (mathRule.test(compositeRule)) {
      console.log(compositeRule.match(mathRule))
      Object.defineProperty(cssRuleTree, flags, {
        get() {
          const result = compositeRule.match(mathRule)
          return result
        }
      })
    }
  }
  return cssRuleTree
}
const parseCssRules = (rules, dom) => {
  // 将复杂选择器拆成复合选择器
  // div div.a#id[attr=1]
  const compositeRuleStacks = rules.split(' ')
  // 将复合选择器拆成简单选择器
  console.log(compositeRuleStacks)
  // 链表
  let cssRuleTree = null
  let head = null
  for (let compositeRule of compositeRuleStacks.reverse()) {
    const node = handleCompositeStack(compositeRule, {})
    if (cssRuleTree === null) {
      head = cssRuleTree = node
    } else {
      head.next = node
      head = node
    }
  }
  console.log(cssRuleTree)
  let domNode = dom
  let match = false
  while (domNode !== null && cssRuleTree !== undefined) {
    // 获取ele
    const ele = domNode.tagName.toLowerCase()
    // 存在就要比较
    if (cssRuleTree['eleRule']) {
      if (cssRuleTree['eleRule'].join('') !== ele) {
        domNode = domNode.parentElement
        match = false
        break
      }
    }
    // 获取id 唯一 不存在列表
    const idList = domNode.id
    if (cssRuleTree['idRule']) {
      // 处理乱序
      const sortRule = cssRuleTree['idRule'].sort().join('').replace(/\#/g, '')
      const currentRule = idList.split(' ').sort().join('')
      if (sortRule !== currentRule) {
        domNode = domNode.parentElement
        match = false
        break
      }
    }
    // 获取class
    const classList = domNode.className
    if (cssRuleTree['classRule']) {
      const sortRule = cssRuleTree['classRule']
        .sort()
        .join('')
        .replace(/\./g, '')
      const currentRule = classList.split(' ').sort().join('')
      if (sortRule !== currentRule) {
        domNode = domNode.parentElement
        match = false
        break
      }
    }
    cssRuleTree = cssRuleTree.next
    domNode = domNode.parentElement
    match = true
    // 获取属性
    const attrNameList = domNode.getAttributeNames()
    // if (cssRuleTree['commonRule'])
  }
  return match
}
console.log(
  parseCssRules('div div.a[attr=1].c#b', document.querySelector('#b'))
)
