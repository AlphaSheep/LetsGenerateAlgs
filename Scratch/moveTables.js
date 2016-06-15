var moves = require("./moves");
var coord = require("./coords");



var tables = {};
exports.tables = tables;



var build333MoveTable = function (move) {
    
    var state;
    tables[move] = {};
    
    
    // CO
    tables[move][0] = {};
    for (var hash=0; hash < Math.pow(3,8); hash++) {
        state = coord.invertHash(hash, 2, 8);
        tables[move][0][hash] = coord.getHash(moves.applyMoveCO(move, state), 2);        
    }
    
    // EO
    tables[move][2] = {};
    for (var hash=0; hash < Math.pow(2, 12); hash++) {
        state = coord.invertHash(hash, 2, 12);
        tables[move][2][hash] = coord.getHash(moves.applyMoveEO(move, state), 1);        
    }
    
    // Note: Because CP and EP track positions of groups of four pieces, and 
    // the positions are independent of the four positions being tracked, 
    // the same move table can be applied to all groups.  
    
    //CP
    tables[move][1] = {};
    for (var hash=0; hash < Math.pow(9, 4); hash++) {
        state = coord.positionsToState(coord.invertHash(hash, 8, 4), [1,2,3,4], 8, 8);
        // Skip states that are missing a piece.
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || state.indexOf(4)<0) {
            continue;
        }
        tables[move][1][hash] = coord.getHash(coord.findPieces(moves.applyMoveCP(move, state), [1,2,3,4], 8), 8);   
    }
    
    //EP
    tables[move][3] = {};
    for (var hash=0; hash < Math.pow(13, 4); hash++) {
        state = coord.positionsToState(coord.invertHash(hash, 12, 4), [1,2,3,4], 12, 12);
        // Skip states that are missing a piece.
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || state.indexOf(4)<0) {
            continue;
        }
        tables[move][3][hash] = coord.getHash(coord.findPieces(moves.applyMoveEP(move, state), [1,2,3,4], 12), 12);  
    }
    
    // Centres
    tables[move][4] = {};
    for (var hash=0; hash < Math.pow(7,6); hash++) {
        state = coord.invertHash(hash, 6, 6);
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || 
            state.indexOf(4)<0 || state.indexOf(5)<0 || state.indexOf(6)<0) {
            continue;
        }        
        tables[move][4][hash] = coord.getHash(moves.applyMoveCentr(move, state), 6);           
    }
};

exports.build333MoveTable = build333MoveTable;
  


var moveLookup = function(move, state) {
    return [
        tables[move][0][state[0]],
        tables[move][1][state[1]],
        tables[move][1][state[2]],
        tables[move][2][state[3]],
        tables[move][3][state[4]],
        tables[move][3][state[5]],
        tables[move][3][state[6]],
        tables[move][4][state[7]]
    ];
};
exports.moveLookup = moveLookup;



// Test cases

/*
build333MoveTable("R");

var startStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var startState = coord.get333hashes(startStateRaw);

console.log(startState);

console.log(moveLookup("R", startState));


/**/
