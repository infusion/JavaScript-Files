

function normalize_angle(n, is_rad) {

	if (undefined !== is_rad) {
		var tau = 2 * Math.PI;
		return (tau + (n % tau)) % tau;
	}
	return (360 + (n % 360)) % 360;
}

function angle_between(n, a, b) {

	n = (360 + (n % 360)) % 360;
	a = (360 + (a % 360)) % 360;
	b = (360 + (b % 360)) % 360;

	if (a < b)
		return a <= n && n <= b;
	return 0 <= n && n <= b || a <= n && n < 360;
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

	for (var i in this) {
		if (this[i] == val) {
			delete this[i];
		}
	}
	return val;
}
