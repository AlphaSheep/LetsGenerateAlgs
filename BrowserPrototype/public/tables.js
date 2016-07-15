
var buildTableOnWorker = function (allowedMoves, targetState, coordIndex) {
    
    let tableContainer = {ready: false, table: {}};
    
    let thisWorker = new Worker('basicpruningworker.js');

    thisWorker.onmessage = function (result) {
        console.log("Message recieved from worker", coordIndex);
        tableContainer.table = result.data;
        tableContainer.ready = true;
    }
    
    thisWorker.postMessage([allowedMoves, targetState, coordIndex]);
    
    return tableContainer;
};


var buildBasicTablesOnWorkers = function (allowedMoves, targetState, coordIndices) {
    
    let startTime = new Date().getTime(); 
    
    let tableContainer = {ready: false, requested:0, recieved: 0, tables:[]};
    
    for (let i=0; i<coordIndices.length; i++) {
        let coordIndex = coordIndices[i];
    
        let thisWorker = new Worker('basicpruningworker.js');

        thisWorker.onmessage = function (result) {
//            console.log("Message recieved from worker", coordIndex);
            tableContainer.recieved++;
            if (tableContainer.requested === tableContainer.recieved) {
                tableContainer.ready = true;
                let elapsedTime = ((new Date().getTime())-startTime)/1000;
                console.log("\nAll basic tables ready after", elapsedTime, "seconds.\n")
            }
            tableContainer.tables[i] = result.data;
        }
        
        tableContainer.requested++
        thisWorker.postMessage([allowedMoves, targetState, coordIndex]);        
    }
    return tableContainer;
};


var buildCombinedTableOnWorker = function (allowedMoves, targetState, tablesFirst, tablesSecond) {
    
    let tableContainer = {ready: false, table: {}};
    
    let thisWorker = new Worker('combinedpruningworker.js');

    thisWorker.onmessage = function (result) {
        console.log("Message recieved from worker");
        tableContainer.table = result.data;
        tableContainer.ready = true;
    }
    
    thisWorker.postMessage([allowedMoves, targetState, tablesFirst, tablesSecond]);
    
    return tableContainer;
    
};


var buildCombinedTablesOnWorkers = function (allowedMoves, targetState, basicTables) {
    
    let startTime = new Date().getTime(); 
        
    let tableContainer = {ready: false, requested:0, recieved: 0, tables:[]};
    
    for (let i=0; i<basicTables.length-1; i++) {
        if (basicTables[i].states.length === 1) {
            continue
        }
        for (let j=i+1; j<basicTables.length; j++) {
            
            if (basicTables[j].states.length === 1) {
                continue
            }
            
            let nStates = basicTables[i].states.length * basicTables[j].states.length;
            let maxLogStateSize = Math.floor(Math.log(Math.max(maxLogStateNum(basicTables[i].states),  
                                                               maxLogStateNum(basicTables[j].states)))/8);
            let maxAllowedSize = 5000000 / (maxLogStateSize>1 ? maxLogStateSize : 1);
            
            if (nStates < maxAllowedSize) {
//                console.log("  Combining", maxLogStateSize, maxAllowedSize, nStates)
                let thisWorker = new Worker('combinedpruningworker.js');

                thisWorker.onmessage = function (result) {
                    tableContainer.recieved++;
                    tableContainer.tables.push(result.data[0]);
                    if (tableContainer.requested === tableContainer.recieved) {
                        tableContainer.ready = true;
                        let elapsedTime = ((new Date().getTime())-startTime)/1000;
                        console.log("\nAll combined tables ready after", elapsedTime, "seconds.\n")
                    }
                }
                
                tableContainer.requested++
                thisWorker.postMessage([allowedMoves, targetState, basicTables[i], basicTables[j]]);        
                
            }
        }
    }
    
    return tableContainer;
};



