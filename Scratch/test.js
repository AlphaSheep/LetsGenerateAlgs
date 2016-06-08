var moves = require("./moves");
var coords = require("./coords");


var state = [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7,8,9,10,11], [0,1,2,3,4,5]];
var worst = [[2,2,2,2,2,2,2,2], [7,6,5,4,3,2,1,0], [1,1,1,1,1,1,1,1,1,1,1,1], [11,10,9,8,7,6,5,4,3,2,1,0], [5,4,3,2,1,0]];


console.log(coords.rawCoords(worst));

console.log(coords.rawCoords(state)); // Yellow top, blue front
state = moves.applyMove("y", state);
console.log(coords.rawCoords(state)); // Red front
state = moves.applyMove("y", state);
console.log(coords.rawCoords(state)); // Green
state = moves.applyMove("y", state);
console.log(coords.rawCoords(state)); // Orange 

state = moves.applyMove("z'", state); 
state = moves.applyMove("y'", state); 
console.log(coords.rawCoords(state)); // Blue top, yellow front
state = moves.applyMove("y'", state);
console.log(coords.rawCoords(state)); // Red
state = moves.applyMove("y2", state);
console.log(coords.rawCoords(state)); // Orange
state = moves.applyMove("y", state);
console.log(coords.rawCoords(state)); // White

state = moves.applyMove("z'", state);
state = moves.applyMove("y2", state);
console.log(coords.rawCoords(state)); // Red top, yellow front 
state = moves.applyMove("y", state);
console.log(coords.rawCoords(state)); // blue
state = moves.applyMove("y2", state);
console.log(coords.rawCoords(state)); // green
state = moves.applyMove("y'", state);
console.log(coords.rawCoords(state)); // white

state = moves.applyMove("z'", state);
state = moves.applyMove("y2", state);
console.log(coords.rawCoords(state)); // Green top, yellow front 
state = moves.applyMove("y", state);
console.log(coords.rawCoords(state)); // red
state = moves.applyMove("y2", state);
console.log(coords.rawCoords(state)); // orange
state = moves.applyMove("y'", state);
console.log(coords.rawCoords(state)); // white

state = moves.applyMove("z'", state);
state = moves.applyMove("y2", state);
console.log(coords.rawCoords(state)); // Orange top, yellow front 
state = moves.applyMove("y'", state);
console.log(coords.rawCoords(state)); // blue
state = moves.applyMove("y2", state);
console.log(coords.rawCoords(state)); // green
state = moves.applyMove("y", state);
console.log(coords.rawCoords(state)); // white

state = moves.applyMove("x", state);
state = moves.applyMove("y", state);
console.log(coords.rawCoords(state)); // White top, Blue front 
state = moves.applyMove("y'", state);
console.log(coords.rawCoords(state)); // red
state = moves.applyMove("y'", state);
console.log(coords.rawCoords(state)); // green
state = moves.applyMove("y'", state);
console.log(coords.rawCoords(state)); // orange