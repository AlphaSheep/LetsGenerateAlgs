var utils = require("./utils");


var coordOri = function(oristate, pieceType) {
    // Representation of the orientation of all pieces of a type.
    // If there are n pieces, each with k orientations,
    // then the coord will be in the range 0..(k^n)
    
    var coord = 0;
    var k = pieceType.nOrientations;
    for (var i = 0; i < oristate.length; i++) {
        coord = (k * coord) + oristate[i];
    }
    return coord;
};


var coordPerm = function(permstate) {
    // Representation of the permutation of all pieces of a type.
    // If there are n pieces, then the coord will be in the range 0..(n!-1)
    // Mathematically, the permutation is converted to it's Lehmer code, 
    // which is expressed in a factorial number system. 
    
    var coord = 0;
    for (var i = 0; i < permstate.length-1; i++){
        for (var j = i+1; j < permstate.length; j++){
            if (permstate[j] < permstate[i]) {
                coord++;
            }
        }
        coord *= permstate.length-i-1;
    }
    return coord;
};


var coordFixedPerm = function(permstate) {
    // Representation of the permutation of all fixed pieces of a type.
    // Since the pieces are fixed relative to each other, the location 
    // of just two pieces determines the location of the rest.
    // If there are n pieces, then the coord will be in the range 0..(n^2-n)
    //
    // Note that this cannot be inverted easily without knowing the available moves. 
    // Use coordPerm for a less compact, but easily invertable version
    //
    // There may be gaps in coordinate, as we don't want to make any 
    // assumptions about which permutations are impossible. The number of
    // gaps will equal the number of impossible arrangements of two pieces.
    // Eg. Considering the centres on a Rubik's cube, (n^2-n) = 30, but 6
    // permutations will be impossible, and these will correspond to permutations
    // involving a centre on top and it's opposite centre in front.
    
    var coord = permstate[0] * (permstate.length-1);    
    for (var i = 2; i < permstate.length; i++){
        if (permstate[i] < permstate[1]) {
            coord++;
        }
    }
    return coord;
};


var coordPermLarge = function(permstate) {
    // Special multi-dimensional coord for permutations of larger numbers of pieces.
    // For example, consider the 12 edges on a Rubik's cube.
    // Because the edges have 12!-1 = 479,001,599 possible permutations,
    // it is impractical to store a full move table in memory (~3.6GB per move)
    // Instead, these can be seperated into a number of smaller coordinates
    // representing the positions of subgroups of 4 pieces each.
    
    var subGrpSize = 4;
    
    var coord = [];
    
    for (var i = 0; i < permstate.length; i++){                
        var idx = Math.floor(permstate[i]/subGrpSize); // Determine which subgroup this piece belongs to
        if (!coord[idx]) {
            coord[idx] = 0; // If the subgroup does not have a coordinate yet, initialise one.
        }                
        coord[idx] += i * Math.pow(permstate.length, (subGrpSize-1) - (permstate[i] % subGrpSize));
    }
    return coord;
};


var invertCoordOri = function (coord, pieceType) {
    // Given an orientation coordinate, returns the corresponding state
    
    return utils.expandBaseN(coord, pieceType.nOrientations, pieceType.nPieces);
};


var invertCoordPerm = function (coord, pieceType) {
    // Given a permutation coordinate, returns the corresponding state
    
    // Initialise state as all zeroes
    var state = [];
    var temp = coord;
    
    for (var i=pieceType.nPieces-1; i >= 0; i--) {

        // Decode the factorial base number
        var base = (pieceType.nPieces - i);
        state[i] = temp % base;
        temp = Math.floor(temp / base);
        
        // Decode the Lehmer code
        for (var j=i+1; j<pieceType.nPieces; j++) {
            if (state[j] >= state[i]) {
                state[j]++;
            }
        }
    }    
    return state    
};


var invertCoordFixedPerm = function (coord) {
    // Given a coordinate for a permutation of fixed pieces, returns the corresp 
        
    throw(Error("Not implemented"));
};


var invertCoordPermLarge = function (coord, pieceType) {
    // Given a set of coordinates for a large permutation, 
    // return the corresponding state
    
    var invState = [];
    
    var subGrpSize = 4;
    for (var i=0; i < coord.length; i++) {
        var thisSubState = utils.expandBaseN(coord[i], pieceType.nPieces, subGrpSize);
        invState = invState.concat(thisSubState);        
    }
    
    var state = [];
    for (var i=0; i < pieceType.nPieces; i++) {
        state[invState[i]] = i;
    }   
    
    return state;
};


var coords333 = function (state) {
    return [
        coordOri(state[0], {nOrientations: 3}),
        coordPermLarge(state[1]),
        coordOri(state[2], {nOrientations: 2}),
        coordPermLarge(state[3]),
        coordPerm(state[4])
    ];
};

var invertCoords333 = function (stateCoords) {
    return [
        invertCoordOri(stateCoords[0], {nOrientations: 3, nPieces: 8}),
        invertCoordPermLarge(stateCoords[1], {nOrientations: 3, nPieces: 8}),
        invertCoordOri(stateCoords[2], {nOrientations: 2, nPieces: 12}),
        invertCoordPermLarge(stateCoords[3], {nOrientations: 2, nPieces: 12}),
        invertCoordPerm(stateCoords[4], {nOrientations: 1, nPieces: 6})
    ];
};

exports.coordOri = coordOri;
exports.coordPerm = coordPerm;
exports.coordFixedPerm = coordFixedPerm;
exports.coordPermLarge = coordPermLarge;

exports.invertCoordOri = invertCoordOri;
exports.invertCoordPerm = invertCoordPerm;
exports.invertCoordFixedPerm = invertCoordFixedPerm;
exports.invertCoordPermLarge = invertCoordPermLarge;

exports.coords333 = coords333;

exports.invertCoords333 = invertCoords333;

    