var buildMoveAndPruningTables = function (allowedMoves, targetState, coordIndex, logMessages) {
    // Does a complete breadth first search through each coordinate to find all possible states 
    // for that coordinate. Each state is only visited once to speed up the search.
    // Move Table information (which coordinate follows from doing a certain move) and Pruning
    // table information (minimum moves required to reach a state) are stored.

    // Initialise Move tables
    let mTables = {};
    for (let m=0; m<allowedMoves.length; m++) {
        mTables[allowedMoves[m]] = {};
    }

    // Initialise pruning table
    let pTables = {};

    let building = true;

    let previousStates = [coord333RawStateMap[coordIndex](targetState)];
    let nextStates = [];

    let visitedStates = {};

    let firstState = coord333HashFunction[coordIndex](previousStates[0])
    visitedStates[firstState] = true;
    pTables[firstState] = 0;

    let nMoves = 1;

    let startTime = new Date().getTime();         

    while (building) {

        // Keep building the tables. While the tables are being built:
        // Loop through all states on the stack, continue them by adding a move.
        // If this results in a state not previously visited, add them onto the 
        // stack for the next pass.
        // When the stack is empty, move the next pass stack onto the current stack
        
        if (logMessages) {
            let nowTime = new Date().getTime();
            let elapsedTime = (nowTime-startTime)/1000;

            console.log('Building move and pruning tables','('+coord333Names[coordIndex]+')','for states at Depth',nMoves,'\tstates:',
                        previousStates.length, '('+elapsedTime,'seconds)');                
        }

        while (previousStates.length > 0) {
            // While there are still states to process from the previous depth, process them.

            nowTime = new Date().getTime();
            elapsedTime = (nowTime-startTime)/1000;

            if (elapsedTime > 120) {
                if (logMessages) {
                    console.log('Timed out after', elapsedTime, 'seconds. ',nextStates.length, "states to continue so far")
                }
                building = false;
                break;
            }

            let fromState = previousStates.pop();
            let fromHash = coord333HashFunction[coordIndex](fromState) 

            for (let m=0; m<allowedMoves.length; m++) {
                // Obtain a new state by performing each available move on the previous state

                let moveName = allowedMoves[m];
                let move = movesDef[moveName];

                // Perform the move
                let toState = coord333MoveFunction[coordIndex](fromState, move);
                let toHash = coord333HashFunction[coordIndex](toState)

                // Add the move to the move table
                mTables[moveName][fromHash] = toHash;

                if (visitedStates[toHash] || visitedStates[toHash]===0) {
                    // Don't add to the stack if it's been added before.
                    continue;
                }

                // Otherwise add it to the pruning table and add the state to the stack                
                pTables[toHash] = nMoves;

                nextStates.push(toState);
                visitedStates[toHash] = true;

            }

        }

        if (nextStates.length > 0) {        
            // If the stack for the next depth has elements, increment the depth and 
            // move the contents of the next stack onto the current stack.
            previousStates = nextStates;
            nextStates = [];

            nMoves++;
        }
        else {
            // No states to process on the stack. Empty the stack
            building = false;
        }

    }
    if (logMessages) {
        console.log("\n");
    }

    let resultStates = [];
    for (let s in visitedStates) {
        resultStates.push(parseInt(s));
    }

    return {
        states: resultStates, 
        combined: false,
        moving: mTables, 
        pruning: pTables,
        name: coord333Names[coordIndex],
        coordIndex: coordIndex
    };
};




