"use strict";

var factorial = (function() {
    // A recursive, memoized factorial function.
    // If the factorial of n has been computed 
    // before, a cached value is returned.
    // Otherwise, factorial(n) = n*factorial(n-1)
    
    var cache = [];
    
    return function (n){
        if (n < 2) {
            return 1;
        }
        if (!cache[n]) {
            cache[n] = n * factorial(n-1);
        }
        return cache[n];            
    }    
})();

exports.factorial = factorial;


var nChooseK = function (n, k) {
    // Better implementations would be faster, but since n<11 (hopefully), why bother?
    return factorial(n)/factorial(k)/factorial(n-k)
};
exports.nChooseK = nChooseK;


var memoizer = function(func) {
    
    var cache = {};
    var slice = Array.prototype.slice;
    
    return function() {
        var args = slice.call(arguments)
        return (args in cache) ? cache[args] : cache[args] = func.apply(this, args);
    };
};

exports.memoizer = memoizer;


var expandBaseN = function(n, base, nDigits) {
    // Returns an array of numbers representing 
    // the digits of n represented in the given base.
    // nDigits is the number of digits expected in
    // the result. The result is left padded with zeros
    // to make up the required number of digits.
    
    var result = [];
    var temp = n;       
    
    for (var i=0; i<nDigits; i++) {
        result[nDigits-1-i] = temp % base;
        temp = Math.floor(temp / base);
    }        
    return result
};

exports.expandBaseN = expandBaseN;



var arraysEqual = function(A, B) {
    // Equaltity check for nested arrays. If the 
    // values of all elements in an array are equal
    // then returns true. Otherwise returns false.
    
    if (A==B) {
        return true;
    }
    if (A && B && A.constructor === Array && B.constructor === Array) {
        if (A.length != B.length) {
            return false;
        }
        for (var i=0; i<A.length; i++) {
            if (!arraysEqual(A[i], B[i])) {
                return false;
            }
        }
    } 
    else {
        return false
    }
    return true;    
};

exports.arraysEqual = arraysEqual;

/*Tests*/ /*
console.log(arraysEqual(1,1));
console.log(arraysEqual(1,2));
console.log(arraysEqual([1],1));
console.log(arraysEqual([1],[1]));
console.log(arraysEqual([1],[2]));
console.log(arraysEqual([1,2,3],[1,2,3]));
console.log(arraysEqual([1,2,3],[1,2,1]));
console.log(arraysEqual([1,2,3],[3,2,1]));
console.log(arraysEqual([1,[4,5,6],3],[1,[4,5,6],3]));
console.log(arraysEqual([1,[4,5,6],3],[1,[4,7,6],3]));
/**/


var isMemberOf = function(A, set) {
    // Deterimine if A is a member of set
    
    for (var i=0; i < set.length; i++) {
        if (arraysEqual(A, set[i])) {
            return true;
        }        
    }
    return false;
};

exports.isMemberOf = isMemberOf;


/*Tests*/ /*
console.log(isMemberOf([1,[4,5,6],3],[[1,[4,5,6],3],[1,[4,7,6],3]]));
console.log(isMemberOf([1,[4,5,6],3],[[1,[4,8,6],3],[1,[4,7,6],3]]));
/**/

var ticStartTime = new Date().getTime();

var tic = function () {
    ticStartTime = new Date().getTime();
    return ticStartTime;
};

exports.tic = tic;

var toc = function(time) {
    let nowTime = new Date().getTime();
    if (time) {
        return (nowTime-time)*1000;
    }
    else{
        return (nowTime-ticStartTime)/1000;
    }
};

exports.toc = toc;




