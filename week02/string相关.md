# javascript String 类型

在 JavaScript 中处理中文和其他 Unicode 字符时，我们会用到处理 Unicode 相关的 API。

在早期，JavaScript 提供的 String.prototype.charCodeAt 和 String.fromCharCode 就是能够将字符串转换为 Unicode 的 UTF-16 编码以及从 UTF-16 编码转换为字符串的函数。

## 字符串转换为对应的 Unicode 编码

比如：

```
const str = '中文';

console.log([...str].map(char => char.charCodeAt(0)));
// [20013, 25991]
```

这里我们将字符串展开成单个字符，再通过 charCodeAt 方法将字符串转换为对应的 Unicode 编码，这里的 20013 和 25991 就是“中文”两个字对应的 Unicode 编码。

同样，我们可以使用 fromCharCode 将 Unicode 编码转换为字符串：

```
const charCodes = [20013, 25991];

console.log(String.fromCharCode(...charCodes)); // 中文
```

这两个方法相信大部分同学都不陌生，这是从 ES3 就开始支持的方法。但是，这个方法在今天我们处理 Unicode 字符时不够用了。

为什么呢？我们来看一下例子：

```
const str = '🀄';

console.log(str.charCodeAt(0)); // 55356
```

这个字符是我们熟悉的麻将中的红中，现在很多输入法都能直接打出来，看上去似乎也正常，没什么问题啊？

可你再试试：

```
console.log(String.fromCharCode(55356)); // �
```

实际上 Unicode 字符 🀄 的 UTF-16 编码并不是 55356，这时候如果你使用 charCodeAt 来得到字符 🀄 的 UTF-16 编码，应该要到两个值：

```
const str = '🀄';

console.log(str.charCodeAt(0), str.charCodeAt(1)); // 55356 56324
```

对应的 String.fromCharCode(55356, 56324)才能还原 🀄 字符。

除此以外，还有其他一些不一样的地方，比如：

```
console.log('🀄'.length); // 字符串长度为2
'🀄'.split(''); // ["�", "�"] split 出来两个字符
/^.$/.test('🀄'); // false
```

所以我们从 Unicode 说起。作为一个程序员，我们都应该或多或少了解其相关知识。

世界上有那么多语言系统，每门语言又有那多文字字符。

为了在计算机上表示这些字符，一个天然的想法就是给每个字符一个编号。把每一个字符映射成一个整数，这些数字的学名叫码位（code point）。比如：

```javascript
'a'.charCodeAt(0) // 97
'姚'.charCodeAt(0) // 23002复制代码
```

## Unicode

究竟得多少个码位才够呢？刚开始 Unicode 设计人员觉得 2^16 (65536)就该足够了，于是产生了 UCS-2。（注：事实上 Unicode 和 UCS 在最开始时不是一家。）

取 16 次方，即说明 2 个字节数据就能表示一个字符了。这种编码方式多简单，不管是从性能还是从实现上来说，都看起来是一个不错的选择。因此，很多语言都采用了 16 位编码的字符串，包括咱们的 JavaScript。

虽然 6 万多个字符足以包括世界上绝大多数常用字符，但事实上还是不够的，Unicode 不断扩展。截止 2019 年 3 月，已收入 150 个书写系统，共计字符 137928 的。

统一用两个字节来存储一个字符，这种方式不再一直有效。因此出现了不同的编码标准，比如 UTF-8、UTF-16 和 UTF-32。

这里主要说说与 JS 相关的 UTF-16。

UTF-16 是一种变长表示，它对来自常用字符 UCS-2 的码位，仍然用 2 个字节表示。而对来新增非常用的码位却用 4 个字节表示。二者能互相区分开来，这是 UTF-16 的精妙之处所在。

👉🏻 知识点：Unicode 标准中，将字符编码的码位以 2\*\*16 个为一组，组成为一个平面（Plane），按照字符的码位值，分为 17 个平面，所有码位从 0x000000 到 0x10FFFF，总共使用 3 个字节。

其中最前面的 1 个字节是平面编号，从 0x0 到 0x10，一共 17 个平面。

