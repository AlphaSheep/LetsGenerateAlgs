self.importScripts('search.js', 'tables.js', 'coordmoves.js')


var tables;

onmessage = function (event) {
    
    let thisSequence = event.data[0];
    let previousState = event.data[1];
    let goal = event.data[2];
    let allowedMoves = event.data[3];
    let maxSearchDepth = event.data[4];
    let tableName = event.data[5];
        
    if (!tables) {
        // tables have not yet been loaded
        
        loadTablesFromDB(tableName)
        .then(function(tables) {

            let solutions = depthFirstSearch(thisSequence, previousState, goal, allowedMoves, maxSearchDepth, tables, true);

            postMessage (solutions);
        });
    }
    else {
        // tables already exist
        let solutions = depthFirstSearch(thisSequence, previousState, goal, allowedMoves, maxSearchDepth, tables, true);

        postMessage (solutions);
    }
        
};