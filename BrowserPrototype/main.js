"use strict";

var stopSearchNow = false;

var movesDef = {
    "U" : [[0,0,0,0, 0,0,0,0], [1,2,3,0, 4,5,6,7], [0,0,0,0, 0,0,0,0, 0,0,0,0], [1,2,3,0, 4,5,6,7, 8,9,10,11], [0,1,2,3,4,5]],
    "U2": [[0,0,0,0, 0,0,0,0], [2,3,0,1, 4,5,6,7], [0,0,0,0, 0,0,0,0, 0,0,0,0], [2,3,0,1, 4,5,6,7, 8,9,10,11], [0,1,2,3,4,5]],
    "U'": [[0,0,0,0, 0,0,0,0], [3,0,1,2, 4,5,6,7], [0,0,0,0, 0,0,0,0, 0,0,0,0], [3,0,1,2, 4,5,6,7, 8,9,10,11], [0,1,2,3,4,5]],
    "R" : [[0,1,2,0, 0,2,1,0], [0,5,1,3, 4,6,2,7], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,5,2,3, 4,9,1,7, 8,6,10,11], [0,1,2,3,4,5]],
    "R2": [[0,0,0,0, 0,0,0,0], [0,6,5,3, 4,2,1,7], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,9,2,3, 4,6,5,7, 8,1,10,11], [0,1,2,3,4,5]],       
    "R'": [[0,1,2,0, 0,2,1,0], [0,2,6,3, 4,1,5,7], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,6,2,3, 4,1,9,7, 8,5,10,11], [0,1,2,3,4,5]],         
    "F" : [[0,0,1,2, 0,0,2,1], [0,1,6,2, 4,5,7,3], [0,0,1,0, 0,0,1,1, 0,0,1,0], [0,1,6,3, 4,5,10,2, 8,9,7,11], [0,1,2,3,4,5]],         
    "F2": [[0,0,0,0, 0,0,0,0], [0,1,7,6, 4,5,3,2], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,1,10,3, 4,5,7,6, 8,9,2,11], [0,1,2,3,4,5]],         
    "F'": [[0,0,1,2, 0,0,2,1], [0,1,3,7, 4,5,2,6], [0,0,1,0, 0,0,1,1, 0,0,1,0], [0,1,7,3, 4,5,2,10, 8,9,6,11], [0,1,2,3,4,5]], 
    "L" : [[2,0,0,1, 1,0,0,2], [3,1,2,7, 0,5,6,4], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,1,2,7, 3,5,6,11, 8,9,10,4], [0,1,2,3,4,5]],                  
    "L2": [[0,0,0,0, 0,0,0,0], [7,1,2,4, 3,5,6,0], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,1,2,11, 7,5,6,4, 8,9,10,3], [0,1,2,3,4,5]],         
    "L'": [[2,0,0,1, 1,0,0,2], [4,1,2,0, 7,5,6,3], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,1,2,4, 11,5,6,3, 8,9,10,7], [0,1,2,3,4,5]],                  
    "D" : [[0,0,0,0, 0,0,0,0], [0,1,2,3, 7,4,5,6], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,1,2,3, 4,5,6,7, 11,8,9,10], [0,1,2,3,4,5]],
    "D2": [[0,0,0,0, 0,0,0,0], [0,1,2,3, 6,7,4,5], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,1,2,3, 4,5,6,7, 10,11,8,9], [0,1,2,3,4,5]],         
    "D'": [[0,0,0,0, 0,0,0,0], [0,1,2,3, 5,6,7,4], [0,0,0,0, 0,0,0,0, 0,0,0,0], [0,1,2,3, 4,5,6,7, 9,10,11,8], [0,1,2,3,4,5]],         
    "B" : [[1,2,0,0, 2,1,0,0], [4,0,2,3, 5,1,6,7], [1,0,0,0, 1,1,0,0, 1,0,0,0], [4,1,2,3, 8,0,6,7, 5,9,10,11], [0,1,2,3,4,5]],         
    "B2": [[0,0,0,0, 0,0,0,0], [5,4,2,3, 1,0,6,7], [0,0,0,0, 0,0,0,0, 0,0,0,0], [8,1,2,3, 5,4,6,7, 0,9,10,11], [0,1,2,3,4,5]],         
    "B'": [[1,2,0,0, 2,1,0,0], [1,5,2,3, 0,4,6,7], [1,0,0,0, 1,1,0,0, 1,0,0,0], [5,1,2,3, 0,8,6,7, 4,9,10,11], [0,1,2,3,4,5]],

    "M" : [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [1,0,1,0,0,0,0,0,1,0,1,0], [2,1,10,3,4,5,6,7,0,9,8,11],[1,5,2,0,4,3]],
    "M2": [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [10,1,8,3,4,5,6,7,2,9,0,11],[5,3,2,1,4,0]],         
    "M'": [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [1,0,1,0,0,0,0,0,1,0,1,0], [8,1,0,3,4,5,6,7,10,9,2,11],[3,0,2,5,4,1]],         
    "E" : [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,1,1,1,1,0,0,0,0], [0,1,2,3,5,6,7,4,8,9,10,11], [0,4,1,2,3,5]],
    "E2": [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [0,1,2,3,6,7,4,5,8,9,10,11], [0,3,4,1,2,5]],
    "E'": [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,1,1,1,1,0,0,0,0], [0,1,2,3,7,4,5,6,8,9,10,11], [0,2,3,4,1,5]],
    "S" : [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,1,0,1,0,0,0,0,0,1,0,1], [0,9,2,1,4,5,6,7,8,11,10,3], [2,1,5,3,0,4]],
    "S2": [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [0,11,2,9,4,5,6,7,8,3,10,1], [5,1,4,3,2,0]],
    "S'": [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,1,0,1,0,0,0,0,0,1,0,1], [0,3,2,11,4,5,6,7,8,1,10,9], [4,1,0,3,5,2]],


    "u" : [[0,0,0,0,0,0,0,0], [1,2,3,0,4,5,6,7], [0,0,0,0,1,1,1,1,0,0,0,0], [1,2,3,0,5,6,7,4,8,9,10,11], [0,4,1,2,3,5]],
    "u2": [[0,0,0,0,0,0,0,0], [2,3,0,1,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [2,3,0,1,6,7,4,5,8,9,10,11], [0,3,4,1,2,5]],
    "u'": [[0,0,0,0,0,0,0,0], [3,0,1,2,4,5,6,7], [0,0,0,0,1,1,1,1,0,0,0,0], [3,0,1,2,7,4,5,6,8,9,10,11], [0,2,3,4,1,5]],
    "r" : [[0,1,2,0,0,2,1,0], [0,5,1,3,4,6,2,7], [1,0,1,0,0,0,0,0,1,0,1,0], [8,5,0,3,4,9,1,7,10,6,2,11], [3,0,2,5,4,1]],         
    "r2": [[0,0,0,0,0,0,0,0], [0,6,5,3,4,2,1,7], [0,0,0,0,0,0,0,0,0,0,0,0], [10,9,8,3,4,6,5,7,2,1,0,11], [5,3,2,1,4,0]],         
    "r'": [[0,1,2,0,0,2,1,0], [0,2,6,3,4,1,5,7], [1,0,1,0,0,0,0,0,1,0,1,0], [2,6,10,3,4,1,9,7,0,5,8,11], [1,5,2,0,4,3]],        
    "f" : [[0,0,1,2,0,0,2,1], [0,1,6,2,4,5,7,3], [0,1,1,1,0,0,1,1,0,1,1,1], [0,9,6,1,4,5,10,2,8,11,7,3], [2,1,5,3,0,4]],
    "f2": [[0,0,0,0,0,0,0,0], [0,1,7,6,4,5,3,2], [0,0,0,0,0,0,0,0,0,0,0,0], [0,11,10,9,4,5,7,6,8,3,2,1], [5,1,4,3,2,0]],
    "f'": [[0,0,1,2,0,0,2,1], [0,1,3,7,4,5,2,6], [0,1,1,1,0,0,1,1,0,1,1,1], [0,3,7,11,4,5,2,10,8,1,6,9], [4,1,0,3,5,2]],
    "l" : [[2,0,0,1,1,0,0,2], [3,1,2,7,0,5,6,4], [1,0,1,0,0,0,0,0,1,0,1,0], [2,1,10,7,3,5,6,11,0,9,8,4], [1,5,2,0,4,3]],
    "l2": [[0,0,0,0,0,0,0,0], [7,1,2,4,3,5,6,0], [0,0,0,0,0,0,0,0,0,0,0,0], [10,1,8,11,7,5,6,4,2,9,0,3], [5,3,2,1,4,0]],
    "l'": [[2,0,0,1,1,0,0,2], [4,1,2,0,7,5,6,3], [1,0,1,0,0,0,0,0,1,0,1,0], [8,1,0,4,11,5,6,3,10,9,2,7], [3,0,2,5,4,1]],
    "b" : [[1,2,0,0,2,1,0,0], [4,0,2,3,5,1,6,7], [1,1,0,1,1,1,0,0,1,1,0,1], [4,3,2,11,8,0,6,7,5,1,10,9], [4,1,0,3,5,2]],
    "b2": [[0,0,0,0,0,0,0,0], [5,4,2,3,1,0,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [8,11,2,9,5,4,6,7,0,3,10,1], [5,1,4,3,2,0]],
    "b'": [[1,2,0,0,2,1,0,0], [1,5,2,3,0,4,6,7], [1,1,0,1,1,1,0,0,1,1,0,1], [5,9,2,1,0,8,6,7,4,11,10,3], [2,1,5,3,0,4]],
    "d" : [[0,0,0,0,0,0,0,0], [0,1,2,3,7,4,5,6], [0,0,0,0,1,1,1,1,0,0,0,0], [0,1,2,3,7,4,5,6,11,8,9,10], [0,2,3,4,1,5]],
    "d2": [[0,0,0,0,0,0,0,0], [0,1,2,3,6,7,4,5], [0,0,0,0,0,0,0,0,0,0,0,0], [0,1,2,3,6,7,4,5,10,11,8,9], [0,3,4,1,2,5]],
    "d'": [[0,0,0,0,0,0,0,0], [0,1,2,3,5,6,7,4], [0,0,0,0,1,1,1,1,0,0,0,0], [0,1,2,3,5,6,7,4,9,10,11,8], [0,4,1,2,3,5]],


    "x" : [[2,1,2,1, 1,2,1,2], [4,5,1,0, 7,6,2,3], [1,0,1,0,0,0,0,0,1,0,1,0], [8,5,0,4,11,9,1,3,10,6,2,7], [3,0,2,5,4,1]],         
    "x2": [[0,0,0,0, 0,0,0,0], [7,6,5,4, 3,2,1,0], [0,0,0,0,0,0,0,0,0,0,0,0], [10,9,8,11,7,6,5,4,2,1,0,3], [5,3,2,1,4,0]],         
    "x'": [[2,1,2,1, 1,2,1,2], [3,2,6,7, 0,1,5,4], [1,0,1,0,0,0,0,0,1,0,1,0], [2,6,10,7,3,1,9,11,0,5,8,4], [1,5,2,0,4,3]],

    "y" : [[0,0,0,0,0,0,0,0], [1,2,3,0,5,6,7,4], [0,0,0,0,1,1,1,1,0,0,0,0], [1,2,3,0,5,6,7,4,9,10,11,8], [0,4,1,2,3,5]],         
    "y2": [[0,0,0,0,0,0,0,0], [2,3,0,1,6,7,4,5], [0,0,0,0,0,0,0,0,0,0,0,0], [2,3,0,1,6,7,4,5,10,11,8,9], [0,3,4,1,2,5]],         
    "y'": [[0,0,0,0,0,0,0,0], [3,0,1,2,7,4,5,6], [0,0,0,0,1,1,1,1,0,0,0,0], [3,0,1,2,7,4,5,6,11,8,9,10], [0,2,3,4,1,5]],

    "z" : [[1,2,1,2,2,1,2,1], [1,5,6,2,0,4,7,3], [1,1,1,1,1,1,1,1,1,1,1,1], [5,9,6,1,0,8,10,2,4,11,7,3], [2,1,5,3,0,4]],
    "z2": [[0,0,0,0,0,0,0,0], [5,4,7,6,1,0,3,2], [0,0,0,0,0,0,0,0,0,0,0,0], [8,11,10,9,5,4,7,6,0,3,2,1], [5,1,4,3,2,0]],
    "z'": [[1,2,1,2,2,1,2,1], [4,0,3,7,5,1,2,6], [1,1,1,1,1,1,1,1,1,1,1,1], [4,3,7,11,8,0,2,10,5,1,6,9], [4,1,0,3,5,2]]
};


var moveAxes = {
    "U" : 0, "U2": 0, "U'": 0,
    "R" : 1, "R2": 1, "R'": 1, 
    "F" : 2, "F2": 2, "F'": 2, 
    "L" : 1, "L2": 1, "L'": 1, 
    "D" : 0, "D2": 0, "D'": 0, 
    "B" : 2, "B2": 2, "B'": 2,

    "M" : 1, "M2": 1, "M'": 1, 
    "E" : 0, "E2": 0, "E'": 0,
    "S" : 2, "S2": 2, "S'": 2,

    "u" : 0, "u2": 0, "u'": 0,
    "r" : 1, "r2": 1, "r'": 1, 
    "f" : 2, "f2": 2, "f'": 2,
    "l" : 1, "l2": 1, "l'": 1,
    "b" : 2, "b2": 2, "b'": 2,
    "d" : 0, "d2": 0, "d'": 0,

    "x" : 1, "x2": 1, "x'": 1,
    "y" : 0, "y2": 0, "y'": 0,
    "z" : 2, "z2": 2, "z'": 2 
};


var trivialFollowSet = {
    "U" : 0, "U2": 0, "U'": 0,
    "R" : 1, "R2": 1, "R'": 1, 
    "F" : 2, "F2": 2, "F'": 2, 
    "L" : 3, "L2": 3, "L'": 3, 
    "D" : 4, "D2": 4, "D'": 4, 
    "B" : 5, "B2": 5, "B'": 5,
    "M" : 6, "M2": 6, "M'": 6, 
    "E" : 7, "E2": 7, "E'": 7,
    "S" : 8, "S2": 8, "S'": 8,
    "u" : 9, "u2": 9, "u'": 9,
    "r" : 10, "r2": 10, "r'": 10, 
    "f" : 11, "f2": 11, "f'": 11,
    "l" : 12, "l2": 12, "l'": 12,
    "b" : 13, "b2": 13, "b'": 13,
    "d" : 14, "d2": 14, "d'": 14,
    "x" : 15, "x2": 15, "x'": 15,
    "y" : 16, "y2": 16, "y'": 16,
    "z" : 17, "z2": 17, "z'": 17
};

var isTrivialMove = function (move, moveset) {
    
    for (let i=moveset.length-1; i>=0; i--) {
        if (moveAxes[moveset[i]] === moveAxes[move]) {
            if (trivialFollowSet[moveset[i]] >= trivialFollowSet[move]) {
                return true; // Trivial turn
            }
        } 
        else {            
            return false; // Turn on a different axis
        }
    }    
    return false; // No trivial turns
};


var applyMoveCP = function (move, cpstate) {
    
    let moveCP = movesDef[move][1];    
    let newState = cpstate.slice(); 
    for (let i=0; i < moveCP.length; i++) {
        newState[moveCP[i]] = cpstate[i];
    }   
    
    return newState;        
};

var applyMoveEP = function (move, epstate) {
    
    let moveEP = movesDef[move][3];    
    let newState = epstate.slice(); 
    for (let i=0; i < moveEP.length; i++) {
        newState[moveEP[i]] = epstate[i];
    }   
    
    return newState;        
};

var applyMoveCentr = function (move, centrstate) {
    
    let moveCentr = movesDef[move][4];    
    let newState = centrstate.slice();
    for (let i=0; i < moveCentr.length; i++) {
        newState[moveCentr[i]] = centrstate[i];
    }   
    
    return newState;    
};

var applyMoveCO = function (move, costate) {
    
    let moveCO = movesDef[move][0];    
    let newState = applyMoveCP(move, costate); 
    
    for (let i=0; i < moveCO.length; i++) {
        newState[i] = (newState[i] + moveCO[i]) % 3;
    }   
        
    return newState;
};

var applyMoveEO = function (move, eostate) {
    
    let moveEO = movesDef[move][2];    
    let newState = applyMoveEP(move, eostate); 
    
    for (let i=0; i < moveEO.length; i++) {
        newState[i] = (newState[i] + moveEO[i]) % 2;
    }   
        
    return newState;
};


var getHash = function(state, maxStateVal) {
    // Returns a single integer uniquely identifying a state. State is an 
    // array of non-negative integers uniquely identifying the state of 
    // each piece, maxStateVal is the maximum value that any element in 
    // state would be expected to have.
    
    let hash = 0;
    for (let i = 0; i < state.length; i++) {
        hash = ((maxStateVal+1) * hash) + state[i];
    }
    return hash;
};


var invertHash = function(hash, maxStateVal, nPieces) {
    // Returns the state that corresponds to the given hash. If nPieces is 
    // provided, the result is left padded with zeros to give the required 
    // number of elements.  
    
    let state = [];
    let temp = hash;
    
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


var findPieces = function(state, pieces, maxStateVal) {
    // Returns the location of pieces in state. If the piece does not exist, 
    // then return maxStateVal.

    let position = [];
    for (let i=0; i<pieces.length; i++) {
        position[i] = state.indexOf(pieces[i]);
        if (position[i] === -1) {
            position[i] = maxStateVal;
        }
    }
    return position;
};


var positionsToState = function(positions, pieces, nPieces, maxStateVal) {
    // Returns the location of pieces in state. If the piece does not exist, 
    // then return maxStateVal. Note that this only returns the state of the 
    // pieces of interest. All other positions are zeros. Use mergeStates to
    // combine the results for all pieces.
    
    let state = [];
    for (let i=0; i<nPieces; i++) {
        state[i] = 0;
    }
    for (let i=0; i<positions.length; i++) {
        if (positions[i] < state.length && positions[i] !== maxStateVal) {
            state[positions[i]] = pieces[i];
        }
    }
    return state;
};


var mergeStates = function (subStates) {
    // Merge several substates into state. Assumes that all pieces in a 
    // substate that are zeros can be ignored.
    
    let state = subStates[0];
    for (let i=1; i<subStates.length; i++) {
        for (let j=0; j<subStates[i].length; j++) {
            state[j] += subStates[i][j];
        }
    }
    return state;
};


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


var invert333hashes = function(hashes) {
    // Returns a set of hashes for a 333 state
    
    let cp1 = invertHash
    
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


var moveTables = {};


var build333MoveTable = function (move) {
    
    let state;
    moveTables[move] = {};
    
    
    // CO
    moveTables[move][0] = {};
    for (let hash=0; hash < Math.pow(3,8); hash++) {
        state = invertHash(hash, 2, 8);
        moveTables[move][0][hash] = getHash(applyMoveCO(move, state), 2);        
    }
    
    // EO
    moveTables[move][2] = {};
    for (let hash=0; hash < Math.pow(2, 12); hash++) {
        state = invertHash(hash, 1, 12);
        moveTables[move][2][hash] = getHash(applyMoveEO(move, state), 1);        
    }
    
    // Note: Because CP and EP track positions of groups of four pieces, and 
    // the positions are independent of the four positions being tracked, 
    // the same move table can be applied to all groups.  
    
    //CP
    moveTables[move][1] = {};
    for (let hash=0; hash < Math.pow(9, 4); hash++) {
        state = positionsToState(invertHash(hash, 8, 4), [1,2,3,4], 8, 8);
        // Skip states that are missing a piece.
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || state.indexOf(4)<0) {
            continue;
        }
        moveTables[move][1][hash] = getHash(findPieces(applyMoveCP(move, state), [1,2,3,4], 8), 8);   
    }
    
    //EP
    moveTables[move][3] = {};
    for (let hash=0; hash < Math.pow(13, 4); hash++) {
        state = positionsToState(invertHash(hash, 12, 4), [1,2,3,4], 12, 12);
        // Skip states that are missing a piece.
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || state.indexOf(4)<0) {
            continue;
        }
        moveTables[move][3][hash] = getHash(findPieces(applyMoveEP(move, state), [1,2,3,4], 12), 12);  
    }
    
    // Centres
    moveTables[move][4] = {};
    for (let hash=0; hash < Math.pow(7,6); hash++) {
        state = invertHash(hash, 6, 6);
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || 
            state.indexOf(4)<0 || state.indexOf(5)<0 || state.indexOf(6)<0) {
            continue;
        }        
        moveTables[move][4][hash] = getHash(applyMoveCentr(move, state), 6);           
    }
};


