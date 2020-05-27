/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable complexity */
/* eslint-disable guard-for-in */
const layout = (element) => {
  //   console.log(element)
  if (!element.computedStyle) return
  const elementStyle = getStyle(element)
  if (elementStyle.display !== 'flex') return
  const items = element.children.filter((e) => e.type === 'element')
  items.sort((a, b) => (a.order || 0) - (b.order || 0))
  const style = elementStyle
  ;[('width', 'height')].forEach((size) => {
    if (style[size] === 'auto' || style[size] === '') {
      style.size = null
    }
  })
  if (!style.flexDirection || style.flexDirection === 'auto') {
    // 默认主轴方向
    style.flexDirection = 'row'
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch'
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start'
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap'
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch'
  }
  let mainSize
  let mainStart
  let mainEnd
  let mainSign
  let mainBase
  let crossSize
  let crossStart
  let crossEnd
  let crossSign
  let crossBase
  if (style.flexDirection === 'row') {
    mainSize = 'width'
    mainStart = 'left'
    mainEnd = 'right'
    mainSign = +1 // 方向
    mainBase = 0

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width'
    mainSign = 'right'
    mainEnd = 'left'
    mainSign = -1
    mainBase = style.width

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }
  if (style.flexDirection === 'column') {
    mainSize = 'height'
    mainSize = 'top'
    mainEnd = 'bottom'
    mainSign = +1
    mainBase = 0

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }
  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height'
    mainStart = 'bottom'
    mainEnd = 'top'
    mainSign = -1
    mainBase = style.high

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }
  if (style.flexWrap === 'wrap-reverse') {
    const tmp = crossStart
    crossStart = crossEnd
    crossEnd = tmp
    crossSign = -1
  } else {
    crossBase = 0
    crossSign = 1
  }
  // 计算父元素宽度
  let isAutoMainSize = false
  if (!style[mainSize]) {
    elementStyle[mainSize] = 0
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemStyle = getStyle(item)
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== undefined) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize]
      }
    }
    isAutoMainSize = true
  }
  // 换行处理
  let flexLine = []
  const flexLines = [flexLine]
  let mainSpace = elementStyle[mainSize]
  var crossSpace = 0
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemStyle = getStyle(item)
    if (itemStyle[mainSize] === null) itemStyle[mainSize] = 0

    if (itemStyle.flex) {
      flexLine.push(item)
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      // 应该两种情况吧 ？？？？？？
      mainSpace -= itemStyle[mainSize]
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      flexLine.push(item)
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize]
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace
        flexLine.crossSpace = crossSpace
        flexLine = [item]
        flexLines.push(flexLine)
        mainSpace = style[mainSize]
        crossSpace = 0
      } else {
        flexLine.push(item)
      }
      console.log(crossSpace)
      if (
        itemStyle[crossSize] !== null &&
        itemStyle[crossSize] !== Math.max(crossSpace, itemStyle[crossSize])
      ) {
        mainSpace -= itemStyle[mainSize]
      }
    }
    flexLine.mainSpace = mainSpace
    console.log(items)
    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
      flexLine.crossSpace =
        style[crossSize] !== undefined ? style[crossSize] : crossSpace
    } else {
      flexLine.crossSpace = crossSpace
    }

    if (mainSpace < 0) {
      const scale = style[mainSize] / (style[mainSize] - mainSpace)
      let currentMain = mainBase
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const itemStyle = getStyle(item)
        if (itemStyle.flex) {
          itemStyle[mainSize] = 0
        }
        itemStyle[mainSize] = itemStyle[mainSize] * scale

        itemStyle[mainStart] = currentMain
        itemStyle[mainEnd] =
          itemStyle[mainStart] + mainSign * itemStyle[mainSize]
        currentMain = itemStyle[mainEnd]
      }
    } else {
      flexLines.forEach((items) => {
        const mainSpace = items.mainSpace
        let flexTotal = 0
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          const itemStyle = getStyle(item)
          // 只处理了flex:number的情况
          if (itemStyle.flex !== null && itemStyle.flex !== undefined) {
            flexTotal += itemStyle.flex
            continue
          }
        }
        // 根据份数来求
        if (flexTotal > 0) {
          let currentMain = mainBase
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const itemStyle = getStyle(item)
            if (itemStyle.flex) {
              itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
            }
            itemStyle[mainStart] = currentMain
            itemStyle[mainEnd] =
              itemStyle[mainStart] + mainSign * itemStyle[mainSize]
            currentMain = itemStyle[mainEnd]
          }
        } else {
          let step
          let currentMain
          if (style.justifyContent === 'flex-start') {
            currentMain = mainBase
            step = 0
          }
          if (style.justifyContent === 'flex-end') {
            currentMain = mainSpace * mainSign + mainBase
            step = 0
          }
          if (style.justifyContent === 'center') {
            currentMain = (mainSpace / 2) * mainSign + mainBase
            step = 0
          }
          if (style.justifyContent === 'space-between') {
            currentMain = mainBase
            step = (mainBase / (items.length - 1)) * mainSign
          }
          if (style.justifyContent === 'space-around') {
            step = (mainBase / items.length) * mainSign
            currentMain = mainBase + step / 2
          }
          for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const itemStyle = getStyle(item)
            itemStyle[mainStart] = currentMain
            itemStyle[mainEnd] =
              itemStyle[mainStart] + mainSign * itemStyle[mainSize]
            currentMain = itemStyle[mainEnd] + step
          }
        }
      })
    }

    var crossSpace
    if (!style[crossSize]) {
      crossSpace = 0
      elementStyle[crossSize] = 0
      for (let i = 0; i < flexLines.length; i++) {
        elementStyle[crossSize] =
          elementStyle[crossSize] + flexLines[i].crossSize
      }
    } else {
      crossSpace = style[crossSize]
      for (let i = 0; i < flexLines.length; i++) {
        crossSpace -= flexLines[i].crossSpace
      }
    }
    if (style.flexWrap === 'wrap-reverse') {
      crossBase = style[crossSize]
    } else {
      crossBase = 0
    }
    const lineSize = style[crossSize] / flexLines.length
    let step
    if (style.alignContent === 'flex-start') {
      crossBase += 0
      step = 0
    }
    if (style.alignContent === 'flex-end') {
      crossBase += crossSign * crossSpace
      step = 0
    }
    if (style.alignContent === 'center') {
      crossBase += (crossSign * crossSpace) / 2
      step = 0
    }
    if (style.alignContent === 'space-between') {
      crossBase += 0
      step = crossBase / (flexLines.length - 1)
    }
    if (style.alignContent === 'space-around') {
      step = crossBase / flexLines.length
      crossBase += (crossSign * step) / 2
    }
    if (style.alignContent === 'stretch') {
      crossBase += 0
      step = 0
    }
    flexLines.forEach((items) => {
      const lineCrossSize =
        style.alignContent === 'stretch'
          ? items.crossSpace + crossSpace / flexLines.length
          : items.crossSpace

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const itemStyle = getStyle(item)
        const align = itemStyle.alignSelf || style.alignItems
        if (
          itemStyle[crossSize] === null ||
          itemStyle[crossSize] === undefined
        ) {
          itemStyle[crossSize] = align === 'stretch' ? lineCrossSize : 0
        }
        if (align === 'flex-start') {
          itemStyle[crossStart] = crossBase
          itemStyle[crossEnd] =
            itemStyle[crossStart] + crossSign * itemStyle[crossSize]
        }
        if (align === 'flex-end') {
          itemStyle[crossStart] =
            itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
          itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize
        }
        if (align === 'center') {
          itemStyle[crossStart] =
            crossBase + (crossSign * (lineCrossSize - itemStyle[crossSize])) / 2
          itemStyle[crossEnd] =
            itemStyle[crossStart] + crossSign * itemStyle[crossSize]
        }
        if (align === 'stretch') {
          itemStyle[crossStart] = crossBase
          itemStyle[crossEnd] =
            crossBase +
            crossSign * (itemStyle[crossSize] !== null && itemStyle[crossSize])
          itemStyle[crossSize] =
            crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
        }
      }
      crossBase += crossSign * (lineCrossSize + step)
    })
  }
}

function getStyle(element) {
  element.style = element.style || {}
  for (let prop in element.computedStyle) {
    const p = element.computedStyle.value
    element.style[prop] = element.computedStyle[prop].value

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop], 10)
    }
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop], 10)
    }
  }
  return element.style
}
module.exports = layout
