# Javascript 类型转换(隐式转换)

## 类型转换
|           |     Number     |      String      |      Boolean       | Undefined | Null  | Object | Symbol |
| :-------: | :------------: | :--------------: | :----------------: | :-------: | :---: | :----: | :----: |
|  Number   |       -        |     complex      |  +0 -0 NaN false   |     x     |   x   | Boxing |   x    |
|  String   |    complex     |        -         | ''.length==0 false |     x     |   x   | Boxing |   x    |
|  Boolean  | true 1 fasle 0 |  'true''false'   |         -          |     x     |   x   | Boxing |   x    |
| Undefined |      NaN       |   'Undefined'    |       false        |     -     |   x   |   x    |   x    |
|   Null    |       0        |      'Null'      |       false        |     x     |   -   |   x    |   x    |
|  Object   |    ValueOf     | valueOf toString |        true        |     x     |   x   |   -    |   x    |
|  Symbol   |       x        |      Symbol      |        true        |     x     |   x   | Boxing |   -    |

### 装箱 Boxing && 拆箱 UnBoxing

将基本类型转换成对象或者将对象转换成原始对象

## 表达式里面的运算隐式转换

1、加法操作符的表现行为：

    a、类型是Object，遵循对象到原始对象的原则，日期对象toString(),其他对象调用valueOf(),如果不存在,则调用valueOf()

    b、转换成原始对象之后，一个操作数是String，则另一个也要转换成String，之后进行字符串拼接

    c、否则，转换成Number(值有可能为NaN),进行加法运算。

2、一元算数运算符

    a、+ 转换成Number(值有可能为NaN)

    b、- 转换成Number(值有可能为NaN)， 然后改变运算结果

    c、++ -- 要求操作数是一个Left Handside,转换成Number，加1

3、位运算符

    a、位运算将NaN、Infinty、-Infinty都转换成0

    b、否则，要求操作数是整数，要求为32位整数而不是64位浮点数，必要时，位运算会忽略原格式中的小数部分和任何超过32位整数的二进制，要求转换成无符号32位整数，且右操作数在0~31之间，舍弃第五位之后二进制位，以便生成一个正确的整数

4、相等与不相等运算符

    a、===

        i、       两个值类型不相等,则他们不相等
 
        ii、      两个值是null或者undefiend,则他们不相等

        iii、     两个值都是布尔值true或者都是布尔值false，则他们相等

        iiii、    一个或者多个NaN，则他们不相等。NaN与任何值都不相等

        iiiii、   两个值都是Number且数值相等，则相等，+0 === -0 => true

        iiiiii、  两个值是String,且所含对应位上的16位数完全相等，则他们相等。如果length或者内容不同，则不相等 

        iiiiiii、 两个引用值指向同一个对象、数组和函数。则他们相等

    b、==

        i、     类型相同，表现行为与===相同

        ii、    null == undefined => true

        iii、   一个值是String 一个值是Number 现将String转换成Number 在比较

        iiii、  一个值是true，则将其转换成1进行比较。一个值是false，则将其转换成0进行比较

        iiiii、 一个值是对象，另一值是String、Number，将对象转换成原始值，与+操作符行为一样

        iiiiii、其他类型比较均不相等

5、比较运算符

    a、对象转换成原始类型，两个都是String 按照Unicode字符的顺序进行比较

    b、如果不全是String，则将其全部转换成Number，Infinity比任何数都大， -Infinity比任何数都小。

    c、一个操作数是NaN，则返回false

## 对象类型转换 Type Conversion -> 抽象操作（Abstract Operations）

ECMAScript语言根据需要隐式执行自动类型转换。为了阐明某些构造的语义，定义一组转换抽象操作很有用。转换抽象操作是多态的。他们可以接受任何ECMAScript语言类型的值。但是这些操作没有使用其他规范类型。所以：以下操作不是ECMAScript语言的一部分。在此定义它们仅是为了帮助指定ECMAScript语言的语义。

### ToPrimitive ( `input` [ , `PreferredType` ] )

`ToPrimitive` 是将 `input` 转换成 `non-Object` 类型，如果输入的 `input` 可以转换多个基础类型，可以根据 `PreferredType` 来决定最终类型。

``` 

1. Assert: input is an ECMAScript language value. 
2. If Type(input) is Object, then

    a. If PreferredType is not present, let hint be "default".
    b. Else if PreferredType is hint String, let hint be "string". 
    c. Else PreferredType is hint Number, let hint be "number". 
    d. Let exoticToPrim be ? GetMethod(input, @@toPrimitive). 
    e. If exoticToPrim is not undefined, then
        i. Let result be ? Call(exoticToPrim, input, « hint »). 
        ii. If Type(result) is not Object, return result.
        iii. Throw a TypeError exception.
    f. If hint is "default",set hint to "number".
    g. Return ? OrdinaryToPrimitive(input, hint). 

3. Return input.

```

默认的情况下 `hint` 的默认值是 `number` , 但是 `Date Object` 是 `String` , `Symbol` 直接返回 `Symbol(value)` 。

#### OrdinaryToPrimitive( `O` , `hint` )

``` 
1. Assert: Type(O) is Object.
2. Assert: Type(hint) is String and its value is either "string" or "number". 
3. If hint is "string", then

    a. Let method Names be«"toString","valueOf"». 

4. Else,

    a. Let method Names be«"valueOf","toString"». 

5. For each name in methodNames in List order, do

    a. Let method be ? Get(O, name).
    b. If IsCallable(method) is true, then
        i. Let result be ? Call(method, O).
        ii. If Type(result) is not Object, return result.

6. Throw a TypeError exception.
```
#### 例子🌰

``` 
/** 主要针对object */ 
// 普通对象
var c = {}
c.toString() => "[object Object]"
c.valueOf() => 对象自身
// 普通自定义对象
const a = {
            [Symbol.toPrimitive] (hint) {
                // test typeof null == 'object'
                return null
            },
            valueOf(){
                return 1
            },
            toString(){
                return 'a.md1'
            }
        }
a.toString() => 'a.md1'
a.valueOf() => '1'
// 函数对象
function aaaa () {}
aaaa.toString() => "function aaaa () {}"
aaaa.valueOf() => 对象本身
// 日期对象
new Date().toString() => "Tue Apr 28 2020 22:23:23 GMT+0800 (中国标准时间)"
new Date().valueOf() => 1588083841807
// 正则对象
/\d+/.toString() => "/\d+/"
/\d+/.valueOf() => 对象本身
// 数组对象
[1,2,3].toString() => "1,2,3"
[1,2,3].valueOf() => 对象本身

```
