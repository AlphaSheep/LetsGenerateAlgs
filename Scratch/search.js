var coord = require("./coords");
var moves = require("./moves");

var moveTables = require("./moveTables");

var utils = require("./utils");

var startStateRaw = [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7,8,9,10,11], [0,1,2,3,4,5]];
var startState = coord.coords333(startStateRaw);



var targetStateRaw = [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [0,2,3,1,4,5,6,7,8,9,10,11], [0,1,2,3,4,5]];
var targetState = coord.coords333(targetStateRaw);

    
//console.log(startState);
//console.log(coord.invertCoords333(startState));

// var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2","L","L'","L2","B","B'","B2"];
var allowedMoves = ["R","R'","R2","U","U'","U2"];
// var allowedMoves = ["R","R'","U","U'","L","L'"];
// var allowedMoves = ["R","R'","R2","U","U'","F","F'"];

var moveKeys = Object.keys(moves.movesDef); // Note: this is in no particular order


var nMoves = 0;
var solving = true;

var states = [startState];
var sequences = [[]];
var visitedStates = [[startState]];

var nextMoveStates = [];
var nextMoveSequences = [];
var nextVisitedStates = [];


var nStatesNow = 1;
var nStatesTotal = 0;

var startTime = new Date().getTime();
var nowTime = new Date().getTime();
var elapsedTime = (nowTime-startTime)/1000;



while (solving) {
    nMoves++;
    
    for (moveKey in allowedMoves) {
        var move = allowedMoves[moveKey];
        //console.log("This move", move, nStatesNow);
        
        for (i=0; i<nStatesNow; i++) {            
            var state = states[i];
            var sequence = sequences[i];
            var visited = visitedStates[i];
            
            // Skip redundant moves
            if (nMoves>1 && sequence[sequence.length-1][0] == move[0]){
                continue;
            }
                       
            // Save time
//            if (states.length+nextMoveStates.length > 1000000) {
//                break;
//            }
            
            //state = coord.coords333(moves.applyMove(move, coord.invertCoords333(state)));
            state = moveTables.applyMoveWithTables(move, state);
                  
            if (utils.isMemberOf(state, visited)) {
                continue;
            }                    
            
            nextMoveStates.push(state);
            nextMoveSequences.push(sequence.concat(move));
            nextVisitedStates.push(visited.concat([state]));
            
            if (!(i % 100000)) {
                nowTime = new Date().getTime();
                elapsedTime = (nowTime-startTime)/1000;
                console.log("\tnMoves:", nMoves,
                            "\t# states:", nStatesTotal+nextMoveStates.length,
                            "(in memory:", states.length+nextMoveStates.length,")",
                            "\tTime elapsed:", elapsedTime, "s",
                            "\t(", Math.round((nStatesTotal+nextMoveStates.length)/elapsedTime), "states/s )");//,
                            //"\tmoves:", (sequence.concat(move)).join(" "));
            }
            
            if (utils.arraysEqual(state, targetState)) {
                nowTime = new Date().getTime();
                elapsedTime = (nowTime-startTime)/1000;
                console.log("\n*** Found solution:", (sequence.concat(move)).join(" "), 
                            "after", elapsedTime, "s\n");
            }
        }
    }    
    
    // Dump all sequences that have been continued
    states = nextMoveStates;
    sequences = nextMoveSequences;
    visitedStates = nextVisitedStates;
    
    nextMoveStates = [];
    nextMoveSequences = [];
    nextVisitedStates = [];

    // Update state indices
    nStatesTotal += states.length + nStatesNow;
    nStatesNow = states.length;
    
    nowTime = new Date().getTime();    
    elapsedTime = (nowTime-startTime)/1000;
    console.log("\n   ", nMoves, " move search complete",
                "\t# states: ", nStatesTotal, 
                "\tTime elapsed: ", elapsedTime, "s\n\n");
    
    
    if (nMoves>=20) {
        solving = false;
    }
}

console.log(sequences.length);