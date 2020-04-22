# 产生式(BNF)

## 什么是BNF

BNF(Backus-Naur Form)是描述编程语言的文法。巴科斯范式是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。

自然语言存在不同程度的二义性。这种模糊、不确定的方式无法精确定义一门程序设计语言。必须设计一种准确无误地描述程序设计语言的语法结构，这种严谨、简洁、易读的形式规则描述的语言结构模型称为文法。

BNF规定是推导规则(产生式)的集合，写为：

>```符号 ::= <使用符号的表达式>```

这里的 <符号> 是非终结符，而表达式由一个符号序列，或用指示选择的竖杠 '|' 分隔的多个符号序列构成，每个符号序列整体都是左端的符号的一种可能的替代。从未在左端出现的符号叫做终结符。

## BNF范式的语法

```
< >     : 内包含的为必选项。// 用来区分这个非终结符的
[ ]     : 内包含的为可选项。
{ }     : 内包含的为可重复0至无数次的项。// 也可以用递归出现
|       : 表示在其左右两边任选一项，相当于"OR"的意思。
::=     : 是“被定义为”的意思
"..."   : 术语符号 // 代表自身
[...]   : 选项，最多出现一次
{...}   : 重复项，任意次数，包括 0 次
(...)   : 分组
|       : 并列选项，只能选一个
```

## BNF以中文为例子

在中文语法里，一个句子一般由“主语”、“谓语”和“宾语”组成，主语可以是名词或者代词，谓语一般是动词，宾语可以使形容词，名词或者代词。那么“主语”、“谓语”和“宾语”就是非终止符，因为还可以继续由“名词”、“代词”、“动词”、“形容词”等替代。

例1. <句子> ::= <主语><谓语><宾语>

例2. <主语> ::= <名词>|<代词>

例3. <谓语>::=<动词>

例4. <宾语>::=<形容词>|<名词>|<代词>

例5. <代词>::=<我>例6. <动词>::=<吃>

例7. <动词>::=<喜欢>

例8. <名词>::=<车>

例9. <名词>::=<肉>

如上，在::=左边的就是non-terminal非终止符，右边的就是replacement，可以是一系列的非终止符，如例1中的replacement便是后面例234左边的非终止符，也可以是终止符，如例56789的右边，找不到别的符号来进一步代替。

```
//整数加法
<Number> = "0" | "1" | ... | "9"
<DecimalNumber> = ("0" | ("1" | ... | "9") <Number>*)
<AdditiveExpression> ::                                                                                                                                                                              = <DecimalNumber>
<AdditiveExpression> = <AdditiveExpression> "+" <DecimalNumber>
// 另一种写法
<AdditiveExpression> = <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber>
// 最终版
<AdditiveExpression> = <MultiplicativeExpression> | <AdditiveExpression> "+" <MultiplicativeExpression> | <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> = <AdditiveExpression> | <LogicalExpression> "||" <AdditiveExpression> | <LogicalExpression> "&&" <AdditiveExpression>

<PrimaryExpression> = <DecimalNumber> | "("<LogicalExpression> ")"
```

*终止符永远不会出现左边*

## 参考

[BNF范式](https://zh.coursera.org/lecture/dmathgen/87-yu-fa-tu-NrBMC)

[BNF范式](http://sighingnow.github.io/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/bnf.html)