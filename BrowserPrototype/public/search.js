// moves.js must be loaded first

var coordMap = function(state, tables) {
    let coord = [];
    for (let p in tables) {
        if (tables[p].combined) {
            coord[p] = state2coordCombined(tables[p].coordIndex, state);
        }
        else {
            coord[p] = state2coord(tables[p].coordIndex, state);
        }
    }
    return coord;
};


var move = function(moveName, coords, tables) {
    let newState = [];
    for (let p in tables) {
        if (tables[p].combined) {
            newState[p] = [tables[p].moving[0][moveName][coords[p][0]], 
                           tables[p].moving[1][moveName][coords[p][1]]];
        }
        else {
            newState[p] = tables[p].moving[moveName][coords[p]];
        }
    }
    return newState;
};


var prune = function(coord, availableMoves, tables) {    
    for (let p in tables) {
        if (tables[p].maxDepth <= availableMoves) {
            continue;
        }
        if (tables[p].combined) {
            if (tables[p].pruning[coord[p][0]][coord[p][1]] > availableMoves) {
                return true
            }
        }
        else {
            if (tables[p].pruning[coord[p]] > availableMoves) {
                return true
            }
        }
    }
    return false;
}

var prune2 = function(coord, tables) {
    let dist = 0;
    for (let p in tables) {
        if (tables[p].combined) {
//            console.log('  c ', tables[p].pruning[coord[p][0]][coord[p][1]])
            dist = Math.max(dist, tables[p].pruning[coord[p][0]][coord[p][1]]);
        }
        else {
//            console.log('    ', tables[p].pruning[coord[p]])
            dist = Math.max(dist, tables[p].pruning[coord[p]]);
        }
    }
//    console.log(dist)
    return dist;
}

var prune2 = function(coord, tables) {
    let dist = 0;
    for (let p in tables) {
        if (tables[p].combined) {
//            console.log('  c ', tables[p].pruning[coord[p][0]][coord[p][1]])
            dist = Math.max(dist, tables[p].pruning[coord[p][0]][coord[p][1]]);
        }
        else {
//            console.log('    ', tables[p].pruning[coord[p]])
            dist = Math.max(dist, tables[p].pruning[coord[p]]);
        }
    }
//    console.log(dist)
    return dist;
}

