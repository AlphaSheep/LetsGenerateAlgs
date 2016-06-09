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
    // representing arrangements of subgroups of 4 pieces each.
    
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


var rawCoords = function (state) {
    return [
        coordOri(state[0], {nOrientations: 3}),
        coordPermLarge(state[1]),
        coordOri(state[2], {nOrientations: 2}),
        coordPermLarge(state[3]),
        coordFixedPerm(state[4])
    ];
};


exports.coordOri = coordOri;
exports.coordPerm = coordPerm;
exports.coordFixedPerm = coordFixedPerm;
exports.coordPermLarge = coordPermLarge;

exports.rawCoords = rawCoords;

    