var moveLookup = function(move, state) {
    return [
        moveTables[move][0][state[0]],
        moveTables[move][1][state[1]],
        moveTables[move][1][state[2]],
        moveTables[move][2][state[3]],
        moveTables[move][3][state[4]],
        moveTables[move][3][state[5]],
        moveTables[move][3][state[6]],
        moveTables[move][4][state[7]]
    ];
};


var pruningTables = {};

var init333PruningTables = function () {    
    for (let i=0; i<10; i++) {
        pruningTables[i] = {};
    }
    pruningTables.maxLength = 1;
    pruningTables.partialLength = 0;
    return;    
};


var expandPruningTables = function (state, nMoves, filling) {

    let pruneState = state.concat([state[4] * state[5] * state[6], state[1] * state[2]]);

    if (filling && nMoves > pruningTables.maxLength) {
        pruningTables.maxLength = nMoves;
    }
    
    if (nMoves > pruningTables.partialLength) {
        pruningTables.partialLength = nMoves;
    }        
    
    for (let i=0; i<pruneState.length; i++) {
        if (!(pruneState[i] in pruningTables[i])) {
            pruningTables[i][pruneState[i]] = nMoves;
        }        
    }    
}


var pruneOld = function (state, nMoves, maxSearchDepth, usePartial) {
    
    let estMovesLowerBound = 0;
    let fallbackLowerBound = Math.max(pruningTables.maxLength, usePartial*pruningTables.partialLength, nMoves);
    
    let pruneState = state.concat([state[4] * state[5] * state[6], state[1] * state[2]]);
    
    for (let i=0; i<pruneState.length; i++) {
        if (pruneState[i] in pruningTables[i]) {
            estMovesLowerBound = pruningTables[i][pruneState[i]];
        } else {
            estMovesLowerBound = fallbackLowerBound;
        }
        if (nMoves + estMovesLowerBound > maxSearchDepth) {    
            return true;
        }        
    }        
        
    return false;
};