var buildCombinedPruningTable = function(allowedMoves, targetState, tablesFirst, tablesSecond, logMessages) {

    let statesFirst = tablesFirst.states;
    let statesSecond = tablesSecond.states;

    let nStates = statesFirst.length * statesSecond.length;
    
    if (logMessages) {
        console.log("    Starting initialisation");
    }
    
    let startTime = new Date().getTime();        

    let combinedPruningTable = {};

    for (let firstIdx=0; firstIdx < statesFirst.length; firstIdx++) {
        combinedPruningTable[statesFirst[firstIdx]] = {};
        for (let secondIdx=0; secondIdx < statesSecond.length; secondIdx++) {  
            combinedPruningTable[statesFirst[firstIdx]][statesSecond[secondIdx]] = -1;
        }
    }

    let startFirst = state2coord(tablesFirst.coordIndex, targetState);
    let startSecond = state2coord(tablesSecond.coordIndex, targetState);
        
    combinedPruningTable[startFirst][startSecond] = 0;

    nowTime = new Date().getTime();
    elapsedTime = (nowTime-startTime)/1000;

    if (logMessages) {
        console.log("    Finished initialisation in", elapsedTime, "seconds.")

        console.log("    Starting combine loop");
    }
    startTime = new Date().getTime();    

    // Forward search    

    let count = 1;
    let lastCount = count;
    let complete = false;

    let i = 0;

    let maxDepth = 13;


    while ((count < nStates/2) && (i<maxDepth) && !complete) {
        nowTime = new Date().getTime();
        elapsedTime = (nowTime-startTime)/1000;

        if (logMessages) {
            console.log('        Depth',i+1, ' States:', count,'/',nStates, '[expanding]    \t',elapsedTime,'seconds');
        }


        for (let firstIdx=0; firstIdx < statesFirst.length; firstIdx++) {
            let first = statesFirst[firstIdx];

            for (let secondIdx=0; secondIdx < statesSecond.length; secondIdx++) {     
                let second = statesSecond[secondIdx];

                if (combinedPruningTable[first][second] == i) {

                    for (let m=0; m<allowedMoves.length; m++) {
                        // Obtain a new state by performing each available move on the previous state

                        let moveName = allowedMoves[m];

                        let newCoords = [tablesFirst.moving[moveName][first], tablesSecond.moving[moveName][second]]

                        if (combinedPruningTable[newCoords[0]][newCoords[1]] < 0) {
                            combinedPruningTable[newCoords[0]][newCoords[1]] = i+1;
                            count++;
                        }
                    }
                }
            }
        }
        i++;
        if (i>1 && count === 1) {            
            console.log(startFirst, startSecond);
            console.log(tablesFirst)
            console.log(tablesSecond)
            throw(Error("No continuations from start state"))
        }
        if (count === lastCount) {
            complete = true;
        }
        lastCount = count;
    }

    // Backward search    
    while ((count < nStates) && (i<maxDepth) && !complete) {
        nowTime = new Date().getTime();
        elapsedTime = (nowTime-startTime)/1000;

        if (logMessages) {
            console.log('        Depth',i+1, ' States:', count,'/',nStates, '[filling]    \t',elapsedTime,'seconds');
        }

        for (let firstIdx=0; firstIdx < statesFirst.length; firstIdx++) {
            let first = statesFirst[firstIdx];

            for (let secondIdx=0; secondIdx < statesSecond.length; secondIdx++) {     
                let second = statesSecond[secondIdx];

                if (combinedPruningTable[first][second] < 0) {

                    for (let m=0; m<allowedMoves.length; m++) {
                        // Obtain a new state by performing each available move on the previous state

                        let moveName = allowedMoves[m];

                        let newCoords = [tablesFirst.moving[moveName][first], tablesSecond.moving[moveName][second]]

                        if (combinedPruningTable[newCoords[0]][newCoords[1]] == i) {
                            combinedPruningTable[first][second] = i+1;
                            count++;
                            break;
                        }
                    }
                }
            }
        }
        i++;
        if (count === lastCount) {
            complete = true;
        }
        lastCount = count;         

    }
    
    if (logMessages) {
        nowTime = new Date().getTime();
        elapsedTime = (nowTime-startTime)/1000;

        console.log('        Depth',i, ' States:', count,'/',nStates, '[complete] \t',elapsedTime,'seconds');

        nowTime = new Date().getTime();
        elapsedTime = (nowTime-startTime)/1000;

        console.log("    Finished loop in", elapsedTime, "seconds.")
    }
    
    return {
        states: [], // States list for combined tables isn't necessary - can be extracted from pruning tables if needed.
        combined: true,
        moving: [tablesFirst.moving, tablesSecond.moving], // Combined move tables for combined coords are too big
        pruning: combinedPruningTable,
        name: "Combined "+tablesFirst.name+" and "+tablesSecond.name,
        coordIndex: [tablesFirst.coordIndex, tablesSecond.coordIndex]
    };

};


var averagePruneDepth = function (table) {
    let average = 0;
    let count = 0;
    for (let x in table.pruning) {
        if (table.combined) {
            for (let y in table.pruning[x]) {
                if (table.pruning[x][y] >= 0) {
                    average = ((average*count) + table.pruning[x][y])/(count+1);
                    count++;
                }
            }            
        }
        else {
            average = ((average*count) + table.pruning[x])/(count+1);
            count++;
        }
    }
    return average;
};


