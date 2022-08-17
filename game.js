

// Regarding the whoBeatsWho array: it keeps track of each possible combination of choices,
// and of the winner of each.


// whoBeatsWho[index][0] && whoBeatsWho[index][1]
// moves[index][0] = moves[index][1]

// 0 = 'Rock'
// 1 = 'Paper'
// 2 = 'Scissors'


// whoBeatsWho[index][2]

// 0 = 'Player'
// 1 = 'Computer'
// 2 = 'Ties'


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
	[0, 'Rock'],
	[1, 'Paper'],
	[2, 'Scissors']
]

const scoreBoard = [
	[0, 'Player', 0],
	[1, 'Computer', 0],
	[2, 'Ties', 0]
]

const container = document.querySelector('#container')
const buttons = []

function addBtn() {
	moves.forEach((move) => {
		let btn = document.createElement('button')
				btn.dataset.move = move[0]
				btn.textContent = move[1]
		
		buttons.push(btn)
		container.appendChild(btn)
	})
}

addBtn()

buttons.forEach((btn) => {
	btn.addEventListener('click', () => playRound(btn.dataset.move))
})

// We need to display the player's choice, the computer's choice, the
// round winner and the game winner in the page, for this I will create
// a series of HTML elements.

let choices = document.createElement('div')
let playerChoiceParagraph = document.createElement('p')
let computerChoiceParagraph = document.createElement('p')
let winnerParagraph = document.createElement('p')
let winningMove = document.createElement('p')

let choicesElements = [playerChoiceParagraph, computerChoiceParagraph, winnerParagraph, winningMove]
		choicesElements.forEach((el) => {
			choices.appendChild(el)
		})

container.appendChild(choices)

// We also need to be able to reset the content of these HTML elements
// when required.

function resetChoicesElements() {
	choicesElements.forEach((el) => {
		el.textContent = ''
	})
	
	resetScoreBoard()
}

// We need to display the running score so, I will create a div with a
// list. I will then generate three <li> elements to contain the number
// of wins for each player.

let scoreBoardDiv = document.createElement('div')
let scoreBoardList = document.createElement('ul')

scoreBoardDiv.appendChild(scoreBoardList)
container.appendChild(scoreBoardDiv)

function addScoresToList() {
	scoreBoard.forEach((score) => {
		let listElement = document.createElement('li')
				listElement.textContent = `${score[1]}: ${score[2]}`
				
		scoreBoardList.appendChild(listElement)
	})
}

addScoresToList()

// We also need to update the list elements at each round.

function updateScoreBoardList() {
	let scoreBoardListElements = document.querySelectorAll('li')
	
	scoreBoard.forEach((score) => {
		let element = scoreBoardListElements[scoreBoard.indexOf(score)]
				element.textContent = `${score[1]}: ${score[2]}`
	})
}

// We also need to reset the scoreBoard.

function resetScoreBoard() {
	scoreBoard.forEach((score) => {
		score[2] = 0
	})
	
	updateScoreBoardList()
}

function getComputerChoice() {
	return moves[Math.floor(Math.random() * 3)]
}

// In the previous version I used to loop in the whoBeatsWho array to
// obtain the same thing, this is so much easier.

function getRoundWinner(playerChoice, computerChoice) {
	return whoBeatsWho[playerChoice[0]][computerChoice[0]]
}

function playRound(chosenMove) {
	let playerChoice = moves[chosenMove]
	let computerChoice = getComputerChoice()
	
	let roundWinner = getRoundWinner(playerChoice, computerChoice)
	let hasWinner = false

	playerChoiceParagraph.textContent = `Your choice was ${playerChoice[1]}`
	computerChoiceParagraph.textContent = `The computer's choice was ${computerChoice[1]}`
	
	if (scoreBoard[roundWinner][0] == 0) {
		winningMove.textContent = `${playerChoice[1]} beats ${computerChoice[1]}.`
	} else if (scoreBoard[roundWinner][0] == 1) {
		winningMove.textContent = `${computerChoice[1]} beats ${playerChoice[1]}.`
	} else if (scoreBoard[roundWinner][0] == 2) {
		winningMove.textContent = 'This round was a tie.'
	}
	
	// If one of the players has reached 5 points, we need to declare a
	// winner. We will ignore the number of ties (scoreBoard.length - 1).
	// If one of the players has reached 5 points, we won't increase the
	// points but we will start anew.
	
	// To keep track if the game has a winner or not, we will check if the
	// hasWinner variable is true or false.
	
	// Since the score starts at 0, we need to check if the score is a 4
	// rather than a 5.
	
	// PROBLEM: If we reset the elements when score[2] == 4, the winner
	// won't appear. I will add a setTimeout event and reset the HTML elements
	// after a few seconds, I don't know if it will fix the issue.
	
	// SPOILER: It did work.
	
	scoreBoard.forEach((score) => {
		if(score[2] == 4) {
			winnerParagraph.textContent = `The ${score[1]} has won the game!`
			hasWinner = true
			window.setTimeout(resetChoicesElements, 5000)
		}
	})
	
	if (hasWinner == false) {
		scoreBoard[roundWinner][2]++
	}
	
	updateScoreBoardList()
}
