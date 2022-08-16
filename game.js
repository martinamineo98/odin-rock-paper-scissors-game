

// This version of Rock Paper Scissors will be played in 5 rounds against
// the computer. Remember: rock beats scissors, paper beats rock and scissors
// beat paper.


// To verify who beats who, I decided to keep track in a 3D array. I've
// never done anything like this before. I am not sure this is going to
// work. I decided to keep track of what number correspondes to what in
// their own 2D arrays.


// 0 = rock  1 = paper  2 = scissors
// 0 = player  1 = computer  2 = tie


const whoBeatsWho = [
	[0, 0, 2]
	[0, 1, 1]
	[0, 2, 0],
	[1, 0, 0],
	[1, 1, 2],
	[1, 2, 1],
	[2, 0, 1],
	[2, 1, 0],
	[2, 2, 2]
]

const moves = [
	[0, 'rock'],
	[1, 'paper'],
	[2, 'scissors']
]

const whoWins = [
	[0, 'player'],
	[1, 'computer'],
	[2, 'tie']
]


// We need to keep track of the player's choice and the computer's, I
// decided that it made sense to keep it in two different global variables.
// I temporally hard-coded the playerSelection variable, I will add a prompt
// at the very end.


let playerSelection = 'rock'
let computerChoice


// Since we are playing against the computer, we need to generate a random
// move. To do such thing, we will generate a number between 0 and 2, read
// the previous comment and look up for the varaibles 'moves' to know what
// each number correspondes to.


function getComputerChoice() {
	return moves[Math.floor(Math.random() * 3)]
}


console.log(getComputerChoice()[1])
