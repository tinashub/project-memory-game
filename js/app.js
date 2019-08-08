/*
 * Create a list that holds all of your cards
 */
const orderedCards = ["fa-cube", "fa-paper-plane-o", "fa-bicycle", "fa-bolt", "fa-bomb", "fa-leaf", "fa-diamond", "fa-anchor", "fa-cube", "fa-paper-plane-o", "fa-bicycle", "fa-bolt", "fa-bomb", "fa-leaf", "fa-diamond", "fa-anchor"];

/*
 * Set initial values
 */
let openCards = [];
let matchedPairs = 0;
let playedTurns = 0;
let gainedStars = 3;
let	timerId = null;
let playedSeconds = 0;
paintCards();
document.querySelector('.win-cont').style.display = "none";

/*
 * Set up the event listener for a card. If a card is clicked:
 * check what node is clicked, correct the target
 * display the card's symbol if it is not already displayed
 * add the card to a *list* of "open" cards
 * if the list already has another card, check to see if the two cards match
 */
document.querySelector('.deck').addEventListener('click', function (evt) {
	var y = evt.target;
	if (y.nodeName === 'I') {
		y = y.parentElement;
	}
	if ((y.nodeName === 'LI')&&(y.className === 'card')) {
		showCard(y);
		openCards.push(y);
		if (openCards.length == 2) {
			compareCards();
		}
	}
});

// Set up listener for restart button
document.querySelector('.restart').addEventListener('click', paintCards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function paintCards() {
	let randomCards = shuffle(orderedCards);
	let htmlString = "";
	for (let i = 0; i < 16; i++) {
		htmlString += '<li class="card"><i class="fa '+randomCards[i]+'"></i></li>';
	}
	document.querySelector('.deck').innerHTML = htmlString;
	openCards = [];
	matchedPairs = 0;
	playedTurns = 0;
	paintMoves();
	paintStars();
	runTimer();
}

// Display number of moves
function paintMoves() {
	document.querySelector('.moves').innerText = playedTurns;
}

// Display stars corresponding to number of moves
function paintStars() {
	let starHtmlString = "";
	if (playedTurns > 16) {
		gainedStars = 1;
		starHtmlString = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>';
	}
	else if (playedTurns > 8) {
		gainedStars = 2;
		starHtmlString = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>';
	}
	else {
		gainedStars = 3;
		starHtmlString = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	}
	document.querySelector('.stars').innerHTML = starHtmlString;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Display card sign
function showCard(card) {
	card.setAttribute('class', 'card open show');
}

// Hide card sign
function hideCard(card) {
	card.setAttribute('class', 'card');
}

// Display cards as matched
function matchCard(card) {
	card.setAttribute('class', 'card match');
}

/* Compare cards
 *  if they match, they'll display as so and stay open
 *  if they do not match, they are removed from the list, the card's symbol is hidden
 *  increment the move counter, display it on the page along with corresponding stars
 *  if all cards have matched, display congrats message with the final score
 */
function compareCards() {
	playedTurns++;
	paintMoves();
	paintStars();
	let c1 = openCards.pop();
	let c2 = openCards.pop();
	setTimeout(function () {
		if (c1.innerHTML == c2.innerHTML) {
			matchCard(c1);
			matchCard(c2);
			matchedPairs++;
			if (matchedPairs == 8) {
				showWin();
			}
		}
		else {
			hideCard(c1);
			hideCard(c2);
		}
	}, 500);
}

// Function showing win message, prompting to return to the game
function showWin() {
	document.querySelector('.container').style.display = "none";
	document.querySelector('.win-cont').style.display = "block";
	document.querySelector('.win-details').innerText = "With "+playedTurns+" moves and "+gainedStars+" stars! It took you only "+timeDetailedWin(playedSeconds)+"! Good job!!";
	document.getElementById("play-again").onclick = function() {
		document.querySelector('.win-cont').style.display = "none";
		document.querySelector('.container').style.display = "flex";
		paintCards();
	}
}

// Starts timer. When there is a previous timer, stops it first
function runTimer() {
	if (timerId != null) {
		clearInterval(timerId);
	}
	let startTime = Date.now();
	timerId = setInterval(function() {
		playedSeconds = Math.floor((Date.now() - startTime)/1000);
		document.querySelector('.timer').innerText = timeDetailed(playedSeconds);
	}, 1000);
}

// Represents timer as h,min,sec
function timeDetailed(seconds) {
	let minutes = 0;
	let hours = 0;
	if (seconds > 60) {
		minutes = Math.floor(seconds/60);
		seconds = seconds - minutes*60;
		if (minutes > 60) {
			hours = Math.floor(minutes/60);
			minutes = minutes - hours*60;
		}
	}
	let timeString = hours + " h " + minutes + " m " + seconds + " s";
	return timeString;
}

//Represents time elapsed in format suitable for win message
function timeDetailedWin(seconds) {
	let timeString = "";
	let minutes = 0;
	let hours = 0;
	if (seconds > 60) {
		minutes = Math.floor(seconds/60);
		seconds = seconds - minutes*60;
		if (minutes > 60) {
			hours = Math.floor(minutes/60);
			minutes = minutes - hours*60;
		}
	}
	if (hours > 0) {
		timeString += hours + " h " + minutes + " min ";
	}
	else if (minutes > 0) {
		timeString += minutes + " min ";
	}
	timeString += seconds + " sec";
	return timeString;
}