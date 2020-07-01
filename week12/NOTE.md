# 编程与算法训练四则运算

## 产生式（BNF）
- 四则运算：
```
1 + 2 * 3 终结符：
Number
+-*/ 非终结符：
MultiplicativeExpression
AdditiveExpression

TokenNumber:
1234567890的组合
Operator: +,-,*,/之一
Whitespace: < sp >
LineTerminator: < LF > < CR >
```