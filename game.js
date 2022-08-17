

// This version of Rock Paper Scissors will be played in 5 rounds against
// the computer. Remember: rock beats scissors, paper beats rock and scissors
// beat paper.


// To verify who beats who, I decided to keep track in a 3D array. I've
// never done anything like this before. I am not sure this is going to
// work. I decided to keep track of what number correspondes to what in
// their own 2D arrays.


// Spoiler: It did actually work. I am proud.


// 0 = rock  1 = paper  2 = scissors
// 0 = player  1 = computer  2 = tie


const whoBeatsWho = [
	[0, 0, 2],
	[0, 1, 1],
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

// We also need to keep track of the number of rounds that we've already
// played.


let playerSelection = 0
let computerSelection = 0
let playedRounds = 0
let roundWinners = [
	[0, 0],
	[1, 0],
	[2, 0]
]


// We need to prompt for the player's choice, and then we need to save
// that selection into its own variable: playerSelection
// We then need to 'translate' the player's given choice to a number from
// 0 to 2. To do so, I loop into the 'moves' array and, if the playerChoice
// corresponded to the name of the move, it returns the matching number.


function getPlayerChoice() {
	let playerChoice = prompt('What is your chosen move? Rock, Paper or Scissors ?').toLowerCase()
	
	for (let index = 0; index <= moves.length; index++) {
		if (playerChoice == moves[index][1]) {
			return moves[index]
		}
	}
}


// Since we are playing against the computer, we need to generate a random
// move. To do such thing, we will generate a number between 0 and 2, read
// the previous comment and look up for the varaibles 'moves' to know what
// each number correspondes to.


function getComputerChoice() {
	return moves[Math.floor(Math.random() * 3)]
}


// console.log(getComputerChoice()[1])


// We will be playing five rounds, but first we need to be able to start
// a new round. We also need to keep track of all played rounds, and of the
// winner of each one. We will push the round winner to the roundWinners array.


function playRound() {
	playerSelection = getPlayerChoice()
	computerSelection = getComputerChoice()
	
	roundWinner = getRoundWinner(playerSelection[0], computerSelection[0])
	roundWinners[roundWinner][1]++
	
	let capitalizedPlayerChoice = `${moves[playerSelection[0]][1].toString()[0].toUpperCase()}${moves[playerSelection[0]][1].toString().substring(1)}`
	let capitalizedComputerChoice = `${moves[computerSelection[0]][1].toString()[0].toUpperCase()}${moves[computerSelection[0]][1].toString().substring(1)}`
	let capitalizedRoundWinner = `${whoWins[roundWinner][1].toString()[0].toUpperCase()}${whoWins[roundWinner][1].toString().substring(1)}`
	
	console.log(`Number of round: ${playedRounds + 1}`)
	
	console.log(`Your choice was: ${capitalizedPlayerChoice}`)
	console.log(`The computer's choice was: ${capitalizedComputerChoice}.`)
	
	if (whoWins[roundWinner][0] == 0) {
		console.log(`${capitalizedPlayerChoice} beats ${capitalizedComputerChoice}.`)
	} else if (whoWins[roundWinner][0] == 1) {
		console.log(`${capitalizedComputerChoice} beats ${capitalizedPlayerChoice}.`)
	} else if (whoWins[roundWinner][0] == 2) {
		console.log('It was a tie.')
	}
	
	if (whoWins[roundWinner][1] == whoWins[2][1]) {
		console.log('This round was a tie.')
	} else {
		console.log(`This round was won by the ${capitalizedRoundWinner}.`)
	}
	
	playedRounds++
}


// To get the winner for the round, we need to loop the variable whoBeatsWho,
// and return the subarray where its 0 index corresponds to playerSelection
// and its 1 index corresponds to computerSelection.
// This one was tricky to get.


function getRoundWinner(playerSelection, computerSelection) {
	let result
	
	whoBeatsWho.forEach((possibleResult) => {
		if (possibleResult[0] == playerSelection && possibleResult[1] == computerSelection) {
			result = possibleResult[2]
		}
	})
	
	return result
}


// Now we need to create a function that starts the game, repeats the
// playRound function five times, and gives us the game's winner rather than
// the round's winner.


// I am sure there is a better way to do this part. I will revisit it later.
// I am not convinced by this function.


function game() {
	for (let index = 0; index <= 4; index++) {
		playRound()
	}
	
	console.log(`\n\nAnnouncing the Game's Winner!\n\n\n`)
	
	if (roundWinners[0][1] == roundWinners[1][1]) {
		console.log('The game was a tie.')
	} else if (roundWinners[0][1] > roundWinners[1][1]) {
		console.log('The game was won by the Player.')
	} else if (roundWinners[0][1] < roundWinners[1][1]) {
		console.log('The game was won by the Computer.')
	}
	
	console.log('Thank you for playing!')
}

game()
