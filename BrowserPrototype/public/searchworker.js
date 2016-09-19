self.importScripts('search.js', 'tables.js', 'coordmoves.js')

var tables;

var initialise = function (tableName) {
    
    loadTablesFromDB(tableName)
    .then(function(result) {
        tables = result;
        console.log("Loaded tables from DB")
        console.log(tables);
    })
    .catch(function(err) {
        console.log('Error', tableName, err);
    });
}

onmessage = function (event) {
    
//    console.log(event.data)
    if (event.data.initialise) {
        initialise(event.data.tableName);
        return
    }
    
    
    let thisSequence = event.data[0];
    
    let previousState = event.data[1];
    let goal = event.data[2];
    let allowedMoves = event.data[3];
    let maxSearchDepth = event.data[4];
    let tableName = event.data[5];
    
    if (event.data[6]) {
        console.log("Recieved tables")
        tables = event.data[6];
    }
        
        
    if (!tables) {
        // tables have not yet been loaded
        loadTablesFromDB(tableName)
        .then(function(result) {
            
            tables = result;
            console.log("Loaded tables from DB")
            
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