第 0 号平面被称为基本多文种平面（BMP，Basic Multilingual Plane），这个平面的所有字符码位只需要 16 位编码单元即可表示，所以它们可以继续使用 UTF-16 编码。

其他的平面被称为辅助平面（supplementary plane），这些平面的字符被称为增补字符，它们的码位均超过 16 位范围。

ES5 及之前的 JavaScript 的 Unicode 相关 API，只能以 UTF-16 来处理 BMP 的字符，所有字符串的操作都是基于 16 位编码单元。

因此，当 🀄 这样的增补字符出现时，得到的结果就会与预期不符。

在 ES2015 之后，JavaScript 提供了新的 API 来支持 Unicode 码位，所以我们可以这么使用：

```
const str = '🀄';

console.log(str.codePointAt(0)); // 126980
```

👉🏻 知识点：String.prototype.codePointAt(index) 方法返回字符串指定 index 位置的字符的 Unicode 码位，与旧的 charCodeAt 方法相比，它能够很好地支持增补字符。

对应地，我们有 String.fromCodePoint 方法将 CodePoint 转为对应的字符：

```
console.log(String.fromCodePoint(126980)); // 🀄
Unicode 转义
JavaScript字符串支持Unicode转义，所以我们可以用码位的十六进制字符串加上前缀\u来表示一个字符，例如：

console.log('\u4e2d\u6587'); // 中文
0x4e2d和0x6587分别是20013和25991的十六进制表示。
```

注意，Unicode 转义不仅仅可以用于字符串，实际上\uxxxx 也是可以用在标识符，并相互转换的。例如我们可以这么写：

```
const \u4e2d\u6587 = '测试';

console.log(中文); // 测试
```

上面的代码我们定义了一个中文变量，声明的时候我们用 Unicode 转义，console.log 的时候用它的变量名字符，这样也是没有问题的。

\u 和十六进制字符的这种表示法同样只适用于 BMP 的字符，所以如果我们试图使用它转义增补字符，直接这样是不行的：

console.log('\u1f004'); // ὆4
这样，引擎会把\u1f004 解析成字符\u1f00 和阿拉伯数字 4 组成的字符串。我们需要使用{}将编码包含起来，这样就可以了：

```
console.log('\u{1f004}'); // 🀄
```

## 代理对（surrogate pair）

为区别 BMP 来表示辅助平面，Unicode 引入代理对(surrogate pair)，规定用 2 个 16 位编码单元来表示一个码位，具体规则是将一个字符按如下表示：

在 BMP 内的字符，仍然按照 UTF-16 的编码规则，使用两个字节来表示。
增补字符使用两组 16 位编码来表示一个字符规则为：
首先将它的编码减去 0x10000
然后写成 yyyy yyyy yyxx xxxx xxxx 的 20 位二进制形式
然后编码为 110110yy yyyyyyyy 110111xx xxxxxxxx 一共 4 个字节。
其中 110110yyyyyyyyyy 和 110111xxxxxxxxxx 就是两个代理字符，形成一组代理对，其中第一个代理字符的范围从 U+D800 到 U+DBFF，第二个代理字符的范围从 U+DC00 到 U+DFFF。

另外需要说明的是，最开始的 2^16 那些数据中并非都映射满了。从 U+D800（55296） 到 U+DFFF（57343）共 2048 个码位，是永久保留的，不映射到任何 Unicode 字符。它的存在为 UTF-16 提供了方便。

举例来说，字符 😂 的码位是 U+1F602(128514)，大于 65535，因此是后添加的字符。

首先用它先减去 65536，得到 62978，对应的二进制是 1111011000000010。
然后左补充 0 至 20 位：00001111011000000010。
再从中间切断成上下两值：0000111101（61） 和 1000000010（514）。
添加 0xD800（55296）到上值，以形成高位：55296 + 61 = 55357（0xD83D）。
添加 0xDC00（56320）到下值，以形成低位：56320+ 514 = 56834（0xDE02）。
0xD83D 与 0xDE02 构成一个代理对，来表示码位 U+1F602。
可以验证如下：

