// 2020年9月1日

// 1. 原型链继承
function Parent() { // 构造函数
    this.name = 'kevin';
}
Parent.prototype.getName = function() { // 原型上有一个方法
    console.log(this.name);
}
function Child() {

}
Child.prototype = new Parent();
let child1 = new Child();

console.log(child1.getName())

// 2 借用构造函数（经典继承）
// 优点：
// 1.避免了引用类型的属性被所有实例共享
// 2.可以在 Child 中向 Parent 传参
// 缺点：
// 方法都在构造函数中定义，每次创建实例都会创建一遍方法。

function Parent() {
    this.names = ['1', '2']
}

function Child() {
    Parent.call(this);
}

var child1 = new Child();
child1.names.push('3'); // [1, 2, 3]


var child2 = new Child(); // [1, 2]

//  3 组合继承
// 原型链继承和经典继承双剑合璧。

function Parent(name) {
    this.name = name;
    this.colors = [1, 2, 3];
}
Parent.prototype.getName = function() {
    console.log(this.name);
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]

// 优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。