var compareStates = function(state, goal) {
    for (let p in state) {        
        if (state[p]>=0 && state[p] !== goal[p]) {
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
        console.log("Starting depth",nMoves, "    (", statesVisited, "states visited,", solutions.length,"solutions found )", prunedbranches)
        
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
                
//                if (prune2(state, tables) > 6) {
//                    console.log((maxSearchDepth-nMoves), prune2(state, tables), prune(state, (maxSearchDepth-nMoves), tables))
//                }
                if (prune(state, (maxSearchDepth-nMoves), tables)) {
//                if (prune2(state, tables) > (maxSearchDepth-nMoves)) {
                    prunedbranches++;
                    continue;                    
                }
                
                if (compareStates(state, goal)) {
                    let solution = thisSequence.concat(moveName);
                    console.log(solution.join(' '), maxSearchDepth)
                    solutions.push(thisSequence.concat(moveName));
                    
                    if ((nMoves + slack) < maxSearchDepth) {
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



var depthFirstSearch = function (thisSequence, previousState, goal, allowedMoves, maxSearchDepth, tables, isworker) {
    
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

        if (prune(state, (maxSearchDepth), tables)) {
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
    
    solutions = depthFirstSearch([], start, goal, allowedMoves, maxSearchDepth, tables);
            
    return solutions;
};


var startDepthFirstSearchOnWorkers = function (startState, targetState, allowedMoves, maxSearchDepth, tables, workerBank) {
    
    let start = coordMap(startState, tables); 
    let goal = coordMap(targetState, tables);  

    let tableName = getTablesKey(allowedMoves, targetState);
    
    let solutionContainer = {ready:false, solutions:[], nRequested:0, nRecieved:0};
    
    for (let m = 0; m < allowedMoves.length; m++) {
        let moveName = allowedMoves[m];
        
        let next = move(moveName, start, tables);
        
//        let thisWorker = new Worker('searchworker.js');
        let thisWorker = workerBank[m];

        thisWorker.onmessage = function (result) {
//            console.log('Finished move', moveName)
            if (result.data.length) {
                solutionContainer.solutions = solutionContainer.solutions.concat([result.data]);
            }
            solutionContainer.nRecieved++;
            if (solutionContainer.nRequested === solutionContainer.nRecieved) {
                solutionContainer.ready = true;
            }
        }

        solutionContainer.nRequested++;
        solutionContainer.ready = false;        
        if (thisWorker.sentTables) {
            thisWorker.postMessage([[moveName], next, goal, allowedMoves, maxSearchDepth-1, tableName]);
        }
        else {
            thisWorker.postMessage([[moveName], next, goal, allowedMoves, maxSearchDepth-1, tableName, tables]);
            thisWorker.sentTables = true;
        }
           
    }
    return solutionContainer;
};


var statesVisited = 0;


var IDAstarSearchOnWorkers = function (startState, targetState, allowedMoves, maxSearchDepth, slack, tables) {

    let workerBank = [];
    for (let m in allowedMoves) {
        workerBank[m] = new Worker('searchworker.js')
        workerBank[m].sentTables = true;
    }    
    
    let startTime = new Date().getTime();

    let solutionContainer = {ready: false, solutions: []};
    let thisIterContainer = {ready: true, solutions: []};
    statesVisited = 0;
    
    let nMoves = 1;
    
    let iterateAndWait = function () {
        
        if (thisIterContainer.ready) {
            solutionContainer.solutions = solutionContainer.solutions.concat(thisIterContainer.solutions)
            nMoves++;
            
            console.log("Starting depth",nMoves, "    (", solutionContainer.solutions.length,"solutions found ) ", (new Date().getTime()-startTime)/1000, "seconds elapsed.")
        
            thisIterContainer = startDepthFirstSearchOnWorkers(startState, targetState, allowedMoves, nMoves, tables, workerBank);
        }
        
        if ((nMoves < maxSearchDepth) || (solutionContainer.solutions.length>0 && !slack--)) {
            setTimeout(iterateAndWait,200);
        }        
        else {
            solutionContainer.ready = true;
            console.log("\n\nIDA* search complete in ", (new Date().getTime()-startTime)/1000, "seconds\n\n");
        }
    };
    
    iterateAndWait();
    
    return solutionContainer;
    
};


var IDAstarSearch = function (startState, targetState, allowedMoves, maxSearchDepth, slack, tables) {

    let startTime = new Date().getTime();

    let solutions = [];
    statesVisited = 0;
    
    for (let nMoves=2; nMoves<=maxSearchDepth; nMoves++ ) {
        console.log("Starting depth",nMoves, "    (", statesVisited, "states visited,", solutions.length,"solutions found ) ", (new Date().getTime()-startTime)/1000, "seconds elapsed.")
        let theseSolutions = startDepthFirstSearch(startState, targetState, allowedMoves, nMoves, tables);
        solutions = solutions.concat(theseSolutions)
        if (solutions.length>0 && !slack--) {
            break;
        }
    }
    
    console.log("\n\nIDA* search complete in ", (new Date().getTime()-startTime)/1000, "seconds\n\n");

    return solutions;
    
};


var pruningChecker = function (startState, targetState, sequence, tables) {
    
    let start = coordMap(startState, tables); 
    let goal = coordMap(targetState, tables);  
    
    let state = start;
    
    console.log("Minimum moves required:", prune2(state, tables), "\tAll values", pruneGetAllValues(state, tables));    
    
    for (let m = 0; m < sequence.length; m++) {
        let moveName = sequence[m];
        
        console.log('Applying move',moveName);
        
        state = move(moveName, state, tables);        
        
        console.log("Minimum moves required:", prune2(state, tables), "\tAll values", pruneGetAllValues(state, tables));         
        
        if (compareStates(state, goal)) {
            console.log("Target state reached"); 
        }
    }    
};