```javascript
'😂'.charCodeAt(0) // 55357
'😂'.charCodeAt(1) // 56834
'\u{1F602}' // 😂
'\uD83D\uDE02' // 
😂'\u{1F602}'[0] === '\uD83D' // true
```

此时，想必你也明白了文章开头的问题了：'😂'.length 之所以为 2，是因为 JS 至今仍然使用 UCS-2 那种 16 进制读取方式。

## 实现 getCodePoint

理解了代理对，我们就可以通过 charCodeAt 实现 getCodePoint 了：

```
function getCodePoint(str, idx = 0) {
  const code = str.charCodeAt(idx);
  if(code >= 0xD800 && code <= 0xDBFF) {
    const high = code;
    const low = str.charCodeAt(idx + 1);
    return ((high - 0xD800) * 0x400) +
      (low - 0xDC00) + 0x10000;
  }
  return code;
}

console.log(getCodePoint('中')); // 20013
console.log(getCodePoint('🀄')); // 126980
```

同样地，我们也可以通过 fromCharCode 实现 fromCodePoint:

```
function fromCodePoint(...codePoints) {
  let str = '';
  for(let i = 0; i < codePoints.length; i++) {
    let codePoint = codePoints[i];
    if(codePoint <= 0xFFFF) {
      str += String.fromCharCode(codePoint);
    } else {
      codePoint -= 0x10000;
      const high = (codePoint >> 10) + 0xD800;
      const low = (codePoint % 0x400) + 0xDC00;
      str += String.fromCharCode(high) + String.fromCharCode(low);
    }
  }
  return str;
}

console.log(fromCodePoint(126980, 20013)); // 🀄中
```

所以我们就可以用上面这样的思路来实现早期浏览器下的 polyfill。实际上 MDN 官方对[codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)和[fromCodePoint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)的说明中，就按照上面的思路提供了对应的 polyfill 方法。

## getCodePointCount

JavaScript 字符串的 length 只能获得 UTF-16 字符的个数，所以前面看到的：

```
console.log('🀄'.length); // 字符串长度为2
```

要获得 Unicode 字符数，有几个办法，比如使用 spread 操作是可以支持 Unicode 字符串转数组的，所以：

```
function getCodePointCount(str) {
  return [...str].length;
}
console.log(getCodePointCount('👫中'));
或者使用带有u描述符的正则表达式：

function getCodePointCount(str) {
  let result = str.match(/./gu);
  return result ? result.length : 0;
}
console.log(getCodePointCount('👫中'));
```

## 扩展

Unicode 码位使用固定的 4 个字节来编码增补字符，而早期，UTF-8 编码则采用可变的 1~6 个字节来编码 Unicode 字符。

UTF-8 编码方式如下：
| 字节 | 起始 | 终止 | byte1 | byte2 | byte3 | byte4 | byte5 | byte6|
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1 | U+0000 | U+007F | 0xxxxxxx | | | | | |
| 2 | U+0080 | U+07FF | 110xxxxx |10xxxxxx | | | | |
| 3 | U+0800 | U+FFFF | 1110xxxx | 10xxxxxx| 10xxxxxx| | | |
| 4 | U+10000 | U+1FFFFF | 11110xxx | 10xxxxxx| |10xxxxxx |10xxxxxx | |
| 5 | U+200000 | U+3FFFFFF | 111110xx |10xxxxxx |10xxxxxx |10xxxxxx |10xxxxxx | |
| 6 | U+4000000 | U+7FFFFFFF | 1111110x |10xxxxxx |10xxxxxx | 10xxxxxx| 10xxxxxx|10xxxxxx |

