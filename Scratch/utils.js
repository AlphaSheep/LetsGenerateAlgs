
var factorial = (function() {
    // A recursive, memoized factorial function
    // If the factorial of n has been computed before, a cached value is returned.
    // Otherwise, factorial(n) = n*factorial(n-1)
    
    var cache = [];
    
    return function (n){
        if (n < 2) {
            return 1;
        }
        if (!cache[n]) {
            cache[n] = n * cache(n-1);
        }
        return cache[n];            
    }
    
})();

exports.factorial = factorial;


