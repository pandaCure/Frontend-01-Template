## 分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？

内置外来对象(外来对象:如果不完全具备所有对象拥有的基本内置方法，就是外来对象)内部方法和插槽[Built-in Exotic Object Internal Methods and Slots]: 外来对象是其属性语义与默认语义无论何时都表现不同。

 Bound Function Exotic Objects
// 用于bind函数
   [[Call]] ( thisArgument, argumentsList )
// 用于new bind函数
   [[Construct]] ( argumentsList, newTarget )
// 特殊创建 Bound Function Exotic Objects
   BoundFunctionCreate ( targetFunction, boundThis, boundArgs )
- Array Exotic Objects
// 调用内部方法DefineOwnProperty
  [[DefineOwnProperty]] ( P, Desc )
// 创建新的 Array Exotic Objects
  ArrayCreate ( length [ , proto ] )
// 从原函数构造函数上创建一个Array Exotic Objects splice里面用到
  ArraySpeciesCreate ( originalArray, length )
// 设置Array Exotic Objects length
  ArraySetLength ( A, Desc )
- String Exotic Objects
// 内部方法获取属性P时被调用
   [[GetOwnProperty]] ( P )
// 内部方法定义属性p时被调用   
   [[DefineOwnProperty]] ( P, Desc )
// 内部方法定义获取keys时被调用 
   [[OwnPropertyKeys]] ( )
// 创建String Exotic Objects
   StringCreate ( value, prototype )
// StringGetOwnProperty执行
   StringGetOwnProperty ( S, P )
- Arguments Exotic Objects
- Integer-Indexed Exotic Objects
- Module Namespace Exotic Objects

## 总结
  上述方法是一些内置外来对象，感觉是JavaScript底层私有方法，用户扩展内部方法提高JavaScript的灵活性。