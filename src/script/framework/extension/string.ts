// @ts-ignore
if (!String.equalsIgnoreCase) {
    // @ts-ignore
    String.prototype.equalsIgnoreCase = function equalsIgnoreCase(str) {
        if (this.toUpperCase() == str.toUpperCase()) {
            return true;
        }
        return false;
    }
}

// @ts-ignore
if (!String.format) {
    // @ts-ignore
    String.prototype.format = function () {
        var args = arguments;
        var nLength = args.length;
        if (nLength == 0) {
            return this;
        }

        var strResult = this;
        for (var i = 0; i < nLength; i++) {
            var tmp = args[i];
            if (tmp !== null && tmp !== undefined) {
                strResult = strResult.replace('{' + i + '}', tmp.toString());
            }

        }
        return strResult;
    }
}

// @ts-ignore
String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};

// @ts-ignore
String.prototype.endWith = function (str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
};