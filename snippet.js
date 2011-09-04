/**
 * A collection of JavaScript functions I've written over the time
 *
 * Copyright (c) 2011, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

function normalize_angle(n, is_rad) {

	var tau = 360;

	if (undefined !== is_rad) {
		tau = 2 * Math.PI;
	}
	return (tau + (n % tau)) % tau;
}

function angle_between(n, a, b) {

	n = (360 + (n % 360)) % 360;
	a = (360 + (a % 360)) % 360;
	b = (360 + (b % 360)) % 360;

	if (a < b)
		return a <= n && n <= b;
	return a <= n || n <= b;
}

Array.prototype.multipush = function () {

	for(var i in arguments) {
		this[this.length] = arguments[i];
	}
}

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

function scatter_amount(amount, sub, mul) {

	/* Table from: http://aws.amazon.com/de/s3/pricing/
		scattered_price(100000,
			[ 1E3,	49E3,	45E4,	5E5,	4E6,	5E6 ],
			[ 0.14,	0.125,	0.11,	0.095,	0.08,	0.055 ]
		)
	 */
	for (var sum = 0, i = 0; amount > 0; amount-= sub[i++]) {

		sum+= mul[i] * (amount <= sub[i] ? amount : sub[i]);
	//	sum+= mul[i] * (amount - Math.max(0, amount - sub[i]));
	}
	return sum;
}

function chop_amount(n, arr) {

	if (1 !== arr[0]) {
		return false;
	}

	for (var ret = {}, num, i = arr.length; n && i--; ) {

		num = n / arr[i] | 0;
		if (num) {
			ret[arr[i]] = num;
			n-= num * arr[i];
		}
	}
	return ret;
}

function rate(Ra, Rb, winner) {

	// http://de.wikipedia.org/wiki/Elo-Zahl

	var Ea = 1 / (1 + Math.pow(10, (Rb - Ra) / 400)),
	Eb = 1 / (1 + Math.pow(10, (Ra - Rb) / 400));

	// Ra+= k * (Sa - Ea)

	if (2 == winner) {
		Ra+= 10 * (0.0 - Ea);
		Rb+= 10 * (1.0 - Eb);
	} else if (1 == winner) {
		Ra+= 10 * (1.0 - Ea);
		Rb+= 10 * (0.0 - Eb);
	} else {
		Ra+= 10 * (0.5 - Ea);
		Rb+= 10 * (0.5 - Eb);
	}
	return [Ra, Rb];
}

function numberchop(n, arr) {

	var ret = {}, num, i;
	for (i=arr.length; n && i--; ) {

		num = n / arr[i] | 0;
		if (num) {
			ret[arr[i]] = num;
			n-= num * arr[i];
		}
	}
	return ret;
}

function gpp(x) {

	var f = 1,
	n = 1,
	nn;

	if (x <= 0) {
		return 1;
	}

	for (;; n++) {

		if ((nn = n * n) >= x) {
			break;
		}
		if (0 === (x % nn)) {
			f = n;
		}
	}
	return f;
}

function possessive(str) {
	return str + ('s' === str.substr(-1) ? "'" : "'s");
}

function readable_byte(b) {

	var e = Math.log(b) / (10 * Math.LN2) | 0;

	return (Math.round(b / Math.pow(1024, e) * 100) / 100) + [
		'B',
		'KB',
		'MB',
		'GB',
		'TB',
		'PB'
	][e];
}

String.random = function(len) {

	len = len || 32;

	var chars = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

	for (var str = ""; len--; ) {
		str+= chars[36 * Math.random() | 0];
	}
	return str;
}

Math.log2 = function(x) {
	return Math.log(x) / Math.LN2;
}

Math.log10 = function(x) {
	return Math.log(x) / Math.LN10;
}