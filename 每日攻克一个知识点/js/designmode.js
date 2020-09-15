// 2020年9月5日
// 原文地址 https://juejin.im/post/6868054744557060110?utm_source=gold_browser_extension
// 设计原则
// 单一职责原则（SRP）
// 一个对象或方法只做一件事情。如果一个方法承担了过多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。
// 应该把对象或方法划分成较小的粒度
// 最少知识原则（LKP）
// 一个软件实体应当 尽可能少地与其他实体发生相互作用 
// 应当尽量减少对象之间的交互。如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的 相互联系，可以转交给第三方进行处理
// 开放-封闭原则（OCP）
// 软件实体（类、模块、函数）等应该是可以 扩展的，但是不可修改
// 当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，尽量避免改动程序的源代码，防止影响原系统的稳定

// SRP-单一职责原则
// 全称：Single Responsibility Principle
// 定义： A class or module should have a single responsibility.==>一个类或者模块只负责完成一个职责（或者功能）。
// 理解：每一个类，应该要有明确的定义，不要设计大而全的类，要设计粒度小、功能单一的类。
// 作用：避免将不相关的代码耦合在一起，提高了类或者模块的内聚性。

// OCP-开闭原则
// 全称：Open Closed Principle
// 定义： software entities (modules, classes, functions, etc.) should be open for extension , but closed for modification. ==> 软件实体（模块、类、方法等）应该“对扩展开放、对修改关闭”。
// 描述：添加一个新的功能应该是，在已有代码基础上扩展代码（新增模块、类、方法等），而非修改已有代码（修改模块、类、方法等）。
// 作用： 增加了类的可扩展性。

// LSP-里式替换原则
// 全称：Liskov Substitution Principle
// 定义：Functions that use pointers of references to base classes must be able to use objects of derived classes without knowing it.==>子类对象能够替换程序中父类对象出现的任何地方，并且保证原来程序的逻辑行为不变及正确性不被破坏。


// 设计模式分为3个大类： 创建型模式，结构性模式，行为型模式。

// 创建型设计模式
// 创建型模式中，单例模式，工厂模式（又分为简单工厂和抽象工厂），和原型模式是比较常用的，建造者模式用的不太多，了解下就好。

// 单例模式
// 1. 定义
// 保证一个类仅有一个实例，并提供一个访问它的全局访问点
// 2. 核心
// 确保只有一个实例，并提供全局访问
// 3. 实现
// 假设要设置一个管理员，多次调用也仅设置一次，我们可以使用闭包缓存一个内部变量来实现这个单例

// 优缺点
// 优点：适用于单一对象，只生成一个对象实例，避免频繁创建和销毁实例，减少内存占用。
// 缺点：不适用动态扩展对象，或需创建多个相似对象的场景。

// 当我们通过一个构造函数 new 一个对象的时候，每次生成的对象都不是同一个。我们单例模式要做的就是，无论 new 多少个对象，都要返回同一个。


// “简单版” 单例模式：
let Singleton = function(name) {
    this.name = name;
    this.instance = null;
}

Singleton.prototype.getName = function() {
    console.log(this.name)
}

Singleton.getInstance = function(name) {
    if (this.instance) {
        return this.instance;
    }

    return this.instance = new Singleton(name);
}

let winner = Singleton.getInstance('winner');
let looser = Singleton.getInstance('looser');

// “透明版” 单例模式：

let CreateSingleton = (function() {
    let instance;

    return function(name) {
        if (instance) {
            return instance;
        }

        this.name = name;
        return instance = this;
    }
})();

CreateSingleton.prototype.getName = function() {
    console.log(this.name);
}

let winner = new CreateSingleton('winner');
let looser = new CreateSingleton('looser');

// “代理版“ 单例模式：

let proxyCreateSingleton = (function() {
    let instance;

    return function(name) {
        if (instance) {
            return instance;
        }
        return instance = new Singleton(name);
    }
})()
let SingleTon = function(name) {
    this.name = name;
}

Singleton.prototype.getName = function() {
    console.log(this.name);
}

