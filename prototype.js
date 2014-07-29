/**
 * A prototype file adding some new functions to the common objects
 *
 * Copyright (c) 2011, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

Array.prototype.multipush = function() {

    for (var i in arguments) {
        this[this.length] = arguments[i];
    }
};

Array.prototype.sum = function() {

    var sum = 0;
    for (var i in this) {
        sum += 1 * this[i];
    }
    return sum;
};

Math.log2 = function(x) {
    return Math.log(x) / Math.LN2;
};

Math.log10 = function(x) {
    return Math.log(x) / Math.LN10;
};

Math.cosh = function(x) {
    return (Math.exp(x) + Math.exp(-x)) / 2;
};

Math.sinh = function(x) {
    return (Math.exp(x) - Math.exp(-x)) / 2;
};

Math.tanh = function(x) {

    var t = Math.exp(2 * x);
    return (t - 1) / (t + 1);
};

String.random = function(len) {

    len = len || 32;

    var chars = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

    for (var str = ""; len--; ) {
        str+= chars[36 * Math.random() | 0];
    }
    return str;
};

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/, '');
};

String.prototype.truncate = function(len, app) {

    if (typeof app !== "string")
        app = "...";

    if (len < this.length - app.length) {
        return this.substr(0, len) + app;
    }
    return String(this);
};

String.prototype.truncateurl = function(len, app, pos) {

    if (typeof app !== "string")
        app = "[...]";
    if (typeof pos !== "number")
        pos = 0.8;

    if (len + app.length < this.length) {
        return this.slice(0, pos *= len - app.length) + app + this.slice(pos - len);
    }
    return String(this);
};

String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
};

String.prototype.subpart = function(map) {

    var ret = [];
    for (var i in map) {
        ret.push(this.substr(map[i][0], map[i][1]));
    }
    return ret;
};

Array.prototype.max = function() {
    return Math.max.apply({}, this);
};

Array.prototype.min = function() {
    return Math.min.apply({}, this);
};

Array.prototype.sum = function() {
    for (var i = this.length, sum = 0; i--; sum += this[i]) {}
    return sum;
};

Array.prototype.random = function() {
    return this[this.length * Math.random() | 0];
};

Object.prototype.excludeLargestAmmount = function(threshold) {

    if (threshold === undefined) {
        threshold = 2;
    }

    var tmp = [];
    var max = 0;
    var val = 0;

    for (var i in this) {

        if (this[i] in tmp) {
            tmp[this[i]] = 1;
        } else {
            ++tmp[this[i]];
        }
        if (tmp[this[i]] > max) {
            val = this[i];
            max = tmp[val];
        }
    }

    if (max < threshold) {
        return null;
    }

    for (i in this) {
        if (this[i] == val) {
            delete this[i];
        }
    }
    return val;
}