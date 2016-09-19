"use strict";


var utils = require('./utils.js');

var nChooseK = utils.nChooseK;
var tic = utils.tic;
var toc = utils.toc;


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
    "z'": [[1,2,1,2,2,1,2,1], [4,0,3,7,5,1,2,6], [1,1,1,1,1,1,1,1,1,1,1,1], [4,3,7,11,8,0,2,10,5,1,6,9], [4,1,0,3,5,2]],
    
    "RLmirror": [[0,0,0,0,0,0,0,0], [1,0,3,2,5,4,7,6], [0,0,0,0,0,0,0,0,0,0,0,0], [0,3,2,1,5,4,7,6,8,11,10,9], [0,3,4,1,2,5]]
    // Not a real move, but useful for symmetry reductions
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


/* 
Any naive search will search sequences containing consecutive moves on the same axis. 
If for example, one such sequence contains the sequence R L, then there is no point in
performing a search with L R, as the resulting state will be identical. The following
defines a hierarchy which specifies an arbitrarily chosen order to avoid searching 
duplicate move sequences.
*/
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
    // A move is trivial if it is preceded by the same type or a more dominant move 
    // on the same axis (see trivialFollowSet) 
    
    for (let i=moveset.length-1; i>=0; i--) {
        if (moveAxes[moveset[i]] === moveAxes[move]) {
            if (trivialFollowSet[moveset[i]] >= trivialFollowSet[move]) {
                return true; // Trivial turn
            }
        } 
        else {            
            return false; // Preceded by turn on a different axis
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

//=======================================================================================

/*
Phase 1 simple coordinates
Three simple coordinates are used : CornerTwist, EdgeFlip and a ESlice coord
These specify the corner orientation, the edge orientation and the location 
of the four edges that belong on the E slice. 

These coordinates may be reduced using symmetry.

Adapted from: http://kociemba.org/math/twophase.htm
*/

var getCoordCornTwist = function (state) {
    // Corner orientation coordinate
    // Integer from 0 to 2186
    
    let coord = 0;
    for (let i=0; i<7; i++) {
        // corner orientation of all but last corner
        coord = coord*3 + state[i];
    }        
    return coord;
};

var getCoordEdgeFlip = function (state) {
    // Edge orientation coordinate
    // Integer from 0 to 2047
    
    let coord = 0;
    for (let i=0; i<11; i++) {
        // edge orientation of all but last corner
        coord = coord*2 + state[i];
    }        
    return coord;
};

var getCoordESlice = function (state) {
    // Permutation of the four E slice 
    // Integer from 0 to 494
    
    let coord = 0;
    
    let occupied = 0
    // Loop through in a custom order.
    // The four correct locations come last so that the coordinate of the solved state is 0
    let order = [0,1,2,3,8,9,10,11,4,5,6,7]; 
    for (let idx=0; idx<order.length; idx++) {
        let i = order[idx];
        if (state[i]>=5 && state[i]<=8) {
            occupied++;        
        }
        else if (occupied) {
            coord += nChooseK(idx, occupied-1);
        }
    }    
    return coord;
};

//---------------------------------------------------------------------------------------

/*
Inverses of the above four coordinates
*/

var invertCoordCornTwist =function (coord) {
    // Inverse function for corner orientation coordinate
    
    let state = new Array(8).fill(0);
    let temp = coord;
    let last = 15; // Smallest multiple of 3 such that (last >= 2*7)
    for (let i=6; i>=0; i--) {
        state[i] = temp % 3;
        last -= state[i];
        temp = Math.floor(temp / 3);
    }
    // Last corner is set such that the sum mod 3 is zero.
    state[7] = last % 3;
    return state
}

var invertCoordEdgeFlip =function (coord) {
    // Inverse function for edge orientation
    
    let state = new Array(12).fill(0);
    let temp = coord;
    let last = 12; // Smallest multiple of 2 such that (last >= 1*11)
    for (let i=10; i>=0; i--) {
        state[i] = temp % 2;
        last -= state[i];
        temp = Math.floor(temp / 2);
    }
    // Last edge is set such that the sum mod 2 is zero.
    state[11] = last % 2;
    return state
}

var invertCoordESlice = function (coord) {
    // Inverse function for permutation of the four E slice edges
    
    let state = new Array(12).fill(0);
    
    let tempCoord = coord;
    let nEdgesLeft = 4;
    
    let nextEdge = 8; // Count down since loop goes backward: 8,7,6,5
    
    let order = [0,1,2,3,8,9,10,11,4,5,6,7]; // E slice edges come last
    
    for (let idx=0; idx<order.length; idx++) {
        if (tempCoord >= nChooseK(11-idx, nEdgesLeft-1)) {
            tempCoord -= nChooseK(11-idx, nEdgesLeft-1);
        }
        else {
            state[order[11-idx]] = (nextEdge--);
            nEdgesLeft--;
        }
        if (nEdgesLeft === 0) {
            break;
        }
        
    }
    return state;
};


//=======================================================================================

/*
Phase 1 Move Tables
Functions for constructing move tables for each coordinate. 
*/


// Constants
const nCornTwist = 2187;
const nEdgeFlip = 2048;
const nESlice = 495;

//---------------------------------------------------------------------------------------


var buildCornerTwistMoveTable = function (move) {
    let moveTable = new Array(nCornTwist).fill(0);
    
    for (let coord=0; coord<nCornTwist; coord++) {
        let state = applyMoveCO(move, invertCoordCornTwist(coord));        
        moveTable[coord] = getCoordCornTwist(state);
    }
    return moveTable;
};

var buildEdgeFlipMoveTable = function (move) {
    let moveTable = new Array(nEdgeFlip).fill(0);
    
    for (let coord=0; coord<nEdgeFlip; coord++) {
        let state = applyMoveEO(move, invertCoordEdgeFlip(coord));        
        moveTable[coord] = getCoordEdgeFlip(state);
    }
    return moveTable;
};

var buildESliceMoveTable = function (move) {
    let moveTable = new Array(nESlice).fill(0);
    
    for (let coord=0; coord<nESlice; coord++) {
        let state = applyMoveEP(move, invertCoordESlice(coord));        
        moveTable[coord] = getCoordESlice(state);
    }
    return moveTable;
};

//---------------------------------------------------------------------------------------

var buildTableForAllMoves = function (allowedMoves, tableFunction) {
    // Builds a move table for each of the move. allowedMoves is a list of moves
    // and tableFunction is a function which constructs the move table.
    let moveTables = {};
    for (let m in allowedMoves) {
        let move = allowedMoves[m];
        moveTables[move] = tableFunction(move);
    }
    return moveTables;
};


var phase1AllowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2","L","L'","L2","B","B'","B2"];

// Add some extra moves. These take up a little extra space in the move tables, 
// but make it easier and faster to calculate sym coordinates
var extendedAllowedMoves = phase1AllowedMoves.concat(['y', 'z2', 'RLmirror']);


// Build all three move tables for phase 1
var moveTableCornerTwist = buildTableForAllMoves(extendedAllowedMoves, buildCornerTwistMoveTable);
var moveTableEdgeFlip = buildTableForAllMoves(extendedAllowedMoves, buildEdgeFlipMoveTable);
var moveTableESlice = buildTableForAllMoves(extendedAllowedMoves, buildESliceMoveTable);



//=======================================================================================

/*
Symmetry reductions.
Coordinates can be reduced using symmetry.

The three symmetry transformations used are: y, z2, and RLmirror.
*/

var buildSymmetryMoveTable = function (allowedMoves, nCoordSize, moveTable) {
    let nextSymCoord = 0;
    
    let newMoveTable = 0;
    
    for (let i=0; i<nCoordSize; i++) {
        
    }
}






var getPhase1SymCoordMapTables = function (moveTables) {
    // Generate mapping tables to take raw EO and EsliceEdge coordinates to
    // a combined coordinate that is reduced by symmetry.
    
    let nextSymCoord = 0;
    let symCoordMap = [];//new Array(nPhase1Edges).fill(0);
    let symCoordInvMap = new Array(nEdgeFlip * nESliceEdgePerm).fill(0);
    
    let l = new Array(17).fill(0);
    
    for (let rawCoord=0; rawCoord < (nEdgeFlip * nESliceEdgePerm); rawCoord++) {
        let eoCoord = (rawCoord % nEdgeFlip);
        let eepCoord = Math.floor(rawCoord / nEdgeFlip);
//        console.log('  Start', eoCoord, eepCoord)
        let rawStates = [];
            
        // For each type of symmetry, calculate the state reached
        // and populate the mapping tables
        let alreadyVisited = false;
        
        let newRawCoord = 0;
        
//        console.log('start', rawCoord)
        
        for (let i=0; i<2; i++) {            
            
            if (alreadyVisited) break;
            
            eoCoord = moveTables[1]['RLmirror'][eoCoord];
            eepCoord = moveTables[2]['RLmirror'][eepCoord];

            for (let j=0; j<2; j++) {

                if (alreadyVisited) break;

                eoCoord = moveTables[1]['z2'][eoCoord];
                eepCoord = moveTables[2]['z2'][eepCoord];

                for (let k=0; k<4; k++) {
                    
                    if (alreadyVisited) break;
                    
                    eoCoord = moveTables[1]['y'][eoCoord];
                    eepCoord = moveTables[2]['y'][eepCoord];

                    newRawCoord = (eepCoord * nEdgeFlip) + eoCoord;
                    
//                    console.log('', i,j,k,'--',rawCoord, '=>', newRawCoord, '   \tEO',eoCoord,'EP',eepCoord)
                    
                    if (newRawCoord < rawCoord) {
                        alreadyVisited = true;
                        break;
                    }
                    
                    rawStates.push(newRawCoord);   
//                    console.log(rawCoord, newRawCoord);
                    
                }
            }
        }
        
//        console.log('end', newRawCoord)
        
        if (alreadyVisited) {
            continue;
        }
        
//        let nUniqueSymmStates = 1;
//        
//        for (let j=1; j<rawStates.length; j++) {
//            if (rawStates[0] === rawStates[j]) {
//                nUniqueSymmStates++;
//            }
//        }
//        l[16/nUniqueSymmStates]++;
        
        for (let i=0; i<rawStates.length; i++) {            
            symCoordInvMap[rawStates[i]] = nextSymCoord;            
        }
        
        symCoordMap[nextSymCoord] = rawCoord;
        
        nextSymCoord++;
        
    }
    
//    console.log(nEdgeOri * nESliceEdgePerm);
//    console.log(nextSymCoord);
//    console.log(64430);
//    console.log(l);
    
//    console.log(symCoordMap.length, symCoordInvMap.length)
    
    return [symCoordMap, symCoordInvMap];
}