var getPruningCoords = function (state) {
    
    // Note: These do not necessarily uniquely identify a state
    
    return [100*state[0] + state[3], // Edge and Corner Orientation
            4096*state[1] + state[2],  // Corner Permutation
            4*state[4] + 2*state[5] + state[6], // Edge Permutation
            128*state[4] + state[1], // LL Permutation
            state[7], // centres
            state[0] + 2*state[1] + 4*state[2] + 8*state[3] + 16*state[4] + 32*state[5] + 64*state[6] + 128*state[7] // Coord sum
           ]; // Edges
};


var prune = function (state, nMoves, maxSearchDepth, usePartial) {
        
    let pruneState = getPruningCoords(state);
    
    for (let i=0; i<pruneState.length; i++) {
        if (pruneState[i] in pruningTables[i]) {
            estMovesLowerBound = pruningTables[i][pruneState[i]];
        } else {
            estMovesLowerBound = fallbackLowerBound;
        }
        if (nMoves + estMovesLowerBound > maxSearchDepth) {    
            return true;
        }        
    }        
        
    return false;
};


var buildPruningTable = function (allowedMoves, targetState, pruningIndex, maxDepth) {
    
    let building = true;
    
    let previousStates = [targetState];
    let nextStates = [];
    
    let nMoves = 1;
    
    pruningTables[pruningIndex] = {};

    let pruneState = getPruningCoords(targetState);
    pruningTables[pruningIndex][pruneState[pruningIndex]] = 0;

    
    console.log('Building pruningTables['+pruningIndex+']');
    
    let startTime = new Date().getTime();
    
    while (building) {
        
        console.log('Starting depth',nMoves,'\tstates:', previousStates.length)
        
        while (previousStates.length > 0) {
            
            let currentState = previousStates.pop();
            
            for (let m=0; m<allowedMoves.length; m++) {
                let move = allowedMoves[m];
                
                let state = moveLookup(move, currentState)
                let pruneState = getPruningCoords(state);
                
                if (pruneState[pruningIndex] in pruningTables[pruningIndex]) {
                    continue
                }
                
                pruningTables[pruningIndex][pruneState[pruningIndex]] = nMoves;
                
                nextStates.push(state);                
            }                          
        }
        
        previousStates = nextStates;
        nextStates = [];
                    
        nMoves++;
            
        if (nMoves > maxDepth || previousStates.length === 0) {
            building = false;
        }
    }
    
    let nowTime = new Date().getTime();
    let elapsedTime = (nowTime-startTime)/1000;

    console.log('Done in',elapsedTime,'seconds.');
};


