var coord = require("./coords2");
var moves = require("./moves")
var moveTables = require("./moveTables2");

var utils = require("./utils");



var maxSearchDepth  = 20;



var startStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var startState = coord.get333hashes(startStateRaw);


console.log(startState);


//var targetStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [3,2,10,4,5,6,7,8,9,1,11,12], [1,2,3,4,5,6]];
var targetStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [2,4,3,1,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var targetState = coord.get333hashes(targetStateRaw);

    



 var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2","L","L'","L2","B","B'","B2"];
// var allowedMoves = ["R","R'","R2","U","U'","U2"];
// var allowedMoves = ["R","R'","U","U'","L","L'"];
// var allowedMoves = ["R","R'","R2","U","U'","F","F'"];

console.log("Populating move tables...")
var startTime = new Date().getTime();

// Populate move tables
for (var i=0; i < allowedMoves.length; i++) {
    moveTables.build333MoveTable(allowedMoves[i]);
}

var nowTime = new Date().getTime();
var elapsedTime = (nowTime-startTime)/1000;

console.log("Done in", elapsedTime, "seconds.")




var nMoves = 0;
var solving = true;

var states = [startState];
var sequences = [[]];

var nextMoveStates = [];
var nextMoveSequences = [];

var nStatesNow = 1;
var nStatesTotal = 0;

var startTime = new Date().getTime();
var nowTime = new Date().getTime();
var elapsedTime = (nowTime-startTime)/1000;

console.log("\n\nStarting search...")


while (solving) {
    nMoves++;
    
    for (moveKey in allowedMoves) {
        var move = allowedMoves[moveKey];
        
        for (i=0; i<nStatesNow; i++) {            
            var sequence = sequences[i];
            
            // Skip redundant moves
            if (moves.isTrivialMove(move, sequence)) {
                continue;
            }
                
            state = moveTables.moveLookup(move, states[i]);
        
            
            if (!(i % 100000)) {
                nowTime = new Date().getTime();
                elapsedTime = (nowTime-startTime)/1000;
                console.log("\tnMoves:", nMoves,
                            "\t# states:", nStatesTotal+nextMoveStates.length,
                            "(in memory:", states.length+nextMoveStates.length,")",
                            "\tTime elapsed:", elapsedTime, "s",
                            "\t(", Math.round((nStatesTotal+nextMoveStates.length)/elapsedTime), "states/s )");
                            // "\tmoves:", (sequence.concat(move)).join(" "));
            }
            
            if (utils.arraysEqual(state, targetState)) {
                nowTime = new Date().getTime();
                elapsedTime = (nowTime-startTime)/1000;
                console.log("\n*** Found solution:", (sequence.concat(move)).join(" "), 
                            "after", elapsedTime, "s\n");
                continue;
            }

            nextMoveStates.push(state);
            nextMoveSequences.push(sequence.concat(move));

        }
    }    
    
    // Dump all sequences that have been continued
    states = nextMoveStates;
    sequences = nextMoveSequences;
    
    nextMoveStates = [];
    nextMoveSequences = [];

    // Update state indices
    nStatesTotal += states.length + nStatesNow;
    nStatesNow = states.length;
    
    nowTime = new Date().getTime();    
    elapsedTime = (nowTime-startTime)/1000;
    console.log("\n   ", nMoves, " move search complete",
                "\t# states: ", nStatesTotal, 
                "\tTime elapsed: ", elapsedTime, "s\n\n");

    
    if (nMoves >= maxSearchDepth) {
        solving = false;
    }
}

console.log(sequences.length);


/**/