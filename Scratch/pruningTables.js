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
    tables.maxLength = 0;
    return;
    
};
exports.build333PruningTables = build333PruningTables;


var prune = function (state, inverseState, nMoves, maxSearchDepth) {
    
    if (nMoves > tables.maxLength) {
        tables.maxLength = nMoves;
    }
    
    for (var i=0; i<inverseState.length; i++) {
        if (!(inverseState[i] in tables[i])) {
            tables[i][inverseState[i]] = nMoves;
        }        
    }
    
    var EPCombined = inverseState[4] * inverseState[5] * inverseState[6];
    if (!(EPCombined in tables[8])) {
        tables[8][EPCombined] = nMoves;
    }  
    
    var CPCombined = inverseState[1] * inverseState[2];
    if (!(CPCombined in tables[9])) {
        tables[9][CPCombined] = nMoves;
    }         
    
    for (var i=0; i<state.length; i++) {
        var thisEstLowerBound; 
        if (state[i] in tables[i]) {
            thisEstLowerBound = tables[i][state[i]];
        } else {
            thisEstLowerBound = tables.maxLength + 1 ;
        }
        if (nMoves + thisEstLowerBound > maxSearchDepth) {    
            return true;
        }        
    }
    
    var EPCombined = state[4] * state[5] * state[6];
    if ((nMoves + tables[8][EPCombined]) > maxSearchDepth ||
            (!(EPCombined in tables[8]) && (nMoves + tables.maxLength + 1) > maxSearchDepth+1)) {    
        return true;
    }  
    var CPCombined = state[1] * state[2];
    if ((nMoves + tables[9][CPCombined]) > maxSearchDepth ||
            (!(CPCombined in tables[9]) && (nMoves + tables.maxLength + 1) > maxSearchDepth+1)) {    
        return true;
    }  
        
        
    return false;
};
exports.prune = prune;