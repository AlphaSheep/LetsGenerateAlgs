// moves.js must be loaded first

var coordMap = function(state, tables) {
    let coord = {};
    for (let p in tables) {        
        coord[p] = tables[p].coordMap(state);
    }
    return coord;
};

var move = function(moveName, coords, tables) {
    let newState = {};
    for (let p in tables) {
        newState[p] = tables[p].moving[moveName][coords[p]];
    }
    return newState;
};

var prune = function(coord, tables) {
    let nMoves = 0;
    for (let p in tables) {        
        nMoves = Math.max(nMoves, tables[p].pruning[coord[p]]);
    }
//    if (nMoves > 4)console.log("Result:", nMoves)
    return nMoves;
}

var compareStates = function(state, goal) {
    for (let p in state) {
        if (state[p] !== goal[p]) {
            return false;
        }
    }
    return true;
};


var breadthFirstSearch = function (startState, targetState, allowedMoves, maxSearchDepth, slack, tables) {
    
    let startTime = new Date().getTime();
    
    statesVisited = 0;
    
    let start = coordMap(startState, tables); 
    let goal = coordMap(targetState, tables);  

    let solutions = [];

    let previousSequences = [[]];
    let nextSequences = [];
    
    let nMoves = 0;
    let solving = true;
    
    let prunedbranches = 0;
    
    while (solving && nMoves<maxSearchDepth) {
                
        nMoves++;
        console.log("Starting depth",nMoves, "    (", statesVisited, "states visited,", solutions.length,"solutions found )")
        
        while (previousSequences.length > 0) {
            
            thisSequence = previousSequences.pop();
            
            let previousState = start;
            for (let m = 0; m < thisSequence.length; m++) {
                previousState = move(thisSequence[m], previousState, tables);
            }
            
            for (let m = 0; m < allowedMoves.length; m++) {
                let moveName = allowedMoves[m];
                
                if (isTrivialMove(moveName, thisSequence)) {
                    continue;
                }
                
                let state = move(moveName, previousState, tables);
                statesVisited++;
                
                if ((nMoves + prune(state, tables)) > maxSearchDepth) {
                    prunedbranches++;
                    continue;                    
                }
                
                if (compareStates(state, goal)) {
                    let solution = thisSequence.concat(moveName);
                    console.log(solution.join(' '))
                    solutions.push(thisSequence.concat(moveName));
                    
                    if ((nMoves + slack) > maxSearchDepth) {
                        maxSearchDepth = nMoves + slack;
                    }
                    
                    continue;
                }
                
                nextSequences.push(thisSequence.concat(moveName));
            }
        }    
        
        previousSequences = nextSequences;
        nextSequences = [];

        if (solutions.length>0 && !slack--) {
            break;
        }
    }
    
    console.log("\n\nBreadth first search complete in ", (new Date().getTime()-startTime)/1000, "seconds ("+statesVisited, "states visited)\n\n");
    
    return solutions;
};



var depthFirstSearch = function (thisSequence, previousState, goal, allowedMoves, maxSearchDepth, tables) {
    
    let solutions = [];
    
    if (maxSearchDepth === 0) {
        return solutions;
    }    
    
    for (let m = 0; m < allowedMoves.length; m++) {
        let moveName = allowedMoves[m];

        if (isTrivialMove(moveName, thisSequence)) {
            continue;
        }

        let state = move(moveName, previousState, tables);
        statesVisited++;

        if (prune(state, tables) > maxSearchDepth) {
            continue;                    
        }

        if (compareStates(state, goal)) {
            if (maxSearchDepth === 1) {
                let solution = thisSequence.concat(moveName);
                console.log(solution.join(' '))
                solutions.push(solution);
            }
            return solutions;
        }
        
        result = depthFirstSearch(thisSequence.concat(moveName), state, goal, allowedMoves, maxSearchDepth-1, tables)
        
        for (let i=0; i<result.length; i++) {
            solutions.push(result[i]);
        }
        
    }
    return solutions;
};


var startDepthFirstSearch = function (startState, targetState, allowedMoves, maxSearchDepth, tables) {
    
    let start = coordMap(startState, tables); 
    let goal = coordMap(targetState, tables);  

    let solutions = [];
    
    let nMoves = 0;
    let solving = true;
    
    let prunedbranches = 0;
    
                
    solutions = depthFirstSearch([], start, goal, allowedMoves, maxSearchDepth, tables);
            
    return solutions;
};


var statesVisited = 0;


var IDAstarSearch = function (startState, targetState, allowedMoves, maxSearchDepth, slack, tables) {

    let startTime = new Date().getTime();

    let solutions = [];
    statesVisited = 0;
    
    for (let nMoves=1; nMoves<=maxSearchDepth; nMoves++ ) {
        console.log("Starting depth",nMoves, "    (", statesVisited, "states visited,", solutions.length,"solutions found )")
        solutions = startDepthFirstSearch(startState, targetState, allowedMoves, nMoves, tables);
        if (solutions.length>0 && !slack--) {
            break;
        }
    }
    
    console.log("\n\nIDA* search complete in ", (new Date().getTime()-startTime)/1000, "seconds\n\n");

    return solutions;
    
};

