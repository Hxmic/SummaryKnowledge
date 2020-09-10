function ComplexCarFactory(brand, price) {
    this.brand = brand;
    this.price = price;
}

ComplexCarFactory.prototype = {
    constructor: ComplexCarFactory,
    sellCar: function() {
        let speed = this.getSpeed(this.brand);
        console.log(this.brand + '的车子售价：' + this.price + '元人民币，限速' + speed + '公里每小时');
    },

    getSpeed: function(brand) {
        throw new Error('父类是抽象类不能直接调用，需要子类重写该方法');
    }
}

var CarChild = function(brand, price) {
    this.brand = brand;
    this.price = price;

    ComplexCarFactory.call(this, brand, price);
}

CarChild.prototype = Object.create(ComplexCarFactory.prototype);
CarChild.prototype.getSpeed = function(brand) {
    var speed = null;
    if(brand === '牌子C'){
        return 100;
    }
    return 50;
}

var car3 = new CarChild('牌子C', 3000)