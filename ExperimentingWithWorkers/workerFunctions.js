

var commonTask = function (value, n) {
    let x  = {};
    for (let i=0; i<(n*(54323+n)); i++) {
        value += 3*Math.sin(value);
        x[value] = value--;
    }
    return value;
};
