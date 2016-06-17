"use strict";

var fs = require("fs");

var coord = require("./coords");
var moves = require("./moves")
var moveTables = require("./moveTables");
var pruningTables = require("./pruningTables")
var utils = require("./utils");

var maxSearchDepth  = 16;

var solvedStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var solvedState = coord.get333hashes(solvedStateRaw);


var startStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [3,2,11,4,5,6,7,8,9,10,1,12], [1,2,3,4,5,6]];
//var startStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [2,4,3,1,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var startStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [2,1,4,3,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var startStateRaw = [[0,0,0,0,0,0,0,0], [1,3,2,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [1,4,3,2,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var startStateRaw = [[0,0,0,0,0,0,0,0], [1,3,2,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [2,1,3,4,5,6,7,8,9,10,11,12], [1,2,3,4,5,6]];
var startState = coord.get333hashes(startStateRaw);

//
//console.log(solvedState)
//console.log(startState)


//var targetStateRaw = [[0,0,0,0,0,0,0,0], [1,2,3,4,5,6,7,8], [0,0,0,0,0,0,0,0,0,0,0,0], [3,2,11,4,5,6,7,8,9,10,1,12], [1,2,3,4,5,6]];
//var targetState = coord.get333hashes(targetStateRaw);
var targetState = solvedState;


var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2","L","L'","L2","B","B'","B2"];
var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","L", "L'","L2"];
//var allowedMoves = ["M'","M2","R","R'","U","U'","U2"];
//var allowedMoves = ["R","R'","R2","U","U'","U2"];
// var allowedMoves = ["R","R'","U","U'","L","L'"];
//var allowedMoves = ["R","R'","R2","U","U'","U2","D","D'"];
// var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'"];


// Populate move tables
console.log("Populating Move Tables")

for (var i=0; i < allowedMoves.length; i++) {
//    continue;
    var thisMoveFileName = "./Moves_"+allowedMoves[i].toString().replace(/\'/g,"i")+".json";
    try {
        var thisMTable = require(thisMoveFileName);
        moveTables.tables[allowedMoves[i]] = thisMTable;
    } 
    catch (e) {
        moveTables.build333MoveTable(allowedMoves[i]);
        fs.writeFile(thisMoveFileName, JSON.stringify(moveTables.tables[allowedMoves[i]]));
    }
}

// Initialise pruning tables

console.log("Initialising Pruning Tables")

var pruningFileName = "./Pruning_" + allowedMoves.sort().join("_").replace(/\'/g,"i") + ".json";

pruningTables.build333PruningTables();
pruningTables.prune(solvedState, solvedState, 0, 0);
try {
    var pTables = JSON.parse(fs.readFileSync(pruningFileName));
    for (var key in pTables){
        pruningTables.tables[key] = pTables[key];
    }
    console.log("    Pruning tables exist to depth",pruningTables.tables.maxLength);
} 
catch (e) { 
    console.log("    No pruning tables yet for these allowed moves. Initial searchs may be slow.");
}

//console.log(pruningTables.tables)



var search = function (startState, targetState, allowedMoves, maxSearchDepth, logSteps, logSolutions) {

    var solutions = [];
    
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

    console.log("\n\nStarting search to depth", maxSearchDepth);


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


                if (!(i % 20000) && logSteps) {
                    nowTime = new Date().getTime();
                    elapsedTime = (nowTime-startTime)/1000;
                    var nStates = (nStatesTotal+nextMoveSequences.length)
                    var nStatesMemory = (sequences.length+nextMoveSequences.length);
                    var speed = Math.round((nStatesTotal+nextMoveSequences.length)/elapsedTime);

                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);

                    var logString = "nMoves: " + nMoves +
                                "\t# states: " + nStates +
                                " (in memory: " + nStatesMemory + ")" +
                                "\tTime elapsed: " + elapsedTime + " s" + 
                                "\t(" + speed + " states/s)";

                    process.stdout.write(logString);
                }

                if (utils.arraysEqual(state, targetState)) {
                    
                    solutions.push(sequence.concat(move).join(" "));
                    

                    if (logSteps) {
                        process.stdout.clearLine();
                        process.stdout.cursorTo(0);
                    }

                    if (logSolutions) {
                        nowTime = new Date().getTime();
                        elapsedTime = (nowTime-startTime)/1000;

                        console.log("*** Found solution:", (sequence.concat(move)).join(" "), 
                                    "after", elapsedTime, "s\n");
                    }

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

//        fs.writeFile(pruningFileName, JSON.stringify(pruningTables.tables));

        // Update state indices
        nStatesTotal += sequences.length + nStatesNow;
        nStatesNow = sequences.length;

        if (logSteps) {
            nowTime = new Date().getTime();    
            elapsedTime = (nowTime-startTime)/1000;

            console.log("   ", nMoves, " move search complete",
                        "\t# states: ", nStatesTotal, 
                        "\tTime elapsed: ", elapsedTime, "s",
                        "\t(",solutions.length,"solutions found so far )\n");
        }

        if (nMoves >= maxSearchDepth) {
            solving = false;
        }
    }
    
    nowTime = new Date().getTime();    
    elapsedTime = (nowTime-startTime)/1000;
    
    console.log("    Search at depth", maxSearchDepth, "complete in", elapsedTime, "seconds. ",solutions.length,"solutions found.")
    return solutions;
};

//console.log(pruningTables.tables);

var searchStartTime = new Date().getTime();

for (var k = 5; k < maxSearchDepth+1; k++) {
    var solutions = search(startState, targetState, allowedMoves, k);
    fs.writeFileSync(pruningFileName, JSON.stringify(pruningTables.tables));
    if (solutions.length>1) {
        break;
    }
}

var nowTime = new Date().getTime();    
var elapsedTime = (nowTime-searchStartTime)/1000;
console.log("\Time elapsed:", elapsedTime, "s.")

console.log();

for (var i = 0; i<solutions.length; i++) {
    console.log(solutions[i]);
}

/**/
