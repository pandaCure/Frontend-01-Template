# 面向对象

## 面向对象的起源

1950 年代末和 1960 年代初，“对象”和“面向对象”的术语首次出现在麻省理工学院。但是`Simula (1960)` 被视为第一个具有面向对象特性的语言, 建立了一部分现代面向对象的概念，例如动态绑定、 `class` 、 `object` 。之后，在 1970 年，Smalltalk 第一版被 `Alan Kay, Dan Ingalls and Adele Goldberg` 所开发。`Goldberg` 编辑了 1981 年 8 月发行的 `Byte Magazine` ，向更广泛的受众介绍了 `Smalltalk` 和面向对象的编程。在 1990 年代初和中期，面向对象的编程发展成为主要的编程范例。

## 什么是面向对象

`Alan Kay`在回复邮件说道，在他眼里的 OOP 是：

>OOP to me means only messaging, local retention and protection and hiding of state-process, and extreme late-binding of all things.

当他说这句话部分研究背景是细胞生物学相关的，细胞可以轻松地协调和缩放超过一万亿的因子，从而创造出一些极为复杂的东西存在，能够纠正自己的错误。相比之下，最复杂的计算机软件程序运行缓慢，体积小，漏洞百出。`Alan Kay`的 OOP 概念始于一个问题：我们如何才能使我们的软件与这种可扩展性相匹配？所以有了下面几点：

- Isolation (local retention and protection and hiding of state-process)

  单个细胞的死亡不会导致本体死亡，同样，对象也是

- Extreme late-binding

  `Extreme late-binding`是非常重要，因为`Kay`认为它允许您不要过早地致力于解决问题的“一种真实方法”（因此可以更轻松地更改这些决定），但也可以允许您构建能够您可以在它们仍在运行时进行更改！上一次更改程序的行为而不必停止并重新启动程序的时间是什么时候？通常是等待数小时才能进行复杂的重新编译？

- [Messaging](https://ovid.github.io/articles/alan-kay-and-missing-messages-a-follow-up.html)

  objects should be able to announce that they did things and other objects can ignore them or say "hey, that's cool. Here's what I did in response.
  换句话说您不会通过按名称调用代码来执行代码：你将一些数据（消息）发送给对象，它会找出要响应执行的代码（如果有）。实际上，这可以改善你的`Isolation`，因为接收方可以随意忽略它不理解的任何消息。

那么现在的面向对象维基百科是这样解释的：

>是种具有对象概念的程序编程典范，同时也是一种程序开发的抽象方针。它可能包含数据、属性、代码与方法。对象则指的是类的实例。它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的重用性、灵活性和扩展性，对象里的程序可以访问及经常修改对象相关连的数据。在面向对象程序编程里，计算机程序会被设计成彼此相关的对象

- 类与对象

  支持面向对象编程语言通常利用继承其他类达到代码重用和可扩展性的特性。而类有两个主要的概念：

  类（`Class`）：定义了一件事物的抽象特点。类的定义包含了数据的形式以及对数据的操作。

  对象：是类的实例。

- 动态配置与消息传递机制

  定义上动态配置是指方法会随着实例动态的改变。而消息传递机制（Message Passing）是指一个对象通过接受消息、处理消息、传出消息或使用其他类的方法来实现一定功能

- 封装性

  具备封装性（`Encapsulation`）的面向对象编程隐藏了某一方法的具体运行步骤，取而代之的是通过消息传递机制发送消息给它

- 继承

  继承性（`Inheritance`）是指，在某种情况下，一个类会有“子类”。子类比原本的类（称为父类）要更加具体化。

- 多态

  多态（`Polymorphism`）是指由继承而产生的相关的不同的类，其对象对同一消息会做出不同的响应

- 抽象性

  抽象（`Abstraction`）是简化复杂的现实问题的途径，它可以为具体问题找到最恰当的类定义，并且可以在最恰当的继承级别解释问题。

## js 是面向对象语言吗

JavaScript is perhaps the best known prototype-based programming language, which employs cloning from prototypes rather than inheriting from a class (contrast to class-based programming)。

In a class-based object-oriented language, in general, state is carried by instances, methods are carried by classes, and inheritance is only of structure and behaviour. In ECMAScript, the state and methods are carried by objects, and structure, behaviour, and state are all inherited.Unlike class-based object languages, properties can be added to objects dynamically by assigning values to them.

OO 的标志之一是有类的概念，尽管 JavaScript 里面可以实现类，但也是 syntactic sugar over the prototype-based OO pattern，ECMAscript 中没有类的概念，所以它的对象和基于类的对象有所不同。

### 参考

[Alan Kay 回复的邮件](http://userpage.fu-berlin.de/~ram/pub/pub_jf47ht81Ht/doc_kay_oop_en)

[OOP 维基百科](https://en.wikipedia.org/wiki/Object-oriented_programming)

[ECMA](https://www.ecma-international.org/ecma-262/5.1/#sec-4.2.1)
