"use strict";


var coord = require("./coords");
var moves = require("./moves")
var moveTables = require("./moveTables");
var pruningTables = require("./pruningTables")
var utils = require("./utils");



var maxSearchDepth  = 8;



var solvedStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var solvedState = coord.get333hashes(solvedStateRaw);



var startStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [3,2,11,4,5,6,7,8,9,10,1,12], [1,2,3,4,5,6]];
//var startStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [2,4,3,1,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var startState = coord.get333hashes(startStateRaw);



//var targetStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [3,2,11,4,5,6,7,8,9,10,1,12], [1,2,3,4,5,6]];
//var targetState = coord.get333hashes(targetStateRaw);
var targetState = solvedState;


var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2","L","L'","L2","B","B'","B2"];
//var allowedMoves = ["R","R'","R2","U","U'","U2"];
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


console.log("Initialising pruning tables...")

startTime = new Date().getTime();
pruningTables.build333PruningTables();
pruningTables.prune(solvedState, solvedState, 0, 0);
var nowTime = new Date().getTime();
var elapsedTime = (nowTime-startTime)/1000;
console.log("Done in", elapsedTime, "seconds.")



var nMoves = 0;
var solving = true;

//var states = [startState];
var sequences = [[]];

//var nextMoveStates = [];
var nextMoveSequences = [];

var nStatesNow = 1;
var nStatesTotal = 0;

var startTime = new Date().getTime();
var nowTime = new Date().getTime();
var elapsedTime = (nowTime-startTime)/1000;

console.log("\n\nStarting search...")


while (solving) {
    nMoves++;
    
    for (var m=0; m<allowedMoves.length; m++) {
        var move = allowedMoves[m];
        
        for (var i=0; i<nStatesNow; i++) {            
            var sequenceKeys = sequences[i];
            var sequence = [];
            for (var j=0; j<sequenceKeys.length; j++) {
                sequence[j] = allowedMoves[sequenceKeys[j]];
            }                
            
            // Skip redundant moves
            if (moves.isTrivialMove(move, sequence)) {
                continue;
            }
            
            // Compute the state that's reached from the start state by the current sequence
            var state = startState;
            for (var j=0; j<sequence.length; j++)            
                state = moveTables.moveLookup(sequence[j], state);
            state = moveTables.moveLookup(move, state);
            
            // Compute the state reached by applying the move sequence to the target state (for pruning table purposes)
            var inverseState = targetState;
            for (var j=0; j<sequence.length; j++)            
                inverseState = moveTables.moveLookup(sequence[j], inverseState);
            inverseState = moveTables.moveLookup(move, inverseState);
            
            
            if (pruningTables.prune(state, inverseState, nMoves, maxSearchDepth)) {
                continue;
            }

            
            if (!(i % 50000)) {
                nowTime = new Date().getTime();
                elapsedTime = (nowTime-startTime)/1000;
                var nStates = (nStatesTotal+nextMoveSequences.length)
                var nStatesMemory = (sequences.length+nextMoveSequences.length);
                var speed = Math.round((nStatesTotal+nextMoveSequences.length)/elapsedTime);
                
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                
                var logString = "nMoves: " + nMoves +
                            "\t# states: " + nStates +
                            "(in memory: " + nStatesMemory + ")" +
                            "\tTime elapsed: " + elapsedTime + " s" + 
                            "\t(" + speed + " states/s)";
                
                process.stdout.write(logString);
            }
            
            if (utils.arraysEqual(state, targetState)) {
                nowTime = new Date().getTime();
                elapsedTime = (nowTime-startTime)/1000;
                
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                
                console.log("*** Found solution:", (sequence.concat(move)).join(" "), 
                            "after", elapsedTime, "s\n");
                continue;
            }

//            nextMoveStates.push(state);
            nextMoveSequences.push(sequenceKeys.concat(m));

            
            
        }
    }    
    
    // Dump all sequences that have been continued
//    states = nextMoveStates;
    sequences = nextMoveSequences;
    
//    nextMoveStates = [];
    nextMoveSequences = [];

    // Update state indices
    nStatesTotal += sequences.length + nStatesNow;
    nStatesNow = sequences.length;
    
    nowTime = new Date().getTime();    
    elapsedTime = (nowTime-startTime)/1000;
        
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    console.log("   ", nMoves, " move search complete",
                "\t# states: ", nStatesTotal, 
                "\tTime elapsed: ", elapsedTime, "s\n");

    
    if (nMoves >= maxSearchDepth) {
        solving = false;
    }
}

console.log(sequences.length);
//console.log(pruningTables.tables);


/**/