var coord = require("./coords");
var moves = require("./moves");

var moveTables = require("./moveTables");


var startStateRaw = [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7,8,9,10,11], [0,1,2,3,4,5]];
var startState = coord.coords333(startStateRaw);

console.log(startState);

var allowedMoves = ["R","R'","R2","U","U'","U2","F","F'","F2","D","D'","D2","L","L'","L2","B","B'","B2"];
var allowedMoves = ["R","R'","R2","U","U'","U2"];


var nMoves = 0;
var solving = true;

var states = [startState];
var sequences = [[]];

var nStatesNow = 1;
var nStatesTotal = 0;

var startTime = new Date().getTime();
var nowTime = new Date().getTime();

while (solving) {
    nMoves++;
    
    for (key in allowedMoves) {
        var move = allowedMoves[key];
        //console.log(move, nStatesNow);
        for (i=0; i<nStatesNow; i++) {            
            var state = states[i];
            var sequence = sequences[i];
            
            // Skip redundant moves
            if (sequence[sequence.length-1] && sequence[sequence.length-1][0] == move[0]){
                continue;
            }    
            
            // state = moves.applyMove(move, state);

            states.push(state);
            sequences.push(sequences[i].concat(move));
            
            
            if (!(i % 10000)) {
                nowTime = new Date().getTime();
                console.log("\ton state:", i, 
                            "\t# states:", nStatesTotal+states.length,
                            "\tnMoves:", nMoves,
                            "\tTime elapsed:", (nowTime-startTime)/1000, "s",
                            "\tmoves:", (sequences[i].concat(move)).join(" "));
            }
        }
    }    
    
    // Dump all sequences that have been continued
    states = states.slice(nStatesNow, states.length);
    sequences = sequences.slice(nStatesNow, sequences.lenght);    

    // Update state indices
    nStatesNow = states.length;
    nStatesTotal += nStatesNow;
    
    nowTime = new Date().getTime();    
    console.log("Current moves: ", nMoves, 
                "   # states: ", nStatesTotal, 
                "   Time elapsed: ", (nowTime-startTime)/1000, "s");
    
    
    if (nMoves>=20) {
        solving = false;
    }
}

console.log(sequences/length);