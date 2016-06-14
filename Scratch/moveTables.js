var moves = require("./moves");
var coords = require("./coords");

var piece = require("./pieces");



// Initialise MoveTables

var moveTables = [];
var moveKeys = Object.keys(moves.movesDef); // Note: this is in no particular order
for (key in  moveKeys) {
    // console.log("Intialising Move Table for move", moveKeys[key])
    moveTables[moveKeys[key]] = [[],[],[],[[]],[]];
}



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


var applyMoveCO = function (move, coCoord) {
    if (!moveTables[move][0][coCoord]) {
        var coState = coords.invertCoordOri(coCoord, piece.corner);
        coState = moves.applyMoveCO(move, coState);
        moveTables[move][0][coCoord] = coords.coordOri(coState, piece.corner);
    }
    return moveTables[move][0][coCoord];
};


var applyMoveEO = function (move, eoCoord) {
    if (!moveTables[move][2][eoCoord]) {
        var eoState = coords.invertCoordOri(eoCoord, piece.edge);
        eoState = moves.applyMoveEO(move, eoState);
        moveTables[move][2][eoCoord] = coords.coordOri(eoState, piece.edge);
    }
    return moveTables[move][2][eoCoord];
};


var applyMoveCentre = function (move, cnCoord) {

    if (!moveTables[move][4][cnCoord]) {
        var cnState = coords.invertCoordPerm(cnCoord, piece.centre);
        cnState = moves.applyMoveCentr(move, cnState);
        moveTables[move][4][cnCoord] = coords.coordPerm(cnState, piece.centre);
    }
    return moveTables[move][4][cnCoord];
};


var applyMoveCP = function (move, cpCoord) {

    if (!moveTables[move][1][cpCoord]) {
        var cpState = coords.invertCoordPerm(cpCoord, piece.corner);
        cpState = moves.applyMoveCP(move, cpState);
        moveTables[move][1][cpCoord] = coords.coordPerm(cpState, piece.centre);
    }
    return moveTables[move][1][cpCoord];
};


var applyMoveEP = function (move, epCoord) {
    
    var nextState = [];
    var found = true;
    for (var i=0; i < epCoord.length; i++) {
        if (!moveTables[move][3][i][epCoord[i]]) {
            found = false;            
            break;
        }
        nextState.push(moveTables[move][3][i][epCoord[i]])
    }
    if (found) {
        return nextState
    }
    var epState = coords.invertCoordPermLarge(epCoord, piece.edge);
    epState = moves.applyMoveEP(move, epState);
    var ep = coords.coordPermLarge(epState, piece.edge);   
    
    for (var i=0; i < epCoord.length; i++) {
        if (!moveTables[move][3][i]){
            moveTables[move][3][i] = [];
        }            
        moveTables[move][3][i][epCoord[i]] = ep[i];
    }
    
    return ep;
};



var applyMoveWithTables = function (move, stateCoords) {
    
    var co = applyMoveCO(move, stateCoords[0]);
    var eo = applyMoveEO(move, stateCoords[2]);
    
    var cn = applyMoveCentre(move, stateCoords[4]);
  
    var cp = applyMoveCP(move, stateCoords[1]);
    var ep = applyMoveEP(move, stateCoords[3]);
        
    var newStateCoords = [co,cp,eo,ep,cn];
    
    return newStateCoords;
};



exports.table = moveTables;

exports.applyMove = applyMove;
exports.applyMoveWithTables = applyMoveWithTables;
