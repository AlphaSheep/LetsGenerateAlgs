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
            return false; // Preceded by turn on a different axis
        }
    }    
    return false; // No trivial turns
};


var applyRawMoveOrientation = function (oriState, moveOriEffect, movePermEffect, nOrientations) {

    let newState = applyRawMovePermutation(oriState, movePermEffect);

    for (let i=0; i < moveOriEffect.length; i++) {
        newState[i] = (newState[i] + moveOriEffect[i]) % nOrientations;
    }   

    return newState;
};


var applyRawMovePermutation = function (permState, movePermEffect) {

    let newState = permState.slice();

    for (let i=0; i < movePermEffect.length; i++) {
        newState[movePermEffect[i]] = permState[i];
    }

    return newState;    
};


var createNewPruningTables = (function () {
   

    var coord333HashFunction = {
        0: function (state) {
            // Corner orientation coordinate
            // Input is [CO]
            // Est size = 2,187
            let coord = 0;
            for (let i=0; i<7; i++) {
                // corner orientation of all but last corner
                coord = coord*3 + state[0][i];
            }        
            return coord;
        },
        1: function (state) {
            // Edge orientation coordinate
            // Input is [EO]
            // Est size = 2,048
            let coord = 0;
            for (let i=0; i<11; i++) {
                // edge orientation of all but last edge
                coord = coord*2 + state[0][i];
            }
            return coord;
        },
        2: function (state) {
            // Corner Permutation
            // Input is [CP]
            // Est size = 40,320
            let coord = 0;
            for (let i=0; i<8; i++) {
                // corner permutation
                coord = coord*9 + state[0][i];
            }        
            return coord;
        },
        3: function (state) {
            // Full orientation coordinate
            // Input is [CO, EO]
            // Est size = 4,478,976
            let coord = 0;
            for (let i=0; i<7; i++) {
                // corner orientation
                coord = coord*3 + state[0][i];
            }
            for (let i=0; i<11; i++) {
                // edge orientation
                coord = coord*2 + state[1][i];
            }
            return coord;
        },
        4: function (state) {
            // Full corner coordinate
            // Input is [CO, CP]
            // Est size = 11,022,480
            let coord = 0;
            for (let i=0; i<7; i++) {
                // corner orientation of all but last corner
                coord = coord*3 + state[0][i];
            }
            for (let i=0; i<7; i++) {
                // home position of corner in each position
                coord = coord*9 + state[1][i];
            }        
            return coord;
        },
        5: function (state) {
            // First four edge coordinate (U edges)
            // Input is [EO, EP]
            // Est size = 190,080
            let coord = 0;
            for (let i=0; i<12; i++) {
                // For each position, if the edge is one of the 4 edges
                coord *= 26;
                if (state[1][i] <= 4) {
                    // Encode the position and orientation of the edge
                    coord += state[1][i]*2 + state[0][i];                
                }
            }            
            return coord;
        },
        6: function (state) {
            // Second four edge coordinate (E edges)
            // Input is [EO, EP]
            // Est size = 190,080
            let coord = 0;
            for (let i=0; i<12; i++) {
                // For each position, if the edge is one of the 4 edges
                coord *= 26;
                if (state[1][i] > 4 && state[1][i] <= 8) {
                    // Encode the position and orientation of the edge
                    coord += state[1][i]*2 + state[0][i];                
                }
            }            
            return coord;
        },
        7: function (state) {
            // Third four edge coordinate (D edges)
            // Input is [EO, EP]
            // Est size = 190,080
            let coord = 0;
            for (let i=0; i<12; i++) {
                // For each position, if the edge is one of the 4 edges
                coord *= 26;
                if (state[1][i] > 8) {
                    // Encode the position and orientation of the edge
                    coord += state[1][i]*2 + state[0][i];                
                }
            }            
            return coord;
        },    
        8: function (state) {
            // Full centre coordinate
            // Input is [centres]
            // Est size = 24
            let coord = 0;
            for (let i=0; i<5; i++) {
                // positions of 5 of the centres
                coord = coord*7 + state[0][i];
            }        
            return coord;
        },
        9: function (state) {
            // First four edge position coordinate 
            // Input is [EP]
            // Est size = 11,880
            let coord = 0;
            for (let i=0; i<12; i++) {
                // For each position, if the edge is one of the 4 edges
                coord *= 13;
                if (state[0][i] <= 4) {
                    // Encode the position and orientation of the edge
                    coord += state[0][i];               
                }
            }            
            return coord;
        },
        10: function (state) {
            // Second four edge position coordinate 
            // Input is [EP]
            // Est size = 11,880
            let coord = 0;
            for (let i=0; i<12; i++) {
                // For each position, if the edge is one of the 4 edges
                coord *= 13;
                if (state[0][i] > 4 && state[0][i] <= 8) {
                    // Encode the position and orientation of the edge
                    coord += state[0][i];               
                }
            }            
            return coord;
        },
        11: function (state) {
            // Third four edge position coordinate 
            // Input is [EP]
            // Est size = 11,880
            let coord = 0;
            for (let i=0; i<12; i++) {
                // For each position, if the edge is one of the 4 edges
                coord *= 13;
                if (state[0][i] > 8) {
                    // Encode the position and orientation of the edge
                    coord += state[0][i];               
                }
            }            
            return coord;
        },
        12: function (state) {
            // Second four corner position coordinate 
            // Input is [CP]
            // Est size = 1,680
            let coord = 0;
            for (let i=0; i<8; i++) {
                // For each position, if the corner is one of the 4 corners
                coord *= 9;
                if (state[0][i] <= 4) {
                    // Encode the position and orientation of the corner
                    coord += state[0][i];               
                }
            }            
            return coord;
        },
        13: function (state) {
            // Second four corner position coordinate 
            // Input is [CP]
            // Est size = 1,680
            let coord = 0;
            for (let i=0; i<8; i++) {
                // For each position, if the corner is one of the 4 corners
                coord *= 9;
                if (state[0][i] > 4) {
                    // Encode the position and orientation of the corner
                    coord += state[0][i];               
                }
            }            
            return coord;
        }
    };


    var coord333RawStateMap = {
        0: function (state) {
            // Corner orientation coordinate
            // Output is [CO]
            return [state[0]];
        },
        1: function (state) {
            // Edge orientation coordinate
            // Output is [EO]
            return [state[2]];
        },
        2: function (state) {
            // Corner permutation coordinate
            // Output is [CP]
            return [state[1]];
        },
        3: function (state) {
            // Full orientation coordinate
            // Output is [CO, EO]
            return [state[0], state[2]];
        },
        4: function (state) {
            // Full corner coordinate
            // Output is [CO, CP]
            return [state[0], state[1]];
        },
        5: function (state) {
            // First four edge coordinate (U edges)
            // Output is [EO, EP]
            return [state[2], state[3]];
        },
        6: function (state) {
            // Second four edge coordinate (E edges)
            // Output is [EO, EP]
            return [state[2], state[3]];
        },
        7: function (state) {
            // Third four edge coordinate (D edges)
            // Output is [EO, EP]
            return [state[2], state[3]];
        },
        8: function (state) {
            // Full centre coordinate
            // Output is [centres]
            return [state[4]];
        },
        9: function (state) {
            // First four edge position coordinate 
            // Input is [EP]
            return [state[3]];
        },
        10: function (state) {
            // Second four edge position coordinate 
            // Input is [EP]
            return [state[3]];
        },
        11: function (state) {
            // Third four edge position coordinate 
            // Input is [EP]
            return [state[3]];
        },
        12: function (state) {
            // First four corner position coordinate 
            // Input is [CP]
            return [state[1]];
        },
        13: function (state) {
            // Second four corner position coordinate 
            // Input is [CP]
            return [state[1]];
        }
    };


    var coord333MoveFunction = {
        0: function (state, move) {
            // Corner orientation coordinate
            // Input is [CO]
            return [
                applyRawMoveOrientation(state[0], move[0], move[1], 3),
            ];
        },
        1: function (state, move) {
            // Edge orientation coordinate
            // Input is [EO]
            return [
                applyRawMoveOrientation(state[0], move[2], move[3], 2),
            ];
        },
        2: function (state, move) {
            // Corner permutation coordinate
            // Output is [CP]
            return [
                applyRawMovePermutation(state[0], move[1])
            ];
        },
        3: function (state, move) {
            // Full orientation coordinate
            // Input is [CO, EO]
            return [
                applyRawMoveOrientation(state[0], move[0], move[1], 3),
                applyRawMoveOrientation(state[1], move[2], move[3], 2)
            ];
        },    
        4: function (state, move) {
            // Full corner coordinate
            // Input is [CO, CP]
            return [
                applyRawMoveOrientation(state[0], move[0], move[1], 3),
                applyRawMovePermutation(state[1], move[1])
            ];
        },
        5: function (state, move) {
            // First four edge coordinate (U edges)
            // Input is [EO, EP]
            return [
                applyRawMoveOrientation(state[0], move[2], move[3], 2),
                applyRawMovePermutation(state[1], move[3])
            ];
        },
        6: function (state, move) {
            // Second four edge coordinate (E edges)
            // Input is [EO, EP]
            return [
                applyRawMoveOrientation(state[0], move[2], move[3], 2),
                applyRawMovePermutation(state[1], move[3])
            ];
            return coord;
        },
        7: function (state, move) {
            // Third four edge coordinate (D edges)
            // Input is [EO, EP]
            return [
                applyRawMoveOrientation(state[0], move[2], move[3], 2),
                applyRawMovePermutation(state[1], move[3])
            ];
        },
        8: function (state, move) {
            // Full centre coordinate
            // Input is [centres]
            return [
                applyRawMovePermutation(state[0], move[4])
            ];
        },
        9: function (state, move) {
            // First four edge position coordinate 
            // Input is [EP]
            return [
                applyRawMovePermutation(state[0], move[3])
            ];
        },
        10: function (state, move) {
            // Second four edge position coordinate 
            // Input is [EP]
            return [
                applyRawMovePermutation(state[0], move[3])
            ];
        },
        11: function (state, move) {
            // Third four edge position coordinate 
            // Input is [EP]
            return [
                applyRawMovePermutation(state[0], move[3])
            ];
        },
        12: function (state, move) {
            // First four corner position coordinate 
            // Input is [CP]
            return [
                applyRawMovePermutation(state[0], move[1])
            ];
        },
        13: function (state, move) {
            // Second four corner position coordinate 
            // Input is [CP]
            return [
                applyRawMovePermutation(state[0], move[1])
            ];
        }

    };
    
    var coord333Names = {
        0: "CO",
        1: "EO",
        2: "CP",
        3: "Orientation",
        4: "Corners",
        5: "Partial Edges - U layer",
        6: "Partial Edges - E slice",
        7: "Partial Edges - D layer",
        8: "Centres",
        9: "Partial EP - U layer",
        10: "Partial EP - E slice",
        11: "Partial EP - D layer",
        12: "Partial CP - U layer",
        13: "Partial CP - D layer"
    };



    var moveTables = {};
    var pruningTables = {};


    var buildMoveAndPruningTables = function (allowedMoves, startState, coordIndex) {
        // Does a complete breadth first search through each coordinate to find all possible states 
        // for that coordinate. Each state is only visited once to speed up the search.
        // Move Table information (which coordinate follows from doing a certain move) and Pruning
        // table information (minimum moves required to reach a state) are stored.

        // Initialise Move tables
        moveTables[coordIndex] = {};
        for (let m=0; m<allowedMoves.length; m++) {
            moveTables[coordIndex][allowedMoves[m]] = {};
        }

        // Initialise pruning table
        let pruningTableName = allowedMoves.join();    
        if (!(pruningTableName in pruningTables)) {
            pruningTables[pruningTableName] = {};
        }
        pruningTables[pruningTableName][coordIndex] = {};

        let pTables = pruningTables[pruningTableName][coordIndex];
        let mTables = moveTables[coordIndex];        

        let building = true;

        let previousStates = [coord333RawStateMap[coordIndex](startState)];
        let nextStates = [];

        let visitedStates = {};

        let firstState = coord333HashFunction[coordIndex](previousStates[0])
        visitedStates[firstState] = true;
        pTables[firstState] = 0;

        let nMoves = 1;

        let startTime = new Date().getTime();         

        while (building) {

            // Keep building the tables. While the tables are being built:
            // Loop through all states on the stack, continue them by adding a move.
            // If this results in a state not previously visited, add them onto the 
            // stack for the next pass.
            // When the stack is empty, move the next pass stack onto the current stack

            let nowTime = new Date().getTime();
            let elapsedTime = (nowTime-startTime)/1000;

            console.log('Building move and pruning tables','('+coord333Names[coordIndex]+')','for states at Depth',nMoves,'\tstates:',
                        previousStates.length, '('+elapsedTime,'seconds)');                

            while (previousStates.length > 0) {
                // While there are still states to process from the previous depth, process them.

                nowTime = new Date().getTime();
                elapsedTime = (nowTime-startTime)/1000;

                if (elapsedTime > 120) {
                    console.log('Timed out after', elapsedTime, 'seconds. ',nextStates.length, "states to continue so far")
                    building = false;
                    break;
                }

                let fromState = previousStates.pop();
                let fromHash = coord333HashFunction[coordIndex](fromState) 

                for (let m=0; m<allowedMoves.length; m++) {
                    // Obtain a new state by performing each available move on the previous state

                    let moveName = allowedMoves[m];
                    let move = movesDef[moveName];

                    // Perform the move
                    let toState = coord333MoveFunction[coordIndex](fromState, move);
                    let toHash = coord333HashFunction[coordIndex](toState)

                    // Add the move to the move table
                    mTables[moveName][fromHash] = toHash;

                    if (visitedStates[toHash]) {
                        // Don't add to the stack if it's been added before.
                        continue;
                    }

                    // Otherwise add it to the pruning table and add the state to the stack                
                    pTables[toHash] = nMoves;

                    nextStates.push(toState);
                    visitedStates[toHash] = true;

                }

            }

            if (nextStates.length > 0) {        
                // If the stack for the next depth has elements, increment the depth and 
                // move the contents of the next stack onto the current stack.
                previousStates = nextStates;
                nextStates = [];

                nMoves++;
            }
            else {
                // No states to process on the stack. Empty the stack
                building = false;
            }

        }
        console.log("\n");

        let resultStates = [];
        for (let s in visitedStates) {
            resultStates.push(parseInt(s));
        }
        return resultStates;
    };


    var moveLookup = function(moveName, coordIndex, state) {
        return moveTables[coordIndex][moveName][state]
    }


    var buildCombinedPruningTable = function(allowedMoves, startState, firstCoord, secondCoord) {

        let statesFirst = buildMoveAndPruningTables(allowedMoves, startState, firstCoord);    
        let statesSecond = buildMoveAndPruningTables(allowedMoves, startState, secondCoord);

        let nStates = statesFirst.length*statesSecond.length;

        console.log("Combining pruning tables tables for", coord333Names[firstCoord], "and", coord333Names[secondCoord],"");
        console.log("    Size of state space:", nStates);

        let pruningTableName = allowedMoves.join();    
        let pTableFirst = pruningTables[pruningTableName][firstCoord];
        let pTableSecond = pruningTables[pruningTableName][secondCoord];

        console.log("    Starting initialisation");
        let startTime = new Date().getTime();        

        let maxFirstIdx = Math.max.apply(Math, statesFirst);
        let maxSecondIdx = Math.max.apply(Math, statesSecond);

        let idxFunc;
        if (maxFirstIdx < maxSecondIdx) {
            idxFunc = function (first, second) { return first*(maxSecondIdx+1) + second }
        }
        else {
            idxFunc = function (first, second) { return second*(maxFirstIdx+1) + first }
        }
        
        let inverseIdxFunc;
        if (maxFirstIdx < maxSecondIdx) {
            inverseIdxFunc = function (coord) { return [Math.floor(coord/(maxSecondIdx+1)), coord % (maxSecondIdx+1)] }
        }
        else {
            inverseIdxFunc = function (coord) { return [coord % (maxFirstIdx+1), Math.floor(coord/(maxFirstIdx+1))]  }
        }

        let combinedPruningTable = [];
        for (let firstIdx=0; firstIdx < statesFirst.length; firstIdx++) {
            for (let secondIdx=0; secondIdx < statesSecond.length; secondIdx++) {     
                combinedPruningTable[idxFunc(statesFirst[firstIdx],statesSecond[secondIdx])] = -1;//Math.max(pTableFirst[co], pTableSecond[eo]);
            }
        }
        startFirst = coord333HashFunction[firstCoord](coord333RawStateMap[firstCoord](startState))
        startSecond = coord333HashFunction[secondCoord](coord333RawStateMap[secondCoord](startState))

        combinedPruningTable[idxFunc(startFirst,startSecond)] = 0;

        nowTime = new Date().getTime();
        elapsedTime = (nowTime-startTime)/1000;

        console.log("    Finished initialisation in", elapsedTime, "seconds.")

        console.log("    Starting combine loop");
        startTime = new Date().getTime();    

        // Forward search    

        let count = 1;

        let i = 0;
        
        let maxDepth = 12;

        while ((count < nStates/2) && (i<maxDepth)) {
            nowTime = new Date().getTime();
            elapsedTime = (nowTime-startTime)/1000;

            console.log('        Depth',i, ' States:', count,'/',nStates, '[expanding]    \t',elapsedTime,'seconds');

            for (let m=0; m<allowedMoves.length; m++) {
                // Obtain a new state by performing each available move on the previous state

                let moveName = allowedMoves[m];
                let move = movesDef[moveName];

                for (let firstIdx=0; firstIdx < statesFirst.length; firstIdx++) {
                    let first = statesFirst[firstIdx];

                    if (pTableFirst[first] > i) {
                        continue;
                    }

                    let newFirst = moveLookup(moveName, firstCoord, first);

                    for (let secondIdx=0; secondIdx < statesSecond.length; secondIdx++) {     
                        let second = statesSecond[secondIdx];

                        if (pTableSecond[second] > i) {
                            continue;
                        }

                        if (combinedPruningTable[idxFunc(first,second)] == i) {

                            let newSecond = moveLookup(moveName, secondCoord, second);



                            if (combinedPruningTable[idxFunc(newFirst,newSecond)] < 0) {
                                combinedPruningTable[idxFunc(newFirst,newSecond)] = i+1;
                                count++;
                            }
                        }
                    }
                }
            }
            i++;
            if (count == 1) {
                throw(Error("No continuations from start state"))
            }
        }

        // Backward search    
        while ((count < nStates) && (i<maxDepth)) {
            nowTime = new Date().getTime();
            elapsedTime = (nowTime-startTime)/1000;

            console.log('        Depth',i, ' States:', count,'/',nStates, '[filling]    \t',elapsedTime,'seconds');

            for (let m=0; m<allowedMoves.length; m++) {
                // Obtain a new state by performing each available move on the previous state

                let moveName = allowedMoves[m];
                let move = movesDef[moveName];

                for (let firstIdx=0; firstIdx < statesFirst.length; firstIdx++) {
                    let first = statesFirst[firstIdx];

                    if (pTableFirst[first] > i) {
                        continue;
                    }

                    let newFirst = moveLookup(moveName, firstCoord, first);

                    for (let secondIdx=0; secondIdx < statesSecond.length; secondIdx++) {     
                        let second = statesSecond[secondIdx];

                        if (combinedPruningTable[idxFunc(first,second)] < 0) {

                            let newSecond = moveLookup(moveName, secondCoord, second);

                            if (combinedPruningTable[idxFunc(newFirst,newSecond)] == i) {
                                combinedPruningTable[idxFunc(first,second)] = i+1;
                                count++;
                            }
                        }
                    }
                }
            }
            i++;
        }

        console.log('        Depth',i, ' States:', count,'/',nStates, '[complete]\n');

        nowTime = new Date().getTime();
        elapsedTime = (nowTime-startTime)/1000;

        console.log("    Finished loop in", elapsedTime, "seconds.")
        return [combinedPruningTable, idxFunc, inverseIdxFunc];
    };


     

    var createNewPruningTables = function(allowedMoves, targetState) {
        // Combined orientation table
        console.log("\nBuilding combined tables for orientation\n\n")
        let combined = buildCombinedPruningTable(allowedMoves, targetState, 1, 0)

        // Corner permutation
        console.log("\n\nBuilding full tables for corner permutation\n\n")
        let nStatesCP = buildMoveAndPruningTables(allowedMoves, targetState, 2).length;

        // Edges
        console.log("\n\nBuilding multiple small tables for edge permutation\n\n")
        let nStatesEPU = buildMoveAndPruningTables(allowedMoves, targetState, 9).length;
        let nStatesEPE = buildMoveAndPruningTables(allowedMoves, targetState, 10).length;
        let nStatesEPD = buildMoveAndPruningTables(allowedMoves, targetState, 11).length;

        // Centres
        console.log("\n\nBuilding tables for centre permutation\n\n")
        let nStatesCentrs = buildMoveAndPruningTables(allowedMoves, targetState, 8).length;

        let pruningTableName = allowedMoves.join();    

        let prunerObj = {
            O: {
                prune: function(coord) {
                    return combined[0][coord]
                },
                move: function(moveName, coord) {
                    let states = combined[2](coord);
                    return combined[1](
                        moveLookup(moveName, 1, states[0]), 
                        moveLookup(moveName, 0, states[1]))
                },
                coordMap: function(state) {
                    return combined[1](
                        coord333HashFunction[1](coord333RawStateMap[1](state)), 
                        coord333HashFunction[0](coord333RawStateMap[0](state))
                    )
                },
                nStates: combined[2]
            },
            CP: {
                prune: function(coord) {
                    return pruningTables[pruningTableName][2][coord]
                },
                move: function(moveName, coord) {
                    return moveLookup(moveName, 2, coord)
                },
                coordMap: function(state) {
                    return coord333HashFunction[2](coord333RawStateMap[2](state))
                },
                nStates: nStatesCP
            },
            EPU: {
                prune: function(coord) {
                    return pruningTables[pruningTableName][9][coord]
                },
                move: function(moveName, coord) {
                    return moveLookup(moveName, 9, coord)
                },
                coordMap: function(state) {
                    return coord333HashFunction[9](coord333RawStateMap[9](state))
                },
                nStates: nStatesEPU
            },
            EPE: {
                prune: function(coord) {
                    return pruningTables[pruningTableName][10][coord]
                },
                move: function(moveName, coord) {
                    return moveLookup(moveName, 10, coord)
                },
                coordMap: function(state) {
                    return coord333HashFunction[10](coord333RawStateMap[10](state))
                },
                nStates: nStatesEPE
            },
            EPD: {
                prune: function(coord) {
                    return pruningTables[pruningTableName][11][coord]
                },
                move: function(moveName, coord) {
                    return moveLookup(moveName, 11, coord)
                },
                coordMap: function(state) {
                    return coord333HashFunction[11](coord333RawStateMap[11](state))
                },
                nStates: nStatesEPD
            },
            Cntrs: {
                prune: function(coord) {
                    return pruningTables[pruningTableName][8][coord]
                },
                move: function(moveName, coord) {
                    return moveLookup(moveName, 8, coord)
                },
                coordMap: function(state) {
                    return coord333HashFunction[8](coord333RawStateMap[8](state))
                },
                nStates: nStatesCentrs
            }
        };
        return prunerObj;
    };
    
    return createNewPruningTables;
})();