在浏览器的encodeURIComponent和Node的Buffer默认采用UTF-8编码：
```
console.log(encodeURIComponent('中')); // %E4%B8%AD
const buffer = new Buffer('中');
console.log(buffer); // <Buffer e4 b8 ad>
```
这里的E4、B8、AD就是三个字节的十六进编码，我们试着转一下：
```
const byte1 = parseInt('E4', 16); // 228
const byte2 = parseInt('B8', 16); // 184
const byte3 = parseInt('AD', 16); // 173

const codePoint = (byte1 & 0xf) << 12 | (byte2 & 0x3f) << 6 | (byte3 & 0x3f);

console.log(codePoint); // 20013
```
我们将三个字节的控制码1110、10、10分别去掉，然后将它们按照从高位到低位的顺序拼接起来，正好就得到'中'的码位20013。

所以我们也可以利用UTF-8编码规则，写另一个版本的通用方法来实现getCodePoint：
```
function getCodePoint(char) {
  const code = char.charCodeAt(0);
  if(code <= 0x7f) return code;
  const bytes = encodeURIComponent(char)
    .slice(1)
    .split('%')
    .map(c => parseInt(c, 16));
  
  let ret = 0;
  const len = bytes.length;
  for(let i = 0; i < len; i++) {
    if(i === 0) {
      ret |= (bytes[i] & 0xf) << 6 * (len - i - 1);
    } else {
      ret |= (bytes[i] & 0x3f) << 6 * (len - i - 1);
    }
  }
  return ret;
}

console.log(getCodePoint('中')); // 20013
console.log(getCodePoint('🀄')); // 126980
```
那么同样，我们可以实现fromCodePoint：
```
function fromCodePoint(point) {
  if(point <= 0xffff) return String.fromCharCode(point);
  const bytes = [];
  bytes.unshift(point & 0x3f | 0x80);
  point >>>= 6;
  bytes.unshift(point & 0x3f | 0x80);
  point >>>= 6;
  bytes.unshift(point & 0x3f | 0x80);
  point >>>= 6;
  if(point < 0x1FFFFF) {
    bytes.unshift(point & 0x7 | 0xf0);
  } else if(point < 0x3FFFFFF) {
    bytes.unshift(point & 0x3f | 0x80);
    point >>>= 6;
    bytes.unshift(point & 0x3 | 0xf8);
  } else {
    bytes.unshift(point & 0x3f | 0x80);
    point >>>= 6;
    bytes.unshift(point & 0x3f | 0x80);
    point >>>= 6;
    bytes.unshift(point & 0x1 | 0xfc);
  }
  const code = '%' + bytes.map(b => b.toString(16)).join('%');
  return decodeURIComponent(code);
}

console.log(fromCodePoint(126980)); // 🀄
```
## 文献

最后，我们来看一下 JS 规范《Ecma-262》 对此的描述：

> The String type is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”) up to amaximum length of 25^3 - 1 elements. The String type is generally used to represent textual data in a running ECMAScript program, in which case each element in the String is treated as a UTF-16 code unit value. Each element is regarded as occupying a position within the sequence. These positions are indexed with nonnegative integers. The first element (if any) is at index 0, the next element (if any) at index 1, and so on. The length of a String is the number of elements (i.e., 16-bit values) within it. The empty String has length zero and therefore contains no elements.

> ECMAScript operations that do not interpret String contents apply no further semantics. Operations that do interpret String values treat each element as a single UTF-16 code unit. However, ECMAScript does not restrict the value of or relationships between these code units, so operations that further interpret String contents as sequences of Unicode code points encoded in UTF-16 must account for ill-formed subsequences. Such operations apply special treatment to every code unit with a numeric value in the inclusive range 0xD800 to 0xDBFF (defined by the Unicode Standard as a leading surrogate, or more formally as a high-surrogate code unit) and every code unit with a numeric value in the inclusive range 0xDC00 to 0xDFFF (defined as a trailing surrogate, or more formally as a low-surrogate code unit) using the following rules:

> A code unit that is not a leading surrogate and not a trailing surrogate is interpreted as a code point with the same value.

> A sequence of two code units, where the first code unit c1 is a leading surrogate and the second code unit c2 a trailing surrogate, is a surrogate pair and is interpreted as a code point with the value (c1 - 0xD800) × 0x400 + (c2 - 0xDC00) + 0x10000. (See 10.1.2)

