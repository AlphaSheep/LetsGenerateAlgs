var coord = require("./coords");


var nEntries = 0;
var filledEntries = 0;

var tables = {};
exports.tables = tables;


var build333PruningTables = function () {
    
    var state;
    
    for (var i=0; i<8; i++) {
        tables[i] = {};
    }
    return;
    
    // CO
    tables[0] = {};
    for (var hash=0; hash < Math.pow(3,8); hash++) {
        tables[0][hash] = 0;        
        nEntries++;
    }
    
    // EO
    tables[3] = {};
    for (var hash=0; hash < Math.pow(2, 12); hash++) {
        tables[3][hash] = 0;        
        nEntries++;
    }
    
    //CP
    tables[1] = {};
    for (var hash=0; hash < Math.pow(9, 4); hash++) {
        state = coord.positionsToState(coord.invertHash(hash, 8, 4), [1,2,3,4], 8, 8);
        // Skip states that are missing a piece.
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || state.indexOf(4)<0) {
            continue;
        }
        tables[1][hash] = 0;   
        nEntries++;
    }
    tables[2] = {};
    for (var hash=0; hash < Math.pow(9, 4); hash++) {
        state = coord.positionsToState(coord.invertHash(hash, 8, 4), [1,2,3,4], 8, 8);
        // Skip states that are missing a piece.
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || state.indexOf(4)<0) {
            continue;
        }
        tables[2][hash] = 0;   
        nEntries++;
    }
    
    //EP
    tables[4] = {};
    for (var hash=0; hash < Math.pow(13, 4); hash++) {
        state = coord.positionsToState(coord.invertHash(hash, 12, 4), [1,2,3,4], 12, 12);
        // Skip states that are missing a piece.
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || state.indexOf(4)<0) {
            continue;
        }
        tables[4][hash] = 0;  
        nEntries++;
    }
    tables[5] = {};
    for (var hash=0; hash < Math.pow(13, 4); hash++) {
        state = coord.positionsToState(coord.invertHash(hash, 12, 4), [1,2,3,4], 12, 12);
        // Skip states that are missing a piece.
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || state.indexOf(4)<0) {
            continue;
        }
        tables[5][hash] = 0;  
        nEntries++;
    }
    tables[6] = {};
    for (var hash=0; hash < Math.pow(13, 4); hash++) {
        state = coord.positionsToState(coord.invertHash(hash, 12, 4), [1,2,3,4], 12, 12);
        // Skip states that are missing a piece.
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || state.indexOf(4)<0) {
            continue;
        }
        tables[6][hash] = 0;  
        nEntries++;
    }
        
    // Centres
    tables[7] = {};
    for (var hash=0; hash < Math.pow(7,6); hash++) {
        state = coord.invertHash(hash, 6, 6);
        if (state.indexOf(1)<0 || state.indexOf(2)<0 || state.indexOf(3)<0 || 
            state.indexOf(4)<0 || state.indexOf(5)<0 || state.indexOf(6)<0) {
            continue;
        }        
        tables[7][hash] = 0;           
        nEntries++;
    }
    
};
exports.build333PruningTables = build333PruningTables;


var prune = function (state, inverseState, nMoves, maxSearchDepth) {
    
    for (var i=0; i<inverseState.length; i++) {
        if (!tables[i][inverseState[i]] && tables[i][inverseState[i]]!==0) {
            tables[i][inverseState[i]] = nMoves;
        }        
//        console.log(i, Object.keys(tables[i]).length);
    }
    
    for (var i=0; i<state.length; i++) {
        if ((nMoves + tables[i][state[i]]) > maxSearchDepth) {    
//            console.log(i, state, nMoves, tables[i][state[i]], maxSearchDepth)
            return true;
        }        
    }
    return false;
};
exports.prune = prune;