var maxPruneDepth = function (table) {
    let max = 0;
    for (let x in table.pruning) {
        if (table.combined) {
            for (let y in table.pruning[x]) {
                max = (table.pruning[x][y]>max) ? table.pruning[x][y] : max;
            }            
        }
        else {
            max = (table.pruning[x]>max) ? table.pruning[x] : max;
        }
    }
    return max;
};

var maxLogStateNum = function (states) {
    let max = 0;
    for (let x in states) {
        max = (states[x]>max) ? states[x] : max;
    }
    return max;
};



var createNewBasicTablesSerial = function(allowedMoves, targetState, coordIndices) {

    // Simple tables
    
    let startTime = new Date().getTime();    
    
    let tables = [];
    
    for (let i=0; i<coordIndices.length; i++) {
        let coordIndex = coordIndices[i];
        
        tables[i] = buildMoveAndPruningTables(allowedMoves, targetState, coordIndex);
    }
    
    let elapsedTime = ((new Date().getTime())-startTime)/1000;
    console.log("\nAll basic tables ready after", elapsedTime, "seconds.\n")
                
    return tables;

};


var createNewCombinedTablesSerial = function(allowedMoves, targetState, basicTables) {

    
    let startTime = new Date().getTime(); 
        
    let tables = [];
    
    for (let i=0; i<basicTables.length-1; i++) {
        if (basicTables[i].states.length === 1) {
            continue
        }
        for (let j=i+1; j<basicTables.length; j++) {
            console.log(basicTables[i].name, "and", basicTables[j].name)
            if (basicTables[j].states.length === 1) {
                continue
            }
            
            let nStates = basicTables[i].states.length * basicTables[j].states.length;
            let maxLogStateSize = Math.floor(Math.log(Math.max(maxLogStateNum(basicTables[i].states),  
                                                               maxLogStateNum(basicTables[j].states)))/8);
            let maxAllowedSize = 5000000 / (maxLogStateSize>1 ? maxLogStateSize : 1);
            
            if (nStates < maxAllowedSize) {
//                console.log("  Combining", maxLogStateSize, maxAllowedSize, nStates)
                tables.push(buildCombinedPruningTable(allowedMoves, targetState, basicTables[i], basicTables[j]));
                
            }
        }
    }
    
    let elapsedTime = ((new Date().getTime())-startTime)/1000;
    console.log("\nAll basic tables ready after", elapsedTime, "seconds.\n")

    return tables;
};


