(function (Number) {
    //加法
    Number.prototype.add = function (arg) {
        var r1, r2, m;
        try {
            r1 = this.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        var a = parseInt(this * m + 0.5)
        var b = parseInt(arg * m + 0.5)
        return (a + b) / m
    }
//减法
    Number.prototype.sub = function (arg) {
        return this.add(-arg);
    }

//乘法
    Number.prototype.mul = function (arg) {
        var m = 0, s1 = this.toString(), s2 = arg.toString();
        try {
            m += s1.split('.')[1].length
        } catch (e) {
        }
        try {
            m += s2.split('.')[1].length // m是累加结果
        } catch (e) {
        }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    }

//除法
    Number.prototype.div = function (arg) {
        var r1, r2, m;
        try {
            r1 = this.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        var a = parseInt(this * m + 0.5)
        var b = parseInt(arg * m + 0.5)
        return a/b
    }
})(Number)