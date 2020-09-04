// jquery callbacks 解读
var CallBacks = function() {
    var Cb = {
        callbacks: [],
        add: function(fn) {
            this.callbacks.push(fn);
            return this;
        },
        fire: function(value) {
            this.callbacks.forEach(function(fn) {
                fn(value);
            })
            return this;
        }
    }
    return Cb;
}

function fn1(value) {
    console.log('good', value)
}

function fn2(value) {
    console.log(value)
}

var callbacks = CallBacks();
callbacks.add(fn1).add(fn2);
console.log(callbacks);
callbacks.fire('test')

fire = function(data) {
    memory = option.memory && data;

    fired = true;
    firingIndex = firingStart || 0;
    firingStart = 0;
    firingLength = list.length;

    firing = true;

    for(; list && firingIndex < firingLength; firingIndex++) {
        if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
            memory = false;
            break
        }
    }

    firing = false;

    if (list) {
        if (stack) {
            if (stack.length) {
                fire(stack.shift());
            }
        } else if (memory) {
            list = [];
        } else {
            self.disable()
        }
    }



}