var createNewPruningTables = function(allowedMoves, targetState) {

    let pruningTableName = allowedMoves.join();    

    // Simple tables
    
    let startTime = new Date().getTime();
    
    // Orientation
    console.log("\n\nBuilding tables for orientation\n\n")
    let tablesEO = buildMoveAndPruningTables(allowedMoves, targetState, 1);         
    let tablesCO = buildMoveAndPruningTables(allowedMoves, targetState, 0);

    // Corner permutation
    console.log("\n\nBuilding full tables for corner permutation\n\n")
    let tablesCP = buildMoveAndPruningTables(allowedMoves, targetState, 2);

    // Edges
    console.log("\n\nBuilding multiple small tables for edge permutation\n\n")
    let tablesEPU = buildMoveAndPruningTables(allowedMoves, targetState, 9);
    let tablesEPE = buildMoveAndPruningTables(allowedMoves, targetState, 10);
    let tablesEPD = buildMoveAndPruningTables(allowedMoves, targetState, 11);

    // Centres
    console.log("\n\nBuilding tables for centre permutation\n\n")
    let tablesCentrs = buildMoveAndPruningTables(allowedMoves, targetState, 8);

    let tables = [tablesEO, tablesCO, tablesCP, tablesEPU, tablesEPE, tablesEPD, tablesCentrs];

    
    let elapsedTime = ((new Date().getTime())-startTime)/1000;
    console.log("All basic tables ready after", elapsedTime, "seconds.")
                
                
    let nStates;

    // Try combine some tables
    nStates = (tablesEO.states.length * tablesCO.states.length)        
    if (nStates < 5000000) {
        console.log("\n\nCombining pruning tables tables for", coord333Names[1], "and", coord333Names[0]);
        console.log("    Size of state space:", nStates);

        tables.push(buildCombinedPruningTable(allowedMoves, targetState, tablesEO, tablesCO));
    }

    nStates = (tablesCP.states.length * tablesCO.states.length)        
    if (nStates < 3000000) {
        console.log("\n\nCombining pruning tables tables for", coord333Names[2], "and", coord333Names[0]);
        console.log("    Size of state space:", nStates);
        tables.push(buildCombinedPruningTable(allowedMoves, targetState, tablesCP, tablesCO));
    }

    nStates = (tablesEO.states.length * tablesEPE.states.length)        
    if (nStates < 2000000) {
        console.log("\n\nCombining pruning tables tables for", coord333Names[1], "and", coord333Names[10]);
        console.log("    Size of state space:", nStates);
        tables.push(buildCombinedPruningTable(allowedMoves, targetState, tablesEO, tablesEPE));
    }

    nStates = (tablesEPU.states.length * tablesEPD.states.length)        
    if (nStates < 2000000) {
        console.log("\n\nCombining pruning tables tables for", coord333Names[9], "and", coord333Names[11]);
        console.log("    Size of state space:", nStates);
        tables.push(buildCombinedPruningTable(allowedMoves, targetState, tablesEPU, tablesEPD));
    }

    nStates = (tablesEPE.states.length * tablesEPD.states.length)        
    if (nStates < 2000000) {
        console.log("\n\nCombining pruning tables tables for", coord333Names[10], "and", coord333Names[11]);
        console.log("    Size of state space:", nStates);
        tables.push(buildCombinedPruningTable(allowedMoves, targetState, tablesEPE, tablesEPD));
    }

    nStates = (tablesCP.states.length * tablesEPD.states.length)        
    if (nStates < 3000000) {
        console.log("\n\nCombining pruning tables tables for", coord333Names[2], "and", coord333Names[11]);
        console.log("    Size of state space:", nStates);
        tables.push(buildCombinedPruningTable(allowedMoves, targetState, tablesCP, tablesEPD));
    }

    nStates = (tablesCP.states.length * tablesEPE.states.length)        
    if (nStates < 3000000) {
        console.log("\n\nCombining pruning tables tables for", coord333Names[2], "and", coord333Names[10]);
        console.log("    Size of state space:", nStates);
        tables.push(buildCombinedPruningTable(allowedMoves, targetState, tablesCP, tablesEPE));
    }

    nStates = (tablesCP.states.length * tablesEPU.states.length)        
    if (nStates < 3000000) {
        console.log("\n\nCombining pruning tables tables for", coord333Names[2], "and", coord333Names[9]);
        console.log("    Size of state space:", nStates);
        tables.push(buildCombinedPruningTable(allowedMoves, targetState, tablesCP, tablesEPU));
    }
    
    nStates = (tablesEO.states.length * tablesCentrs.states.length)        
    if (nStates < 2000000) {
        console.log("\n\nCombining pruning tables tables for", coord333Names[1], "and", coord333Names[8]);
        console.log("    Size of state space:", nStates);
        tables.push(buildCombinedPruningTable(allowedMoves, targetState, tablesEO, tablesCentrs));
    }

    console.log("\n\nSorting Pruning Tables\n\n")

    for (let t in tables) {
        tables[t].avgDepth = averagePruneDepth(tables[t]);
        tables[t].maxDepth = maxPruneDepth(tables[t]);
    }

    // Sort tables by usefulness
    tables.sort(function (a,b){return b.avgDepth-a.avgDepth})

    for (let t in tables) {
        console.log("Avg depth:",tables[t].avgDepth.toFixed(2)," \t MaxDepth:",tables[t].maxDepth," \t ",tables[t].name);
    }
    
    return tables;

};


var a = function() {
    let startTime = new Date().getTime();
    let tables = createNewPruningTables(allowedMoves, targetState);
    let nowTime = new Date().getTime();
    let elapsedTime = (nowTime-startTime)/1000;
    console.log("\n\nFinished. Total elapsed time: ",elapsedTime,"seconds.\n\n");
    return tables;
};