var buildAllPruningTables = function(allowedMoves, targetState) {
    
    let startTime = new Date().getTime();
    
    pruningTables = {};
    
    let pruneState = getPruningCoords(targetState);
    
    for (let i=0; i<pruneState.length; i++) {
        buildPruningTable(allowedMoves, targetState, i, 16);
    }
    
    saveCachedPruningTables();
    
    let nowTime = new Date().getTime();
    let elapsedTime = (nowTime-startTime)/1000;

    console.log('\nBuilt and saved in',elapsedTime,'seconds.\n');
}


var arraysEqual = function(A, B) {
    // Equaltity check for nested arrays. If the 
    // values of all elements in an array are equal
    // then returns true. Otherwise returns false.
    
    if (A==B) {
        return true;
    }
    if (A && B && A.constructor === Array && B.constructor === Array) {
        if (A.length !== B.length) {
            return false;
        }
        for (let i=0; i<A.length; i++) {
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


var caseCount = 0;

var depthFirstSearch = function (sequence, startState, targetState, allowedMoves, maxSearchDepth, expandPruning, timeOut, logSteps, logSolutions) {
    
    let solutions = [];
    let solving = true;

//    console.log(caseCount, startState, targetState, sequence.join(' '))
    
    if (arraysEqual(startState, targetState)) {
//        console.log("*** Solution found", sequence.join(' '))
        return [sequence.join(' ')];
    }
    
    if (sequence.length >= maxSearchDepth) {
        return solutions;
    }
        
    for (let m=0; m<allowedMoves.length; m++) {
        let move = allowedMoves[m];
        
        if (!solving) {
            break;
        }
        
        if (stopSearchNow) {
            console.log("Stopping")
            break;
        }
        
        if (isTrivialMove(move, sequence)) {
            continue;
        }
        
        if (expandPruning) {    
            let inverseState = targetState;
            for (let j=0; j<sequence.length; j++) {
                inverseState = moveLookup(sequence[j], inverseState);
            }
            inverseState = moveLookup(move, inverseState);
            expandPruningTables(inverseState, sequence.length, (expandPruning === 2));
        }
        
        if (!expandPruning || expandPruning<2) {
            if (prune(startState, sequence.length, maxSearchDepth, 1)) {
                continue;
            }
        }
        caseCount++;
        
        let nextSequence = sequence.concat(move);
        let nextState = moveLookup(move, startState);
        
        let thisCaseCount = caseCount+0;

        let result = depthFirstSearch (nextSequence, nextState, targetState, allowedMoves, maxSearchDepth, expandPruning, timeOut, logSteps, logSolutions)

        solutions = solutions.concat(result);        
        
    }
    return solutions;
};



var breadthFirstSearch = function (startState, targetState, allowedMoves, maxSearchDepth, expandPruning, timeOut, logSteps, logSolutions) {
    let solutions = [];
    
    let nMoves = 0;
    let solving = true;
    let hasTimedOut = false;

    let prevSequences = [[]]; // List of all sequences to be continued in the current step
    // NOTE: This is an array which contains an empty array, because some sequence needs to exist to be continued.
    let nextSequences = []; // List of all sequences to be continued by the next step
    
    let nStatesTotal = 0;
    
    let startTime = new Date().getTime();
    let nowTime = new Date().getTime();
    let elapsedTime = (nowTime-startTime)/1000;
    
    console.log("Starting search to depth", maxSearchDepth);

    while (solving) {
        nMoves++;
                
        while (prevSequences.length > 0) {
            // While there are still sequences in the stack, process the next sequence
            
            // Escape the loop early if neccessary.
            if (!solving) {
                break;
            }
            
            // Get the sequence
            let sequenceKeys = prevSequences.pop();
            let sequence = [];
            for (let j=0; j<sequenceKeys.length; j++) {
                sequence[j] = allowedMoves[sequenceKeys[j]];
            }            
            
            // Compute the state reached from the start state before the next move
            let prevState = startState;
            for (let j=0; j<sequence.length; j++)            
                prevState = moveLookup(sequence[j], prevState);

            // Compute the state reached from the target state (to add to the pruning table)
            let prevReverseState = targetState;
            if (expandPruning) {    
                for (let j=0; j<sequence.length; j++) {
                    prevReverseState = moveLookup(sequence[j], prevReverseState);
                }
            }
            
            for (let m = 0; m < allowedMoves.length; m++) {
                let move = allowedMoves[m];
                
                if (stopSearchNow) {
                    console.log("Stopping")
                    hasTimedOut = true;
                    solving = false;
                    break;
                }
                
                if (isTrivialMove(move, sequence)) {
                    continue;
                }
                
                let state = moveLookup(move, prevState);
                
                if (expandPruning) {                        
                    let reverseState = moveLookup(move, prevReverseState);
                    expandPruningTables(reverseState, nMoves, (expandPruning === 2));
                }
                
                if (!expandPruning || expandPruning<2) {
                    if (prune(state, nMoves, maxSearchDepth, 1)) {
                        continue;
                    }
                }
                
                if (arraysEqual(state, targetState)) {
                    
                    solutions.push(sequence.concat(move).join(" "));
                    
                    if (logSolutions) {
                        nowTime = new Date().getTime();
                        elapsedTime = (nowTime-startTime)/1000;

                        console.log("*** Found solution:", (sequence.concat(move)).join(" "), 
                                    "after", elapsedTime, "s\n");
                    }

                    continue;
                }
                
                nStatesTotal++;
                nextSequences.push(sequenceKeys.concat(m));                
            }
        }

        // Move all of the sequences that have just been searched onto the stack, and then clear them
        prevSequences = nextSequences;
        nextSequences = [];

        if (logSteps) {
            nowTime = new Date().getTime();    
            elapsedTime = (nowTime-startTime)/1000;

            console.log("   ", nMoves, " move search complete",
                        "\t# states: ", nStatesTotal, 
                        "\tTime elapsed: ", elapsedTime, "s",
                        "\t(",solutions.length,"solutions found so far )\n");
        }

        if (nMoves >= maxSearchDepth) {
            solving = false;
        }
    }
    return solutions;
            
};


var breadthFirstSearchOriginal = function (startState, targetState, allowedMoves, maxSearchDepth, expandPruning, timeOut, logSteps, logSolutions) {
    let solutions = [];
    
    let nMoves = 0;
    let solving = true;
    let hasTimedOut = false;

    let sequences = [[]]; // List of all sequences to be continued in the current step
    let nextMoveSequences = []; // List of all sequences to be continued by the next step

    let nStatesNow = 1;
    let nStatesTotal = 0;

    let startTime = new Date().getTime();
    let nowTime = new Date().getTime();
    let elapsedTime = (nowTime-startTime)/1000;

    console.log("\n\nStarting search to depth", maxSearchDepth);

    while (solving) {
        nMoves++;

        for (let m=0; m<allowedMoves.length; m++) {
            let move = allowedMoves[m];
            if (!solving) {
                break;
            }

            for (let i=0; i<nStatesNow; i++) {     
                
                if (stopSearchNow) {
                    console.log("Stopping")
                    hasTimedOut = true;
                    solving = false;
                    break;
                }
                    
                let sequenceKeys = sequences[i];
                let sequence = [];
                for (let j=0; j<sequenceKeys.length; j++) {
                    sequence[j] = allowedMoves[sequenceKeys[j]];
                }

                // Skip redundant moves
                if (isTrivialMove(move, sequence)) {
                    continue;
                }

                // Compute the state that's reached from the start state by the current sequence
                let state = startState;
                for (let j=0; j<sequence.length; j++)            
                    state = moveLookup(sequence[j], state);
                state = moveLookup(move, state);
                
                // Compute the state reached by applying the move sequence to the target state (to add to the pruning table)
                if (expandPruning) {    
                    let inverseState = targetState;
                    for (let j=0; j<sequence.length; j++) {
                        inverseState = moveLookup(sequence[j], inverseState);
                    }
                    inverseState = moveLookup(move, inverseState);
                    expandPruningTables(inverseState, nMoves, (expandPruning === 2));
                }
                
                if (!expandPruning || expandPruning<2) {
                    if (prune(state, nMoves, maxSearchDepth, 1)) {
                        continue;
                    }
                }

                if (!(i % 20000)) {
                    nowTime = new Date().getTime();
                    elapsedTime = (nowTime-startTime)/1000;
                    
                    if (elapsedTime > timeOut) {
                        console.log("\nSearch timed out.\n")
                        solving = false;
                        hasTimedOut = true;
                        break;
                    }
                    
                    if (logSteps) {
                        let nStates = (nStatesTotal+nextMoveSequences.length)
                        let nStatesMemory = (sequences.length+nextMoveSequences.length);
                        let speed = Math.round((nStatesTotal+nextMoveSequences.length)/elapsedTime);

                        let logString = "nMoves: " + nMoves +
                                    "\t# states: " + nStates +
                                    " (in memory: " + nStatesMemory + ")" +
                                    "\tTime elapsed: " + elapsedTime + " s" + 
                                    "\t(" + speed + " states/s)";

                        console.log(logString);
                    }
                }

                if (arraysEqual(state, targetState)) {
                    
                    solutions.push(sequence.concat(move).join(" "));
                    
                    if (logSolutions) {
                        nowTime = new Date().getTime();
                        elapsedTime = (nowTime-startTime)/1000;

                        console.log("*** Found solution:", (sequence.concat(move)).join(" "), 
                                    "after", elapsedTime, "s\n");
                    }

                    continue;
                }

                nextMoveSequences.push(sequenceKeys.concat(m));
            }
        }    

        // Dump all sequences that have been continued
        sequences = nextMoveSequences;

        nextMoveSequences = [];

        // Update state indices
        nStatesTotal += sequences.length + nStatesNow;
        nStatesNow = sequences.length;

        if (logSteps) {
            nowTime = new Date().getTime();    
            elapsedTime = (nowTime-startTime)/1000;

            console.log("   ", nMoves, " move search complete",
                        "\t# states: ", nStatesTotal, 
                        "\tTime elapsed: ", elapsedTime, "s",
                        "\t(",solutions.length,"solutions found so far )\n");
        }

        if (nMoves >= maxSearchDepth) {
            solving = false;
        }
    }
    
    nowTime = new Date().getTime();    
    elapsedTime = (nowTime-startTime)/1000;
    
    console.log("    Search at depth", maxSearchDepth, "complete in", elapsedTime, "seconds. ",solutions.length,"solutions found.")
    if (hasTimedOut) {
        return false;
    }
    else {
        return solutions;
    }
};
    

var sequentialSearch = function(maxSearchDepth, startState, targetState, allowedMoves) {
    // Carries out searches to a sequentially increasing depth. This is much faster than
    // simply carrying out a search at the required depth as it ensures that the pruning
    // tables are filled by doing much faster searches at lower depths.
    let solutions = [];
    let foundSoln = 0;

    let resultsDiv = document.getElementById("ResultsDiv");
    resultsDiv.innerHTML = '';
    
    let startDepth = Math.max(5, Math.min(pruningTables.maxLength-1, 8));
    
    for (let k = startDepth; k <= maxSearchDepth; k++) {
        
        let startTime = new Date().getTime();
        
        solutions = breadthFirstSearch(startState, targetState, allowedMoves, k, 1, 10, false, false);        
        
        let nowTime = new Date().getTime();
        let elapsedTime = (nowTime-startTime)/1000;
        console.log("    Search to depth",k,"completed in",elapsedTime,"seconds.");
                    
        if (solutions === false) {
            break;
        }
        if (solutions.length>2) {
            if (foundSoln > -1){
                break;
            } else {
                foundSoln++
            }
        }        
        
    }
    
    saveCachedPruningTables();
    
    console.log("Sequential search complete")
    for (let i = 0; i<solutions.length; i++) {
        console.log(solutions[i]);
        resultsDiv.innerHTML += solutions[i]+'<br/><br/>';
    }
    return solutions;
};

var sequentialSearchOriginal = function(maxSearchDepth, startState, targetState, allowedMoves) {
    // Carries out searches to a sequentially increasing depth. This is much faster than
    // simply carrying out a search at the required depth as it ensures that the pruning
    // tables are filled by doing much faster searches at lower depths.
    let solutions = [];
    let foundSoln = 0;
    
    let resultsDiv = document.getElementById("ResultsDiv");
    resultsDiv.innerHTML = '';
    
    let startDepth = Math.max(5, Math.min(pruningTables.maxLength-1, 8));
    
    for (let k = startDepth; k <= maxSearchDepth; k++) {
        
        let startTime = new Date().getTime();
        
        solutions = breadthFirstSearchOriginal(startState, targetState, allowedMoves, k, 1, 10, false, false);        
        
        let nowTime = new Date().getTime();
        let elapsedTime = (nowTime-startTime)/1000;
        console.log("    Search to depth",k,"completed in",elapsedTime,"seconds.");
                    
        if (solutions === false) {
            break;
        }
        if (solutions.length>2) {
            if (foundSoln > -1){
                break;
            } else {
                foundSoln++
            }
        }        
        
    }
    
    saveCachedPruningTables();
    
    console.log("Sequential search complete")
    for (let i = 0; i<solutions.length; i++) {
        console.log(solutions[i]);
        resultsDiv.innerHTML += solutions[i]+'<br/><br/>';
    }
    return solutions;
};



var sequentialSearchDepthFirst = function(maxSearchDepth, startState, targetState, allowedMoves) {
    // Carries out searches to a sequentially increasing depth. This is much faster than
    // simply carrying out a search at the required depth as it ensures that the pruning
    // tables are filled by doing much faster searches at lower depths.
    let solutions = [];
    let foundSoln = 0;
    
    let startDepth = 1;
    
    let resultsDiv = document.getElementById("ResultsDiv");
    resultsDiv.innerHTML = '';
    
    
    for (let k = startDepth; k <= maxSearchDepth; k++) {
        let startTime = new Date().getTime();
        caseCount = 0;
        console.log("Searching depth",k)
        solutions = depthFirstSearch([], startState, targetState, allowedMoves, k, 1, 10, false, false);
        let nowTime = new Date().getTime();
        let elapsedTime = (nowTime-startTime)/1000;
        console.log("    Search to depth",k,"completed in",elapsedTime,"seconds.", caseCount, "cases encountered.")
        
//        saveCachedPruningTables();

        if (solutions === false) {
            break;
        }
        if (solutions.length>0) {
            if (foundSoln > -1){
                break;
            } else {
                foundSoln++
            }
        }        
        
    }
    console.log("Depth first sequential search complete")
    for (let i = 0; i<solutions.length; i++) {
        console.log(solutions[i]);
        resultsDiv.innerHTML += solutions[i]+'<br/><br/>';
    }
    return solutions;
};


var fillPruningTables = function(maxSearchDepth, startState, targetState, allowedMoves) {

    let solutions = [];
    
    solutions = breadthFirstSearch(startState, targetState, allowedMoves, maxSearchDepth, 2, 240, true, true);    
    saveCachedPruningTables();
    
    logPruningSizes();
};


var moveTableCounter = 0;

var init333MoveTables = function(allowedMoves) {
    
    let dbrequest = indexedDB.open("MoveTables", 1)
    
    dbrequest.onupgradeneeded = function (){
        let db = event.target.result;
        
        db.createObjectStore("moves", {keyPath: "moveName"});
    };
    
    dbrequest.onsuccess = function(event) {

        let db = event.target.result;
        
        for (let i=0; i < allowedMoves.length; i++) {
            let thisMoveName = allowedMoves[i]; //"Move_"+allowedMoves[i].toString().replace(/\'/g,"i");
            
            let readRequest = db.transaction(["moves"], "readwrite").objectStore("moves").get(thisMoveName);
            
            readRequest.onsuccess = function(event) {
                
                if (event.target.result) {
                    console.log("Loading table from",event.target.result.moveName,"into",thisMoveName);
                    
                    moveTables[thisMoveName] = event.target.result.moveTableData;
                    moveTableCounter++;
                    if (moveTableCounter === allowedMoves.length) {
                        let div = document.getElementById("LoadingStatus");
                        div.innerHTML = "Tables loaded."
                        div = document.getElementById("ButtonBlock");
                        div.style.display = "block";
                    }
                }
                else {
                        
                    build333MoveTable(allowedMoves[i]);

                    let writeRequest = db.transaction(["moves"], "readwrite").objectStore("moves")
                    .add({moveName: thisMoveName, moveTableData: moveTables[allowedMoves[i]]});
                    
                    writeRequest.onsuccess = function () {
                        moveTableCounter++;
                        if (moveTableCounter === allowedMoves.length) {
                            let div = document.getElementById("LoadingStatus");
                            div.innerHTML = "Tables loaded."
                            div = document.getElementById("ButtonBlock");
                            div.style.display = "block";
                        }
                    };
                    
                }
            };
        }
    };
    
    dbrequest.onerror = function(event) {
        throw(Error("Error opening IndexedDB"));
    };
    
};


var loadCachedPruningTables = function() {
    let dbrequest = indexedDB.open("PruningTables", 1)    

    dbrequest.onupgradeneeded = function (){
        let db = event.target.result;
        
        db.createObjectStore("pruning", {keyPath: "allowedMoves"});
    };
    
    dbrequest.onsuccess = function(event) {
        let db = event.target.result;
        
        let pruningName = allowedMoves.sort().join("_").replace(/\'/g,"i");
        let readRequest = db.transaction(["pruning"], "readwrite").objectStore("pruning").get(pruningName);
        
        readRequest.onsuccess = function(event) {
                
            if (event.target.result) {
                let pTables = event.target.result.pTableData;
                for (let key in pTables){
                    pruningTables[key] = pTables[key];
                }
                pruningTables.partialLength = pruningTables.maxLength;
                console.log("Pruning tables loaded");
            }
            logPruningSizes();
        };
        
    };
};


var logPruningSizes = function() {
    let nElements = 0;
    for (let i=0; i<Object.keys(pruningTables).length; i++) {
        if (pruningTables[i]) {
            nElements += Object.keys(pruningTables[i]).length;
        }   
    }        
    console.log("Pruning tables complete to length", pruningTables.maxLength-1);
    console.log("Pruning tables partially filled to length", pruningTables.partialLength);
    console.log("Number of elements:", nElements);
};


var saveCachedPruningTables = function() {
    console.log("\nSaving pruning tables");
    logPruningSizes();
    
    let dbrequest = indexedDB.open("PruningTables", 1)    

    dbrequest.onupgradeneeded = function (){
        let db = event.target.result;
        
        db.createObjectStore("pruning", {keyPath: "allowedMoves"});
    };
    
    dbrequest.onsuccess = function(event) {
        let db = event.target.result;
        
        let pruningName = allowedMoves.sort().join("_").replace(/\'/g,"i");
        
        let writeRequest = db.transaction(["pruning"], "readwrite").objectStore("pruning")
        .put({allowedMoves: pruningName, pTableData: pruningTables});
        
        writeRequest.onerror = function (event) {
            console.log("Error writing pTables to DB.")
            console.log(event);
        }
    };
};

var solvedStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var solvedState = get333hashes(solvedStateRaw);

//var startStateRaw = [[0,2,2,0,0,0,2,0], [2,1,7,4,5,6,3,8], [0,0,0,0,0,0,0,0,0,0,0,0], [2,7,3,4,5,6,1,8,9,10,11,12], [1,2,3,4,5,6]]; // Sexy
//var startStateRaw = [[0,0,0,0,0,0,0,0], [4,1,2,3,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [4,1,2,3,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // One move
var startStateRaw = [[0,0,0,0,0,0,0,0], [1,3,2,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [2,1,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // Ja
//var startStateRaw = [[0,0,0,0,0,0,0,0], [1,3,2,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,4,3,2,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // T
var startStateRaw = [[0,0,0,0,0,0,0,0], [1,3,2,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [3,2,1,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // F
//var startStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,3,4,2,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // U
var startState = get333hashes(startStateRaw);

var targetState = solvedState;

var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2","L","L'","L2","B","B'","B2"];

//var allowedMoves = ["R","R'","U","U'","U2","L","L'"];
//var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'"];
//var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","L","L'","L2"];

console.log("Populating Move Tables");
init333MoveTables(allowedMoves);

console.log("Initialising Pruning Tables");
init333PruningTables();
expandPruningTables(solvedState, 0, 0);
loadCachedPruningTables();

console.log(startStateRaw)
console.log(startState)
console.log(allowedMoves)


var dosomething2 = function() {
    sequentialSearch(17, startState, targetState, allowedMoves)
}

var dosomething = function() {
    sequentialSearchOriginal(11, startState, targetState, allowedMoves)
}

var dosomethingelse = function() {
    sequentialSearchDepthFirst(11, startState, targetState, allowedMoves)
}

var fillpruningbtn = function() {
    fillPruningTables(7, startState, targetState, allowedMoves)
}
