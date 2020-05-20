const EOF = Symbol.for('EOF')
let currentToken = null
let currentAtteribute = null
let stack = [{ type: 'document', children: [] }]
let currentTextNode = null // 处理文本节点
// ------------------------------------
let rules = []
const css = require('css')
function addCSSRules(text) {
  let ast = css.parse(text)
  //   console.log(JSON.stringify(ast, null, '\n'))
  rules.push(...ast.stylesheet.rules)
}
function match(element, selector) {
  if (!selector || !element.attributes) return false
  if (selector.charAt(0) === '#') {
    const attr = element.attributes.filter((attr) => attr.name === 'id')[0]
    if (attr && attr.value === selector.replace('#', '')) return true
  } else if (selector.charAt(0) === '.') {
    const attr = element.attributes.filter((attr) => attr.name === 'class')[0]
    if (attr && attr.value === selector.replace('.', '')) return true
  } else {
    if (element.tagName === selector) return true
  }
  return false
}
function specificity(selector) {
  const p = [0, 0, 0, 0]
  const selectorParts = selector.split(' ')
  for (let part of selectorParts) {
    if (part.charAt(0) === '#') {
      p[1] += 1
    } else if (part.charAt(0) === '.') {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}
function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) return sp1[0] - sp2[0]
  if (sp1[1] - sp2[1]) return sp1[1] - sp2[1]
  if (sp1[2] - sp2[2]) return sp1[2] - sp2[2]
  return sp1[3] - sp2[3]
}
function computeCSS(element) {
  //   console.log(rules)
  //   console.log(element)
  let elements = stack.slice().reverse()
  if (!element.computedStyle) {
    element.computedStyle = {}
  }
  for (let rule of rules) {
    //   const sele
    let selectorParts = rule.selectors[0].split(' ').reverse()
    if (!match(element, selectorParts[0])) continue
    let matched = false
    let j = 1
    for (let ele of elements) {
      if (match(ele, selectorParts[j])) {
        j++
      }
    }
    if (j >= selectorParts.length) matched = true
    if (matched) {
      //   console.log('element', element, 'match rule', rule)
      let sp = specificity(rule.selectors[0])
      let computedStyle = element.computedStyle
      for (let declaration of rule.declarations) {
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {}
        }
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        } else if (
          compare(computedStyle[declaration.property].specificity, sp) < 0
        ) {
          for (let k = 0; k < 4; k++) {
            computedStyle[declaration.property] = declaration.value
            computedStyle[declaration.property].specificity = sp
          }
        }
        computedStyle[declaration.property].value = declaration.value
      }
      console.log(element.computedStyle)
    }
  }
}
// ------------------------------------
function emit(token) {
  let top = stack[stack.length - 1]
  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }
    element.tagName = token.tagName
    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }
    computeCSS(element)
    top.children.push(element)
    element.parent = top
    if (!token.isSelfClosing) {
      stack.push(element)
    }
    currentTextNode = null
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error('xxxxx')
    } else {
      // -------------------> 遇到style标签 执行添加css规则
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content)
      }
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
  //   if (token.type !== 'text') {
  //     console.log(token)
  //   }
}
function afterQuotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char === '/') {
    return selfClosingStartTag
  } else if (char === '>') {
    currentToken[currentAtteribute.name] = currentAtteribute.value
    emit(currentToken)
    return parseStart
  } else if (char === EOF) {
  } else {
    currentAtteribute.value += char
    return doubleQuotedAttributeValue
  }
}
function doubleQuotedAttributeValue(char) {
  if (char === '"') {
    currentToken[currentAtteribute.name] = currentAtteribute.value
    return afterQuotedAttributeValue
  } else if (char === '\u0000') {
  } else if (char === EOF) {
  } else {
    currentAtteribute.value += char
    return doubleQuotedAttributeValue
  }
}
function singleQuotedAttributeValue(char) {
  if (char === "'") {
    currentToken[currentAtteribute.name] = currentAtteribute.value
    return afterQuotedAttributeValue
  } else if (char === '\u0000') {
  } else if (char === EOF) {
  } else {
    currentAtteribute.value += char
    return doubleQuotedAttributeValue
  }
}
function UnquoAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    currentToken[currentAtteribute.name] = currentAtteribute.value
    return beforeAttributeName
  } else if (char === '/') {
    currentToken[currentAtteribute.name] = currentAtteribute.value
    return selfClosingStartTag
  } else if (char === '>') {
    currentToken[currentAtteribute.name] = currentAtteribute.value
    emit(currentToken)
    return parseStart
  } else if (char === '\u0000') {
  } else if (
    char === '"' ||
    char === "'" ||
    char === '<' ||
    char === '=' ||
    char === '`'
  ) {
  } else if (char === EOF) {
  } else {
    currentAtteribute.value += char
    return UnquoAttributeValue
  }
}
function beforeAttributeValue(char) {
  if (
    char.match(/^[\t\n\f ]$/) ||
    char === '/' ||
    char === '>' ||
    char === EOF
  ) {
    return beforeAttributeValue
  } else if (char === '"') {
    return doubleQuotedAttributeValue
  } else if (char === "'") {
    return singleQuotedAttributeValue
  } else if (char === '>') {
  } else {
    return UnquoAttributeValue(char)
  }
}
function afterAttributeName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (char === '/') {
    return selfClosingStartTag
  } else if (char === '=') {
    return beforeAttributeValue
  } else if (char === '>') {
    currentToken[currentAtteribute.name] = currentAtteribute.value
    emit(currentToken)
    return parseStart
  } else if (char === EOF) {
  } else if (char === "'" || char === '"' || char === '<') {
  } else {
    currentToken[currentAtteribute.name] = currentAtteribute.value
    currentAtteribute = {
      name: '',
      value: ''
    }
    return attributeName(char)
  }
}
function attributeName(char) {
  if (
    char.match(/^[\t\n\f ]$/) ||
    char === '/' ||
    char === '>' ||
    char === EOF
  ) {
    return afterAttributeName(char)
  } else if (char === '=') {
    return beforeAttributeValue
  } else if (char === '\u0000') {
  } else if (char === "'" || char === ' ' || char === '<') {
  } else {
    currentAtteribute.name += char
    return attributeName
  }
}
function beforeAttributeName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char === '>' || char === '/' || char === EOF) {
    return afterAttributeName(char)
  } else if (char === '=') {
    // 报错
  } else {
    currentAtteribute = {
      name: '',
      value: ''
    }
    return attributeName(char)
  }
}
function selfClosingStartTag(char) {
  if (char === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return parseStart
  } else if (char === 'EOF') {
  } else {
  }
}
function tagName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char === '/') {
    return selfClosingStartTag
  } else if (char.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += char
    return tagName
  } else if (char === '>') {
    emit(currentToken)
    return parseStart
  } else {
    return tagName
  }
}

function endTagOpen(char) {
  if (char.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(char)
  } else if (c === '>') {
  } else if (c === EOF) {
  } else {
  }
}
function tagOpen(char) {
  if (char === '/') {
    return endTagOpen
  } else if (char.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(char)
  } else {
    return false
  }
}
function parseStart(char) {
  if (char === '<') {
    return tagOpen
  } else if (char === EOF) {
    emit({ type: 'EOF' })
    return false
  } else {
    emit({ type: 'text', content: char })
    return parseStart
  }
}
const parseHTML = (html) => {
  let state = parseStart
  for (let char of html) {
    state = state(char)
  }
  state = state(EOF)
  return stack[0]
}
module.exports = {
  parseHTML
}
// 手机cssguize
