self.importScripts('tables.js', 'coordmoves.js')

onmessage = function (event) {
    
    let allowedMoves = event.data[0];
    let targetState = event.data[1];
    let tablesFirst = event.data[2];
    let tablesSecond = event.data[3];
        
    let table = buildCombinedPruningTable(allowedMoves, targetState, tablesFirst, tablesSecond);
    
    postMessage ([table]);
        
};