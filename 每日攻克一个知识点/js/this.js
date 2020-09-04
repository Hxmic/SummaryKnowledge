// 20200821 js 五种绑定彻底弄懂this，默认绑定、隐式绑定、显式绑定、new绑定、箭头函数绑定详解

/**
 * this 默认绑定
 */
// this默认绑定我们可以理解为函数调用时无任何调用前缀的情景，它无法应对我们后面要介绍的另外四种情况，所以称之为默认绑定，默认绑定时this指向全局对象（非严格模式）
let name = '1213'
function fn1() {
    let fn2 = function () {
        console.log(this); //window
        fn3();
    };
    console.log(this); //window
    fn2();
};

function fn3() {
    console.log(this); //window
};

fn1();

// 在严格模式环境中，默认绑定的this指向undefined

function fn() {
    console.log(this); //window
    console.log(this.name);
};

function fn1() {
    "use strict";
    console.log(this); //undefined
    console.log(this.name);
};

var name = '听风是风';

fn(); 
fn1() //TypeError: Cannot read property 'a' of undefined

//再例如函数以及调用都暴露在严格模式中的例子：

"use strict";
var name = '听风是风';
function fn() {
    console.log(this); //undefined
    console.log(this.name);//报错
};
fn();

//最后一点，如果在严格模式下调用不在严格模式中的函数，并不会影响this指向，来看最后一个例子：
var name = '听风是风';
function fn() {
    console.log(this); //window
    console.log(this.name); //听风是风
};

(function () {
    "use strict";
    fn();
}());


/**
 * this隐式绑定 
 */
// 什么是隐式绑定呢，如果函数调用时，前面存在调用它的对象，那么this就会隐式绑定到这个对象上

function fn() {
    console.log(this.name);
};
let obj = {
    name: '听风是风',
    func: fn
};
obj.func() //听风是风

// 如果函数调用前存在多个对象，this指向距离调用自己最近的对象，比如这样：
function fn() {
    console.log(this.name);
};
let obj = {
    name: '行星飞行',
    func: fn,
};
let obj1 = {
    name: '听风是风',
    o: obj
};
obj1.o.func() //行星飞行

// 那如果我们将obj对象的name属性注释掉，现在输出什么呢？
function fn() {
    console.log(this.name);
};
let obj = {
    func: fn,
};
let obj1 = {
    name: '听风是风',
    o: obj
};
obj1.o.func() //？？

// 这里输出undefined，大家千万不要将作用域链和原型链弄混淆了，obj对象虽然obj1的属性，但它两原型链并不相同，并不是父子关系，由于obj未提供name属性，所以是undefined。

// 既然说到原型链，那我们再来点花哨的，我们再改写例子，看看下面输出多少：

function Fn() {};
Fn.prototype.name = '时间跳跃';

function fn() {
    console.log(this.name);
};

let obj = new Fn();
obj.func = fn;

let obj1 = {
    name: '听风是风',
    o: obj
};
obj1.o.func() //?

// 这里输出时间跳跃，虽然obj对象并没有name属性，但顺着原型链，找到了产生自己的构造函数Fn，由于Fn原型链存在name属性，所以输出时间跳跃了。


/**
 * this显式绑定
 */

// 显式绑定是指我们通过call、apply以及bind方法改变this的行为，相比隐式绑定，我们能清楚的感知 this 指向变化过程。来看个例子：

let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
let obj3 = {
    name: 'echo'
}
var name = '行星飞行';

function fn() {
    console.log(this.name);
};
fn(); //行星飞行
fn.call(obj1); //听风是风
fn.apply(obj2); //时间跳跃
fn.bind(obj3)(); //echo

// 比如在上述代码中，我们分别通过call、apply、bind改变了函数fn的this指向。

// 在js中，当我们调用一个函数时，我们习惯称之为函数调用，函数处于一个被动的状态；而call与apply让函数从被动变主动，函数能主动选择自己的上下文，所以这种写法我们又称之为函数应用。

// 注意，如果在使用call之类的方法改变this指向时，指向参数提供的是null或者undefined，那么 this 将指向全局对象。

let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
var name = '行星飞行';

function fn() {
    console.log(this.name);
};
fn.call(undefined); //行星飞行
fn.apply(null); //行星飞行
fn.bind(undefined)(); //行星飞行

// 在js API中部分方法也内置了显式绑定，以forEach为例：
let obj = {
    name: '听风是风'
};

[1, 2, 3].forEach(function () {
    console.log(this.name);//听风是风*3
}, obj);


/**
 * new 绑定
 */
// 准确来说，js中的构造函数只是使用new 调用的普通函数，它并不是一个类，最终返回的对象也不是一个实例，只是为了便于理解习惯这么说罢了。

// 那么new一个函数究竟发生了什么呢，大致分为三步：

// 1.以构造器的prototype属性为原型，创建新对象；

// 2.将this(可以理解为上句创建的新对象)和调用参数传给构造器，执行；

// 3.如果构造器没有手动返回对象，则返回第一步创建的对象

function Fn(){
    this.name = '听风是风';
};
let echo = new Fn();
echo.name//听风是风

// 在上方代码中，构造调用创建了一个新对象echo，而在函数体内，this将指向新对象echo上（可以抽象理解为新对象就是this）。

/**
 * this绑定优先级
 */

// 我们先介绍前四种this绑定规则，那么问题来了，如果一个函数调用存在多种绑定方法，this最终指向谁呢？这里我们直接先上答案，this绑定优先级为：

// 显式绑定 > 隐式绑定 > 默认绑定

// new绑定 > 隐式绑定 > 默认绑定