var solvedState = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];


var targetState = solvedState;
var targetState = [[0,0,0,0,0,0,0,0], [0,0,0,0,5,6,0,8], [0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];

//var targetState = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];


//var startState = [[0,2,2,0,0,0,2,0], [2,1,7,4,5,6,3,8], [0,0,0,0,0,0,0,0,0,0,0,0], [2,7,3,4,5,6,1,8,9,10,11,12], [1,2,3,4,5,6]]; // Sexy
//var startState = [[0,0,0,0,0,0,0,0], [4,1,2,3,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [4,1,2,3,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // One move
//var startState = [[0,0,0,0,0,0,0,0], [1,3,2,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [2,1,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // Ja
//var startState = [[0,0,0,0,0,0,0,0], [1,3,2,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,4,3,2,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // T
//var startState = [[0,0,0,0,0,0,0,0], [1,3,2,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [3,2,1,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // F
var startState = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,3,4,2,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // U


var startState = [[1,2,1,2,0,0,0,0], [0,0,0,0,5,6,0,8], [0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // TSLE

//var startState = [[2,1,0,0,0,0,0,0], [0,0,0,0,5,6,0,8], [0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]]; // TTLL



var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2","L","L'","L2","B","B'","B2"];
//var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2","L","L'","L2","B","B'","B2",
//                    "r","r'","r2","u","u'","u2","f","f'","f2","d","d'","d2","l","l'","l2","b","b'","b2",
//                    "M","M'","M2","S","S'","S2","E","E'","E2","x","x'","x2","y","y'","y2","z","z'","z2"];
var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2"];
//var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2"];
//var allowedMoves = ["R","R'","R2","U","U'","U2","D","D'","D2"];
//var allowedMoves = ["R","R'","R2","U","U'","U2"];





console.log('\n\nAllowed moves:', allowedMoves.join(' '),'\n\n')



var a = function() {
    let startTime = new Date().getTime();
    let tables = createNewPruningTables(allowedMoves, targetState);
    let nowTime = new Date().getTime();
    let elapsedTime = (nowTime-startTime)/1000;
    console.log("\n\nFinished. Total elapsed time: ",elapsedTime,"seconds.\n\n");
    return tables;
};


var tables = a();