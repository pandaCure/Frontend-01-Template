# 每周总结可以写在这里

## BNF范式

[BNF范式](./bnf.md)

## 图灵机

- 图灵机（Turing machine）：又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。

- 图灵完备性：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。

## IEEE 754

[IEEE 754](./ieee754.md)

## Javascript String 与 Unicode的关系

[string相关](./string相关.md)

## 知识图谱

[知识图谱](./LexicalGrammar.xmind)

## string API 总结

老API
- charCodeAt获取 Unicode字符编码0~65535 BMP 第0平面
- String.fromCharCode()

新API
- codePointAt() 方法返回 一个 Unicode 编码点值 0 ~ 0x10FFFF
- String.fromCodePoint() 静态方法返回使用指定的代码点序列创建的字符串。

## 纠正

周一作业OOP追溯我写的JavaScript不是面向对象的语言，看了老师的重学前端发现JavaScript是面向对象的
面向对象总结：
- 两个相同的对象 是不想等的 （满足）{a: 1} !== {a: 1}
- 对象有状态 （满足）运行时赋值
- 对象有行为 （满足）getter setter value writable
满足这三点，虽然是基于原型，但依旧是面向对象的。