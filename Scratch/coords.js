

var coordOri = function(oristate, pieceType) {
    // Representation of the orientation of all pieces of a type.
    // If there are n pieces, each with k orientations,
    // then the coord will be in the range 0..(k^n)
    
    var coord = 0;
    var k = pieceType.nOrientations;
    for (var i = 0; i < oristate.length-1; i++) {
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
    // permutations will be missing, and these will correspond to permutations
    // involving a centre on top, and it's opposite centre in front.
    
    var coord = permstate[0] * (permstate.length-1);    
    for (var i = 2; i < permstate.length; i++){
        if (permstate[i] < permstate[1]) {
            coord++;
        }
    }
    return coord;
};



var coordCentrPerm = function (centrstate) {
    // Representation of the permutation of the centre. 
    // Since the first 2 centres fix the remaining six,
    // only those are needed. The coord is between 0 and 24.
    var coord = centrstate[0]*4;    
    for (var i = 2; i < centrstate.length; i++){
        if (centrstate[i] < centrstate[1]) {
            coord++;
        }
    }
    return coord;
};

var coordCornerOri = function (costate) {
    // Representation of the orientation of the corners. 
    // Since the orientation of the 8th corner can be determined
    // from the other 7, this coord is between 0 and 2186.
    var coord = 0;
    for (var i = 0; i < costate.length-1; i++) {
        coord = (3 * coord) + costate[i];
    }
    return coord;
};

var coordEdgeOri = function (eostate) {
    // Representation of the orientation of the edges. 
    // Since the orientation of the 12th edge can be determined
    // from the other 11, this coord is between 0 and 2047.
    var coord = 0;
    for (var i = 0; i < eostate.length-1; i++) {
        coord = (2 * coord) + eostate[i];
    }
    return coord;
};

var coordCornerPerm = function (cpstate) {
    // Representation of the permutation of the corners. 
    // The coord is between 0 and 40,319.
    var coord = 0;
    for (var i = 0; i < cpstate.length-1; i++){
        for (var j = i+1; j < cpstate.length; j++){
            if (cpstate[j] < cpstate[i]) {
                coord++;
            }
        }
        coord *= cpstate.length-i-1;
    }
    return coord;
};

var coordEdgePerm = function (epstate) {
    // Representation of the permutation of the edges. 
    // The coord is between 0 and 479,001,599.
    var coord = 0;    
    for (var i = 0; i < epstate.length-1; i++){
        for (var j = i+1; j < epstate.length; j++){
            if (epstate[j] < epstate[i]) {
                coord++;
            }
        }
        coord *= epstate.length-i-1;
    }
    return coord;
};

// Because the full coordEP has 12!-1 = 479,001,599 possible states,
// it is impractical to store a full move table in memory (~3.6GB per move)
// Instead, seperate into three coordinates.

var coordEsliceEdgeLocs = function(epstate) {
    // Representation of the locations of the edges that belong 
    // in the E slice. Ordering is ignored.
    // The coord is between 0 and 479,001,599.
    var coord = 0;    
    for (var i = 0; i < epstate.length-1; i++){
        for (var j = i+1; j < epstate.length; j++){
            if (epstate[j] < epstate[i]) {
                coord += 2;
            }
        }
        coord *= epstate.length-i-1;
    }
    return coord;
};

    


var rawCoords = function (state) {
    return [
        coordCornerOri(state[0]),
        coordCornerPerm(state[1]),
        coordEdgeOri(state[2]),
        coordEdgePerm(state[3]),
        coordFixedPerm(state[4])
    ];
};



exports.coordCornerOri = coordCornerOri;
exports.coordEdgeOri = coordEdgeOri;
exports.coordCornerPerm = coordCornerPerm;
exports.coordEdgePerm = coordEdgePerm;
exports.coordCentrPerm = coordCentrPerm;

exports.rawCoords = rawCoords;


