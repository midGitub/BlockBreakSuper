// @ts-ignore
if (!Array.contains) {
    // @ts-ignore
    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }
}

// @ts-ignore
if (!Array.indexOf) {
    // @ts-ignore
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}

// @ts-ignore
if (!Array.unique) {
    // @ts-ignore
    Array.prototype.unique = function () {
        var n = {}, r = []; //n为hash表，r为临时数组
        for (var i = 0; i < this.length; i++) //遍历当前数组
        {
            if (!n[this[i]]) //如果hash表中没有当前项
            {
                n[this[i]] = true; //存入hash表
                r.push(this[i]); //把当前数组的当前项push到临时数组里面
            }
        }
        return r;
    }
}

//no memory alloc function
// @ts-ignore
if (!Array.removeAt) {
    // @ts-ignore
    Array.prototype.removeAt = function (index, count) {
        if (index + count < this.length) {
            for (var i = index + count; i < this.length; i++) //遍历当前数组
            {
                this[i - count] = this[i];
            }
            this.length = this.length - count;
        } else {
            this.length = index;
        }
    }
}

// @ts-ignore
if (!Array.randomSort) {
    // @ts-ignore
    Array.prototype.randomSort = function () {
        return this.sort(function () { //不完全随机排序。
            return Math.random() - 0.5;
        });
    }
}