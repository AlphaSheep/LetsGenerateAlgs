var coord = require("./coords");


var nEntries = 0;
var filledEntries = 0;

var tables = {};
exports.tables = tables;


var build333PruningTables = function () {
    
    var state;
    
    for (var i=0; i<10; i++) {
        tables[i] = {};
    }
    return;
    
};
exports.build333PruningTables = build333PruningTables;


var prune = function (state, inverseState, nMoves, maxSearchDepth) {
    
    for (var i=0; i<inverseState.length; i++) {
        if (!tables[i][inverseState[i]] && tables[i][inverseState[i]]!==0) {
            tables[i][inverseState[i]] = nMoves;
        }        
//        console.log(i, Object.keys(tables[i]).length);
    }
    
    // EPSum
    var EPSum = inverseState[4] * inverseState[5] * inverseState[6];
    if (!tables[8][EPSum] && tables[8][EPSum]!==0) {
        tables[8][EPSum] = nMoves;
    }  
    
    // CPSum
    var CPSum = inverseState[1] * inverseState[2];
    if (!tables[9][CPSum] && tables[9][CPSum]!==0) {
        tables[9][CPSum] = nMoves;
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