> A code unit that is a leading surrogate or trailing surrogate, but is not part of a surrogate pair, is interpreted as a code point with the same value.

翻译如下：

> 字符串类型是零个或多个 16 位无符号整数值（“元素”）的所有有序序列的集合，最大长度为 25^3-1 个元素。字符串类型通常用于表示正在运行的 ECMAScript 程序中的文本数据，在这种情况下，字符串中的每个元素都被视为 UTF-16 代码单元值。 每个元素被认为在序列中占据一个位置。这些位置用非负整数索引。第一个元素（如果有）位于索引 0，下一个元素（如果有）位于索引 1，依此类推。字符串的长度是其中的元素数（即 16 位值）。空字符串的长度为零，因此不包含任何元素。

> 不解释字符串内容的 ECMAScript 操作不再应用任何语义。解释字符串值的操作将每个元素视为单个 UTF-16 代码单元。但是，ECMAScript 并不限制这些代码单元的值或它们之间的关系，因此，将 String 内容进一步解释为 UTF-16 编码的 Unicode 代码点序列的操作必须考虑格式错误的子序列。此类操作会对数字值在 0xD800 到 0xDBFF（由 Unicode 标准定义为领先代理，或更正式地作为高代理代码单元）范围内的每个代码单元和每个具有数字值的代码单元进行特殊处理。使用以下规则在 0xDC00 到 0xDFFF（包括尾随代理，或更正式地定义为低代理代码单元）的范围内：

> 不是前导代理也不是尾随代理的代码单元被解释为具有相同值的代码点。

> 两个代码单元的序列，其中第一个代码单元 c1 是前导代理，第二个代码单元 c2 是尾随代理，是一个代理对，并被解释为值（c1-0xD800）×0x400 +（ c2-0xDC00）+ 0x10000。 （请参见 10.1.2）

> 作为前导代理或尾随代理但不属于代理对的代码单元，将被解释为具有相同值的代码点。

## surrogate pair

这里面有两个很重要的术语：

- code point: 指 Unicode 标准里“字符”的编号，目前 Unicode 使用了 0 ~ 0x10FFFF 的编码范围。这里字符二字加了引号，是因为这个概念很混淆，后面会再讲述。
- code unit: 指某种 Unicode 编码方式里编码一个 code point 需要的最少字节数，比如 UTF-8 需要最少一个字节，UTF-16 最少两个字节，UCS-2 两个字节，UCS-4 和 UTF-32 四个字节，后面三个是定长编码。

早期的时候，Unicode 只用到了 0~0xFFFF 范围的数字编码，这就是 BMP 字符集，UCS-2 编码，很多语言就用 2 bytes 来表示 wchar_t 或者 char，典型的例子是 C/C++/Java。但后来 Unicode 组织胡搞瞎搞居然用到了超过这个范围的数字，于是就出来 surrogate pair 的概念了。

Surrogate pair 是专门用于 UTF-16 的，以向后兼容 UCS-2，做法是取 UCS-2 范围里的 0xD800~0xDBFF(称为 high surrogates) 和 0xDC00~0xDFFF(称为 low surrogates) 的 code point，一个 high surrogate 接一个 low surrogate 拼成四个字节表示超出 BMP 的字符，两个 surrogate range 都是 1024 个 code point，所以 surrogate pair 可以表达 1024 x 1024 = 1048576 = 0x100000 个字符，这就是 Unicode 的字符集范围上限是 0x10FFFF 的原因，为了照顾 UTF-16 以及一大堆采用了 UTF-16 的语言、操作系统（比如 Windows），这个上限不能突破，哪怕 UTF-8 和 UTF-32 可以编码更大的范围，实在是历史悲剧！

其中提到了码元（code unit），是指最存储的最小单位，这里即 2 个字节。

前文讨论过，大于 65535 的码位会生成一个代理对（比如 😂 的码位是 U+1F602，代理对是 U+D83D 和 U+DE02），即用了 2 个码元。上述 JS 规范中明确得指出：“每个元素都被认为是一个单独的 UTF-16 码元”。因此 😂 符号为 2。