let winner = new proxyCreateSingleton('winner');

// 惰性单例模式
let getSingleTon = function(fn) {
    var result;
    return function() {
        return resulet || (result = fn.apply(this, arguments));
    }
}
let createAlertMessage = function(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}

let createSingleAlertMessage = getSingleTon(createAlertMessage);
document.body.addEventListener('click', function() {
    let alertMessage = createAlertMessage('您的知识');
    alertMessage.style.display = 'block';
})


this.a = 1;
var foo1 = function() {
    console.log(this.a, '1foo')
}
var foo2 =() => {
    console.log(this.a, '2foo');
}
var obj = {
    a: 1,
    foo1,
    foo2
}

obj.foo1.call({a: 3})
obj.foo2.call({a: 3})
///// / // / /// // /

var hmacsha256 = function() {
    var name = 'hmjm';
    function showPrivate() {
        console.log(name);
    }

    return {
        getValue: function() {
            showPrivate();
        },
        encrypt: function() {},

        decrypt: function() {}
    }
}

// 工厂模式
// 简单工厂模式的优点在于：能解决多个相似的问题，减少大量冗余代码。

// 简单工厂设计模式
function CarFactory (brand, price) {
    var car = new Object();
    car.brand = brand;
    car.price = price;
    car.getPrice = function () {
        return this.price;
    }
    return car;
}
var car1 = CarFactory("牌子A", 10000);
var car2 = CarFactory("牌子B", 20000);
console.log(JSON.stringify(car1)); // {"brand":"牌子A","price":10000}
console.log(JSON.stringify(car2)); // {"brand":"牌子B","price":20000}
console.log(typeof car1); // object
console.log(typeof car2); // object
console.log(car1 instanceof Object); // true

// 复杂工厂设计模式
function ComplexCarFactory(brand, price) {
    this.brand = brand;
    this.price = price;
}

ComplexCarFactory.prototype = {
    constructor: ComplexCarFactory,
    sellCar: function() {
        var speed = this.getSpeed(this.brand);
        console.log(this.brand + '的车子售价：' + this.price + '元人民币，限速' + speed + '公里每小时');
    },

    getSpeed: function(brand) {
        throw new Error('父类是抽象类不能直接调用，需要子类重写该方法');
    }
}

var CarChild = function(brand, price) {
    this.brand = brand;
    this.price = price;

    ComplexCarFactory.call(this, brand, price)
}

CarChild.prototype = Object.create(ComplexCarFactory.prototype);
CarChild.prototype.getSpeed = function(brand) {
    var speed = null;
    if(brand === '牌子C'){
        return 100;
    }
    return 50;
}

var car3 = new CarChild("牌子C", 3000);
console.log(car3); // CarChild {brand: "牌子C", price: 3000}
console.log(car3.sellCar()); // 牌子C的车子售价：3000元人民币，限速50公里每小时

class User {
    constructor(role, name) {
        this.name = name;
        this.role = role;
    }
}

class Admin {
    constructor(role, name) {
        this.name = name;
        this.role = role;
    }
}

class SuperAdmin {
    constructor(role, name) {
        this.name = name;
        this.role = role;
    }
}

class RoleFactory {
    static createUser(role) {
        if (role === 'user') {
            return new User(role,'用户')
        } else if (role === 'admin') {
            return new Admin(role, '管理员')
        } else if (role === 'superadmin') {
            return new SuperAdmin(role, '超级管理员')
        }
    }
}

// 抽象工厂方法
class Factory {
    createUserParser() {
        throw new Error('抽象类只能继承，不能实现')
    }

    createLoginParser() {
        throw new Error('抽象类只能继承，不能实现')
    }
}

class UserParser extends Factory {
    createUserParser(role, name) {
        return new UserFactory(role, name)
    }
    createLoginParser(type) {
        if (type === 'email'){
            return new UserEmail()
        } else if (type === 'phone') {
            return new UserPhone()
        }
    }
}

class AdminParser extends Factory {
    createUserParser(role, name) {
        return new AdminFactory(role, name)
    }

