
var tri = require("../triangle.js").Triangle;

var tests = [{
        alpha: 60,
        beta: null,
        gamma: 50,
        a: 3,
        b: null,
        c: null,
        ha: null,
        hb: null,
        hc: null,
        A: null,
        u: null
    }, {
        alpha: 60,
        beta: 70,
        gamma: 50,
        a: 3,
        b: 3.25,
        c: 2.65,
        ha: 2.49,
        hb: 2.29,
        hc: 2.81,
        A: 3.74,
        u: 8.90
    }, {// A, alpha, gamma
        alpha: 60,
        beta: null,
        gamma: 50,
        a: null,
        b: null,
        c: null,
        ha: null,
        hb: null,
        hc: null,
        A: 500,
        u: null
    }, {
        alpha: 60,
        beta: 70,
        gamma: 50,
        a: 34.68,
        b: 37.63,
        c: 30.68,
        ha: 28.83,
        hb: 26.57,
        hc: 32.59,
        A: 500,
        u: 103
    }, {// SSS: a, b, c
        alpha: null,
        beta: null,
        gamma: null,
        a: 6,
        b: 8,
        c: 10,
        ha: null,
        hb: null,
        hc: null,
        A: null,
        u: null
    }, {
        alpha: 36.86,
        beta: 53.13,
        gamma: 90,
        a: 6,
        b: 8,
        c: 10,
        ha: 8,
        hb: 6,
        hc: 4.8,
        A: 24,
        u: 24
    }, {// AAA: alpha, beta, gamma: not possible
        alpha: 50,
        beta: null,
        gamma: 90,
        a: null,
        b: null,
        c: null,
        ha: null,
        hb: null,
        hc: null,
        A: null,
        u: null
    }, {
        alpha: 50,
        beta: 40,
        gamma: 90,
        a: null,
        b: null,
        c: null,
        ha: null,
        hb: null,
        hc: null,
        A: null,
        u: null
    }, {// AAS: alpha, gamma, c
        alpha: 30,
        beta: null,
        gamma: 50,
        a: null,
        b: null,
        c: 9,
        ha: null,
        hb: null,
        hc: null,
        A: null,
        u: null
    }, {
        alpha: 30,
        beta: 100,
        gamma: 50,
        a: 5.87,
        b: 11.57,
        c: 9,
        ha: 8.86,
        hb: 4.5,
        hc: 5.79,
        A: 26.03,
        u: 26.44
    }, {// ASA: alpha, beta, c
        alpha: 80,
        beta: 70,
        gamma: null,
        a: null,
        b: null,
        c: 10,
        ha: null,
        hb: null,
        hc: null,
        A: null,
        u: null
    }, {
        alpha: 80,
        beta: 70,
        gamma: 30,
        a: 19.7,
        b: 18.79,
        c: 10,
        ha: 9.4,
        hb: 9.85,
        hc: 18.51,
        A: 92.54,
        u: 48.49
    }, {// SAS: alpha, b, c
        alpha: 77,
        beta: null,
        gamma: null,
        a: null,
        b: 10,
        c: 12,
        ha: null,
        hb: null,
        hc: null,
        A: null,
        u: null
    }, {
        alpha: 77,
        beta: 45,
        gamma: 58,
        a: 13.78,
        b: 10,
        c: 12,
        ha: 8.48,
        hb: 11.69,
        hc: 9.74,
        A: 58.46,
        u: 35.78
    }, {// SSA: b, c, beta
        alpha: null,
        beta: 12,
        gamma: null,
        a: null,
        b: 8,
        c: 14,
        ha: null,
        hb: null,
        hc: null,
        A: null,
        u: null
    }, {
        alpha: 146.66,
        beta: 12,
        gamma: 21.33,
        a: 21.14,
        b: 8,
        c: 14,
        ha: 2.91,
        hb: 7.69,
        hc: 4.4,
        A: 30.77,
        u: 43.15
    }];



for (var i = 0; i < tests.length; i += 2) {

    var compare = tests[i + 1];
    var triangle = JSON.parse(JSON.stringify(tests[i]));
    var solution = tri.solve(triangle);

    for (var k in triangle) {

        if (compare[k] - .1 <= triangle[k] && triangle[k] <= compare[k] + .1) {

        } else {
            throw "ERROR";
        }
    }
}
