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

Math["asinh"] = function(x) {
    return Math.log(x + Math.sqrt(x * x + 1));
};

Math["acosh"] = function(x) {
    return Math.log(x + Math.sqrt(x * x - 1));
};

Math["atanh"] = function(x) {

    // 0.5 * (log(1 / (1 - x)) + log(x + 1))

    return 0.5 * Math.log((1 + x) / (1 - x));
};

Math["xround"] = function(x) {
    return Math.pow(10, Math.ceil(Math["log10"](x)));
};

Math["truncate"] = function(n) {
    return n >= 0 ? Math.floor(n) : Math.ceil(n);
};

Math["expm1"] = function(x) {
    return (x < 1e-5 && -1e-5 < x) ? x + .5 * x * x : Math.exp(x) - 1;
};

Math["log2"] = function(x) {
    return Math.log(x) / Math.LN2;
};

Math["log10"] = function(x) {
    return Math.log(x) / Math.LN10;
};

Math["cosh"] = function(x) {
    return (Math.exp(x) + Math.exp(-x)) / 2;
};

Math["sinh"] = function(x) {
    return (Math.exp(x) - Math.exp(-x)) / 2;
};

Math["tanh"] = function(x) {

    // sinh(2x) / (cosh(2x) + 1)
    // (exp(a) - exp(-a)) / (exp(a) + exp(-a))
    // (e^(2a) - 1) / (e^(2a) + 1)

    return 1 - 2 / (Math.exp(2 * x) + 1);
};

Math["sgn"] = function(x) {

    // x < 0 ? -x : x
    // x > 0 ? x : -x

    return (0 < x) - (x < 0);
};


String["random"] = function(len) {

    len = len || 32;

    var chars = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

    for (var str = ""; len--; ) {
        str += chars[36 * Math.random() | 0];
    }
    return str;
};

String.prototype["trim"] = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

String.prototype["truncate"] = function(len, app) {

    if (app === undefined)
        app = "...";

    if (len < this.length - app.length) {
        return this.slice(0, len) + app;
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

String.prototype["repeat"] = function(num) {

    var res = '', pad = this.valueOf();
    while (num > 0) {
        if (num & 1)
            res += pad;
        num >>= 1;
        pad += pad;
    }
    return res;
};

String.prototype["subpart"] = function(map) {

    var ret = [];
    for (var i in map) {
        ret.push(this.substr(map[i][0], map[i][1]));
    }
    return ret;
};

String.prototype["remove"] = function(f, t) {

    return !t || f + t > this.length ? this.substr(0, f) : this.substr(0, f) + this.substr(f + t);
};

Array.prototype.max = function() {
    return Math.max.apply({}, this);
};

Array.prototype.min = function() {
    return Math.min.apply({}, this);
};

Array.prototype.sum = function() {
    for (var i = this.length, sum = 0; i--; sum += this[i]) {
    }
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