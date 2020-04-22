const encodeString = (str: string, idx = 0) => {
  // TODO: for 处理多字符问题
  // 处理string
  let code = str.charCodeAt(idx)
  if (code >= 0xd800 && code <= 0xdbff) {
    const high = code
    const low = str.charCodeAt(idx + 1)
    code = (high - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000
  }
  // UTF-8编码
  const bytes = []
  let proxyPoint = code
  // TODO: 优化代码逻辑
  // 占用一个utf-8 1个byte位
  if (proxyPoint < 0x007f) return '%' + proxyPoint.toString(16)
  // 占用一个utf-8 2个byte位
  if (proxyPoint >= 0x007f && proxyPoint < 0x07ff) {
    // & 截位 0x3f => 111111 0x80 => 10 000000
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    // 无符号右移 截取已占用utf-8的byte2
    proxyPoint >>>= 6
    // 0x1f => 11111 0xc0 => 110 00000
    bytes.unshift((proxyPoint & 0x1f) | 0xc0)
    return bytes.map((v) => '%' + v.toString(16)).join('')
  }
  // 占用一个utf-8 3个byte位
  if (proxyPoint >= 0x07ff && proxyPoint < 0xffff) {
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x1f) | 0xe0)
    return bytes.map((v) => '%' + v.toString(16)).join('')
  }
  // 占用一个utf-8 4个byte位
  if (proxyPoint < 0x1fffff && proxyPoint >= 0xffff) {
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x7) | 0xf0)
  }
  if (proxyPoint < 0x3ffffff && proxyPoint >= 0x1fffff) {
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    // 占用一个utf-8 5个byte位
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x3) | 0xf8)
  }
  if (proxyPoint >= 0x3ffffff) {
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    // 占用一个utf-8 6个byte位
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x3f) | 0x80)
    proxyPoint >>>= 6
    bytes.unshift((proxyPoint & 0x1) | 0xfc)
  }
  return '%' + bytes.map((b) => b.toString(16)).join('%')
}
// 两个code unit也可以用于此方法 输入两个code point即可
// charCodeAt获取 Unicode字符编码0~65535 BMP 第0平面
// String.fromCharCode()

// codePointAt() 方法返回 一个 Unicode 编码点值 0 ~ 0x10FFFF
// String.fromCodePoint() 静态方法返回使用指定的代码点序列创建的字符串。
export default encodeString
