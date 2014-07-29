/**
 * @license Triangle.js v0.0.1 29/07/2014
 *
 * Copyright (c) 2014, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(global) {

    var formulas = {
        a: [
            {vars: 0, str: "b * sin(alpha) / sin(beta)"},
            {vars: 0, str: "c * sin(alpha) / sin(gamma)"},
            // {vars: 0, str: "a = hb * csc(gamma)"},
            {vars: 0, str: "sqrt(b * b + c * c - 2 * b * c * cos(alpha))"},
            {vars: 0, str: "hc / sin(beta)"},
            {vars: 0, str: "u - b - c"},
            {vars: 0, str: "A / (ha / 2)"},
            {vars: 0, str: "A / (b * sin(gamma) / 2)"},
            {vars: 0, str: "A / (c * sin(beta) / 2)"},
            {vars: 0, str: "sqrt(A * 2 / sin(gamma) * sin(alpha) / sin(beta))"}
        ],
        b: [
            {vars: 0, str: "a * sin(beta) / sin(alpha)"},
            {vars: 0, str: "c * sin(beta) / sin(gamma)"},
            // {vars: 0, str: "a = hb * csc(gamma)"},
            {vars: 0, str: "sqrt(a * a + c * c - 2 * a * c * cos(beta))"},
            {vars: 0, str: "ha / sin(gamma)"},
            {vars: 0, str: "u - a - c"},
            {vars: 0, str: "A / (hb / 2)"},
            {vars: 0, str: "A / (a * sin(gamma) / 2)"},
            {vars: 0, str: "A / (c * sin(alpha) / 2)"}
        ],
        c: [
            {vars: 0, str: "a * sin(gamma) / sin(alpha)"},
            {vars: 0, str: "b * sin(gamma) / sin(beta)"},
            // {vars: 0, str: "a = hb * csc(gamma)"},
            {vars: 0, str: "sqrt(a * a + b * b - 2 * a * b * cos(gamma))"},
            {vars: 0, str: "hb / sin(alpha)"},
            {vars: 0, str: "u - a - b"},
            {vars: 0, str: "A / (hc / 2)"},
            {vars: 0, str: "A / (hc / 2)"},
            {vars: 0, str: "A / (b * sin(alpha) / 2)"},
            {vars: 0, str: "A / (a * sin(beta) / 2)"}
        ],
        alpha: [
            {vars: 0, str: "PI - beta - gamma"},
            {vars: 0, str: "asin(a * sin(beta) / b)"},
            {vars: 0, str: "asin(a * sin(gamma) / c)"},
            {vars: 0, str: "acos((a * a - b * b - c * c) / (-2 * b * c))"},
            {vars: 0, str: "asin(hb / c)"},
            {vars: 0, str: "asin(A / (b * c / 2))"}
        ],
        beta: [
            {vars: 0, str: "PI - alpha - gamma"},
            {vars: 0, str: "asin(b * sin(alpha) / a)"},
            {vars: 0, str: "asin(b * sin(gamma) / c)"},
            {vars: 0, str: "acos((b * b - c * c - a * a) / (-2 * c * a))"},
            {vars: 0, str: "asin(hc / a)"},
            {vars: 0, str: "c * a * sin(beta) / 2"}

        ],
        gamma: [
            {vars: 0, str: "PI - alpha - beta"},
            {vars: 0, str: "asin(c * sin(alpha) / a)"},
            {vars: 0, str: "asin(c * sin(beta) / b)"},
            {vars: 0, str: "acos((c * c - a * a - b * b) / (-2 * a * b))"},
            {vars: 0, str: "asin(ha / b)"},
            {vars: 0, str: "asin(A / (a * b / 2))"}

        ],
        A: [
            {vars: 0, str: "a * ha / 2"},
            {vars: 0, str: "b * hb / 2"},
            {vars: 0, str: "c * hc / 2"},
            {vars: 0, str: "sqrt(u / 2 * (u / 2 - a) * (u / 2 - b) * (u / 2 - c))"},
            {vars: 0, str: "a * b * sin(gamma) / 2"},
            {vars: 0, str: "b * c * sin(alpha) / 2"},
            {vars: 0, str: "c * a * sin(beta) / 2"}
        ],
        ha: [
            {vars: 0, str: "b * sin(gamma)"},
            {vars: 0, str: "2 * A / a"}
        ],
        hb: [
            {vars: 0, str: "c * sin(alpha)"},
            {vars: 0, str: "2 * A / b"}
        ],
        hc: [
            {vars: 0, str: "a * sin(beta)"},
            {vars: 0, str: "2 * A / c"}
        ],
        u: [
            {vars: 0, str: "a + b + c"}
        ]
    };

    var maskOffset = {
        a: 0,
        b: 1,
        c: 2,
        alpha: 3,
        beta: 4,
        gamma: 5,
        A: 6,
        ha: 7,
        hb: 8,
        hc: 9,
        u: 10
    };

    var vars;
    var regexp = /[a-z]+/ig;
    for (var i in formulas) {

        for (var j = 0; j < formulas[i].length; j++) {

            var match, str = formulas[i][j].str, formula = formulas[i][j];

            while (null !== (match = regexp.exec(str))) {

                if (maskOffset[match[0]] !== undefined) {
                    formula.vars |= 1 << maskOffset[match[0]];
                }
            }
        }
    }

    function execFormula(formula, triangle) {

        var str = formula.replace(regexp, function(tok) {

            if (formulas[tok] === undefined) {
                return "Math." + tok;
            }
            return "triangle." + tok;
        });
        return eval(str);
    }


    var Triangle = {
        solve: function(triangle) {

            vars = 0;
            for (var i in triangle) {
                if (triangle[i] !== null) {
                    vars |= 1 << maskOffset[i];

                    if (i === "alpha" || i === "beta" || i === "gamma") {
                        triangle[i] = triangle[i] / 180 * Math.PI;
                    }
                }
            }

            var solution = [];

            for (var x = 0; x < 10; x++) {

                for (var i in triangle) {

                    if (triangle[i] === null) {

                        for (var j = 0; j < formulas[i].length; j++) {

                            var form = formulas[i][j];

                            if (form.vars === (form.vars & vars)) {

                                triangle[i] = execFormula(form.str, triangle);

                                if (isNaN(triangle[i])) {
                                    triangle[i] = null;
                                } else {
                                    vars |= 1 << maskOffset[i];
                                    solution.push(i + " = " + form.str);
                                    break;
                                }
                            }
                        }
                    }
                }

                if (2047 === vars)
                    break;
            }

            if (null !== triangle.alpha)
                triangle.alpha = triangle.alpha / Math.PI * 180;
            if (null !== triangle.beta)
                triangle.beta = triangle.beta / Math.PI * 180;
            if (null !== triangle.gamma)
                triangle.gamma = triangle.gamma / Math.PI * 180;

            return solution;
        }
    };

    if (module && module['exports'])
        module['exports']['Triangle'] = Triangle;

    global['Triangle'] = Triangle;

})(this);
