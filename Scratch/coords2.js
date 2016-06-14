
var getHash = function(state, maxStateVal) {
    // Returns a single integer uniquely identifying a state. State is an 
    // array of non-negative integers uniquely identifying the state of 
    // each piece, maxStateVal is the maximum value that any element in 
    // state would be expected to have.
    
    var hash = 0;
    for (var i = 0; i < state.length; i++) {
        hash = ((maxStateVal+1) * hash) + state[i];
    }
    return hash;
};

exports.getHash = getHash;


var invertHash = function(hash, maxStateVal, nPieces) {
    // Returns the state that corresponds to the given hash. If nPieces is 
    // provided, the result is left padded with zeros to give the required 
    // number of elements.  
    
    var state = [];
    var temp = hash;
    
    while (temp>0) {
        state.unshift(temp % (maxStateVal+1));
        temp = Math.floor(temp / (maxStateVal+1));
    }
    
    // Note: this relies on the fact that number < undefined to avoid
    // having to check whether nPieces was provided or not.
    while (state.length < nPieces) {
        state.unshift(0);
    }
    
    return state;    
};

exports.invertHash = invertHash;


var findPieces = function(state, pieces, maxStateVal) {
    // Returns the location of pieces in state. If the piece does not exist, 
    // then return maxStateVal.

    var position = [];
    for (var i=0; i<pieces.length; i++) {
        position[i] = state.indexOf(pieces[i]);
        if (position[i] === -1) {
            position[i] = maxStateVal;
        }
    }
    return position;
};
exports.findPieces = findPieces;


var positionsToState = function(positions, pieces, nPieces, maxStateVal) {
    // Returns the location of pieces in state. If the piece does not exist, 
    // then return maxStateVal. Note that this only returns the state of the 
    // pieces of interest. All other positions are zeros. Use mergeStates to
    // combine the results for all pieces.
    
    var state = [];
    for (var i=0; i<nPieces; i++) {
        state[i] = 0;
    }
    for (var i=0; i<positions.length; i++) {
        if (positions[i] < state.length && positions[i] !== maxStateVal) {
            state[positions[i]] = pieces[i];
        }
    }
    return state;
};
exports.positionsToState = positionsToState;


var mergeStates = function (subStates) {
    // Merge several substates into state. Assumes that all pieces in a 
    // substate that are zeros can be ignored.
    
    var state = subStates[0];
    for (var i=1; i<subStates.length; i++) {
        for (var j=0; j<subStates[i].length; j++) {
            state[j] += subStates[i][j];
        }
    }
    return state;
};
exports.mergeStates = mergeStates;


var get333hashes = function(state) {
    // Returns a set of hashes for a 333 state
    
    return [
        getHash(state[0], 2),
        getHash(findPieces(state[1],[1,2,3,4],8),8),
        getHash(findPieces(state[1],[5,6,7,8],8),8),
        getHash(state[2], 1),
        getHash(findPieces(state[3],[1,2,3,4],12),12),
        getHash(findPieces(state[3],[5,6,7,8],12),12),
        getHash(findPieces(state[3],[9,10,11,12],12),12),
        getHash(state[4], 6)
    ];
};
exports.get333hashes = get333hashes;


var invert333hashes = function(hashes) {
    // Returns a set of hashes for a 333 state
    
    var cp1 = invertHash
    
    return [
        invertHash(hashes[0], 3, 8),
        mergeStates([positionsToState(invertHash(hashes[1], 8, 4), [1,2,3,4], 8, 8),
                     positionsToState(invertHash(hashes[2], 8, 4), [5,6,7,8], 8, 8)]),
        invertHash(hashes[3], 2, 12),
        mergeStates([positionsToState(invertHash(hashes[4], 12, 4), [1,2,3,4], 12, 12),
                     positionsToState(invertHash(hashes[5], 12, 4), [5,6,7,8], 12, 12),
                     positionsToState(invertHash(hashes[6], 12, 4), [9,10,11,12], 12, 12)]),
        invertHash(hashes[7], 6, 6)
    ];
};
exports.get333hashes = get333hashes;








// Test cases
// TODO: Move this into a proper test suite

/*
console.log("\nTesting getHash\n")
console.log(getHash([0,1,1,0,1,0,0,1], 2));
console.log(getHash([0,1,1,0,1,0,0,1], 3));
console.log(getHash([0,1,2,0,1,0,2,1], 3));
console.log(getHash([2,0,2,0,2,1,1,0], 2));
console.log(getHash([0,4,1,10], 12));
console.log(getHash([8,6,3,7], 12));
console.log(getHash([5,2,11,9], 12));/**/
/**/


/*
console.log("\nTesting invertHash\n")
console.log(invertHash(1000, 2, 12));
console.log(invertHash(5185, 3));
console.log(invertHash(6217, 3, 8));
console.log(invertHash(4926, 2, 8));
console.log(invertHash(699, 12, 4));
console.log(invertHash(18636, 12, 4));
console.log(invertHash(11475, 12, 4));/**/
/**/


/*
console.log("\nTesting findPieces\n")
console.log(findPieces([1,2,3,4,5,6,7,8], [4,5,6], 8));
console.log(findPieces([1,3,5,7,2,4,6,8], [1,2,3], 8));
console.log(findPieces([0,0,0,0,5,6,7,8], [1,4,5,6], 8));
console.log(findPieces([1,3,10,7,2,9,6,8,5,12,4,11], [1,2,3,4], 12));
console.log(findPieces([1,3,10,7,2,9,6,8,5,12,4,11], [5,6,7,8], 12));
console.log(findPieces([1,3,10,7,2,9,6,8,5,12,4,11], [9,10,11,12], 12));
/**/


/*
console.log("\nTesting positionsToState\n")
console.log(positionsToState([3,4,5], [4,5,6], 8, 8));
console.log(positionsToState([0,4,1], [1,2,3], 8, 8));
console.log(positionsToState([8,8,4,5], [1,4,5,6], 8, 8));

console.log(mergeStates([positionsToState([0,4,1,10], [1,2,3,4], 12, 12),
                         positionsToState([8,6,3,7], [5,6,7,8], 12, 12),
                         positionsToState([5,2,11,9], [9,10,11,12], 12, 12)]));
/**/


/*
console.log("\nTesting get333hashes\n")
var startStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
console.log(get333hashes(startStateRaw));

console.log(invert333hashes([0, 102, 3382, 0, 198, 9718, 19238, 22875]));
/**/



