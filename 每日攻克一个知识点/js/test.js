Function.prototype.before = function(beforeFn) {
    const _this = this

    return function() {
        beforeFn.apply(this, arguments);
        return _this.apply(this, arguments);
    }
}

Function.prototype.after = function(afterFn) {
    const _this = this;
    return function() {
        const res =  _this.apply(this, arguments)

        return _this.apply(this, arguments);
    }
}


Function.prototype.around = function(beforeFn, aroundFn) {
    const _this = this;

    return function() {
        return _this.before(beforeFn).after(aroundFn).apply(this, arguments);
    }
}