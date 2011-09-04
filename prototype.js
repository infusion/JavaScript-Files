 /**
 * A prototype file adding some new functions to the common objects
 *
 * Copyright (c) 2011, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

Math.log2 = function(x) {
	return Math.log(x) / Math.LN2;
}

Math.log10 = function(x) {
	return Math.log(x) / Math.LN10;
}

Math.cosh = function(x) {
	return (Math.exp(x) + Math.exp(-x)) / 2;
}

Math.sinh = function(x) {
	return (Math.exp(x) - Math.exp(-x)) / 2;
}

Math.tanh = function(x) {

	var t = Math.exp(2 * x);
	return (t - 1) / (t + 1);
}

String.random = function(len) {

	len = len || 32;

	var chars = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

	for (var str = ""; len--; ) {
		str+= chars[36 * Math.random() | 0];
	}
	return str;
}
