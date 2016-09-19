self.importScripts('tables.js', 'coordmoves.js')

onmessage = function (event) {
    
    let allowedMoves = event.data[0];
    let targetState = event.data[1];
    let coordIndex = event.data[2];
    
    let table = buildMoveAndPruningTables(allowedMoves, targetState, coordIndex);
    
    postMessage (table);
        
};