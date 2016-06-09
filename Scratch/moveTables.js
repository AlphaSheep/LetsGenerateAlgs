var moves = require("./moves");
var coords = require("./coords");


// Initialise MoveTables

var moveTables = [];
var moveKeys = Object.keys(moves.movesDef); // Note: this is in no particular order
for (key in  moveKeys) {
    moveTables[key] = [];
}


exports.table = moveTables;


var applyMove = function (move, stateCoords) {
    
    var state = coords.invertCoords333 (stateCoords);    
    var newState = moves.applyMove(move, state);
    var newStateCoords = coords.coords333(newState);
    
    return newStateCoords;
};


/*Tests *//*
var startStateRaw = [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7,8,9,10,11], [0,1,2,3,4,5]];
var startState = coords.coords333(startStateRaw);

console.log(startStateRaw);
console.log('Start 1', startState);

var newState = applyMove("R", startState);
console.log('Start 2', startState);
console.log('  New 2', newState);

var againState = applyMove("R'", newState);
console.log('Start 3', startState);
console.log('  New 3', newState);
console.log('Again 3', againState);

*/

exports.applyMove = applyMove;
