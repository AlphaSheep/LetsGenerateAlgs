var moves = require("./moves");
var coords = require("./coords");



var state = [[0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7], [0,0,0,0,0,0,0,0,0,0,0,0], [0,1,2,3,4,5,6,7,8,9,10,11], [0,1,2,3,4,5]];
var worst = [[2,2,2,2,2,2,2,2], [7,6,5,4,3,2,1,0], [1,1,1,1,1,1,1,1,1,1,1,1], [11,10,9,8,7,6,5,4,3,2,1,0], [5,4,3,2,1,0]];

console.log("\nSolved state:\n")
console.log(coords.coords333(state));

console.log("\nWorst state:\n")
console.log(coords.coords333(worst));



console.log("\nTesting rotations:\n")

console.log(coords.coords333(state)); // Yellow top, blue front
state = moves.applyMove("y", state);
console.log(coords.coords333(state)); // Red front
state = moves.applyMove("y", state);
console.log(coords.coords333(state)); // Green
state = moves.applyMove("y", state);
console.log(coords.coords333(state)); // Orange 

state = moves.applyMove("z'", state); 
state = moves.applyMove("y'", state); 
console.log(coords.coords333(state)); // Blue top, yellow front
state = moves.applyMove("y'", state);
console.log(coords.coords333(state)); // Red
state = moves.applyMove("y2", state);
console.log(coords.coords333(state)); // Orange
state = moves.applyMove("y", state);
console.log(coords.coords333(state)); // White

state = moves.applyMove("z'", state);
state = moves.applyMove("y2", state);
console.log(coords.coords333(state)); // Red top, yellow front 
state = moves.applyMove("y", state);
console.log(coords.coords333(state)); // blue
state = moves.applyMove("y2", state);
console.log(coords.coords333(state)); // green
state = moves.applyMove("y'", state);
console.log(coords.coords333(state)); // white

state = moves.applyMove("z'", state);
state = moves.applyMove("y2", state);
console.log(coords.coords333(state)); // Green top, yellow front 
state = moves.applyMove("y", state);
console.log(coords.coords333(state)); // red
state = moves.applyMove("y2", state);
console.log(coords.coords333(state)); // orange
state = moves.applyMove("y'", state);
console.log(coords.coords333(state)); // white

state = moves.applyMove("z'", state);
state = moves.applyMove("y2", state);
console.log(coords.coords333(state)); // Orange top, yellow front 
state = moves.applyMove("y'", state);
console.log(coords.coords333(state)); // blue
state = moves.applyMove("y2", state);
console.log(coords.coords333(state)); // green
state = moves.applyMove("y", state);
console.log(coords.coords333(state)); // white

state = moves.applyMove("x", state);
state = moves.applyMove("y", state);
console.log(coords.coords333(state)); // White top, Blue front 
state = moves.applyMove("y'", state);
console.log(coords.coords333(state)); // red
state = moves.applyMove("y'", state);
console.log(coords.coords333(state)); // green
state = moves.applyMove("y'", state);
console.log(coords.coords333(state)); // orange

state = moves.applyMove("z2", state);
state = moves.applyMove("y", state);

console.log("\nTesting large perm coords: Applying Sune \n")
state = moves.applyMove("R", state);
state = moves.applyMove("U", state);
state = moves.applyMove("R'", state);
state = moves.applyMove("U", state);
state = moves.applyMove("R", state);
state = moves.applyMove("U2", state);
state = moves.applyMove("R'", state);
console.log(coords.coords333(state));

console.log("\nTesting large perm coords: Applying U four times\n")

console.log(coords.coords333(state));
state = moves.applyMove("U", state);
console.log(coords.coords333(state));
state = moves.applyMove("U", state);
console.log(coords.coords333(state));
state = moves.applyMove("U", state);
console.log(coords.coords333(state));
state = moves.applyMove("U", state);
console.log(coords.coords333(state));

console.log("\nTesting large perm coords: Applying R2 then U four times\n")

state = moves.applyMove("R2", state);

console.log(coords.coords333(state));
state = moves.applyMove("U", state);
console.log(coords.coords333(state));
state = moves.applyMove("U", state);
console.log(coords.coords333(state));
state = moves.applyMove("U", state);
console.log(coords.coords333(state));
state = moves.applyMove("U", state);
console.log(coords.coords333(state));

console.log("\nRestoring edges only \n")

state = moves.applyMove("L2", state);
state = moves.applyMove("U", state);
state = moves.applyMove("D2", state);
state = moves.applyMove("S", state);
state = moves.applyMove("D2", state);
state = moves.applyMove("S'", state);
state = moves.applyMove("U'", state);
state = moves.applyMove("L2", state);
state = moves.applyMove("R2", state);
console.log(coords.coords333(state));
