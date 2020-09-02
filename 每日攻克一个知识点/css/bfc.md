# 2020年9月1日
原文：https://juejin.im/post/6867108878278983693?utm_source=gold_browser_extension
## BFC 概念
Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
- 那么 BFC 是什么呢？
1. BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。
2. 具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
3. 通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

## 产生条件
只要元素满足下面任一条件即可触发 BFC 特性：
- 根元素，即 html
- 元素浮动元素：float 除 none 以外的值
- position 的值为 absolute 或 fixed
- display 为 inline-block | table-cell | table-caption | flex | inline-flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

## BFC特性和应用
BFC 可以解决下面的问题

- 如何阻止外边距重叠（Collapsing Margins）
- 让一个没有设置高度的容器包含浮动元素
- 阻止文字环绕


### 阻止外边距重叠
外边距重叠有很多种情况，最简单的就是上下两个盒子，上面的设置了 margin-bottom，下面的设置了 margin-top，这时候总的外边距并不是两者相加，而是取最大的外边距作为总的外边距。（假设外边距的设置为正值）

### 容器无高度包含浮动元素

先看以下无BFC，容器无高度包含浮动元素会发生什么。（造成高度塌陷） 通过设置 父元素为 absolute 可以解决。

### 阻止文字环绕
通过设置文字overflow 来清除浮动

