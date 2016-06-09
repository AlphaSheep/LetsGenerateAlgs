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


var expandBaseN = function(n, base, nDigits) {
    // Returns an array of numbers representing 
    // the digits of n represented in the given base.
    // nDigits is the number of digits expected in
    // the result. The result is left padded with zeros
    // to make up the required number of digits.
    
    var result = [];
    var temp = n;       
    
    for (i=0; i<nDigits; i++) {
        result[nDigits-1-i] = temp % base;
        temp = Math.floor(temp / base);
    }        
    return result
};

exports.expandBaseN = expandBaseN;