    createLoginParser(type) {
        if (type === 'email'){
            return new UserEmail()
        } else if (type === 'phone') {
            return new UserPhone()
        }
    }
}

// 除了刚刚提到的这几种情况之外，如果创建对象的逻辑并不复杂，那我们就直接通过 new 来创建对象就可以了，不需要使用工厂模式。
// 现在，我们上升一个思维层面来看工厂模式，它的作用无外乎下面这四个。这也是判断要不要使用工厂模式的最本质的参考标准。

// 封装变化：创建逻辑有可能变化，封装成工厂类之后，创建逻辑的变更对调用者透明。
// 代码复用：创建代码抽离到独立的工厂类之后可以复用。
// 隔离复杂性：封装复杂的创建逻辑，调用者无需了解如何创建对象。
// 控制复杂度：将创建代码抽离出来，让原本的函数或类职责更单一，代码更简洁。


// 建造者模式
// 将一个复杂的对象分解成多个简单的对象来进行构建，将复杂的构建层与表示层分离，使得相同的构建过程可以创建不同的表示的模式便是建造者模式。

// 原型模式
// 如果对象的创建成本比较大，而同一个类的不同对象之间差别不大（大部分字段都相同），在这种情况下，我们可以利用对已有对象（原型）进行复制（或者叫拷贝）的方式来创建新对象，以达到节省创建时间的目的。这种基于原型来创建对象的方式就叫作原型设计模式（Prototype Design Pattern），简称原型模式。

// 代理模式

// 虚拟代理
class MyImg {
    static imgNode = document.createElement('img');
    constructor(selector) {
        selector.appendChild(this.imgNode);
    }

    setSrc(src) {
        this.imgNode = src;
    }
} 
class ProxyMyImg {
    static src = '.gif';

    constructor(selector) {
        this.img = new Image;
        this.myImg = new MyImg(selector);
        this.myImg.setSrc(this.src)
    }

    setSrc(src) {
        this.img.src = src;
        this.img.onload = () => {
            this.myImg.setSrc(src);
        }
    }
}
// ProxyMyImg控制了客户对MyImg的访问，并且在此过程中加入一些额外的操作，比如在图片加载好之前，先把img节点的src设置为一张本地的loading图片。
// 这样做的好处是把添加img节点和设置预加载给解耦了，每个类都去一个任务，这是符合单一职责原则的。如果有一天网速足够快了，完全不需要预加载，我们直接去掉代理就可以了，这也是符合开闭原则的。

// 缓存代理

// 缓存代理可以为一些开销大的运算结果提供暂时的缓存，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回缓存好的运算结果。
// 比如我们有一个计算乘积的函数

// 缓存代理函数
const mult = (...args) => {
    console.log('multing...');
    let res = 1;
    args.forEach(item => {
        res *=item;
    })

    return res
}
const proxyMult = (() => {
    const cache = {};
    return (...args) => {
        const key = [].join.call(args, ',')

        if (key in cache) {
            return cache[args];
        }

        return cache[key] = mult.apply(null, args)
    }
})();

proxyMult(1, 2, 3, 4);

const handler = {
    cache: {},
    apply: function(target, thisArg, args) {
        const key = [].join.call(args, ',')
        if (key in this.cache) {
            return this.cache[key]
        }
        return this.cache[key] = target(args)
    }
}

const proxyMult = new Proxy(mult, handler);
proxyMult(1, 2, 3, 4)

// 装饰着模式

// 适配器模式

class GooleMap {
    show() {
        console.log('渲染地图');
    }
}

class BaiduMap {
    display() {
        console.log('渲染地图')
    }
}
class GaodeMap {
    show() {
        console.log('渲染地图')
    }
}

class BaiduAdaapterMap {
    show() {
        return new BaiduMap().display();
    }
}

// 所以适配器模式应用场景一般为

// 统一多个类的接口设计
// 替换依赖的外部系统
// 兼容老版本接口
// 适配不同格式的数据

// 观察者模式
