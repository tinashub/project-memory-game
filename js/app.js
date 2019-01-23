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

/*
 * Create a list that holds all of your cards
 */

const orderedCards = ["fa-cube", "fa-paper-plane-o", "fa-bicycle", "fa-bolt", "fa-bomb", "fa-leaf", "fa-diamond", "fa-anchor", "fa-cube", "fa-paper-plane-o", "fa-bicycle", "fa-bolt", "fa-bomb", "fa-leaf", "fa-diamond", "fa-anchor"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 let randomCards = shuffle(orderedCards);
 let openCards = [];
 let htmlString = "";
 for (let i = 0; i < 16; i++) {
    htmlString += '<li class="card"><i class="fa '+randomCards[i]+'"></i></li>';
}
 document.querySelector('.deck').innerHTML = htmlString;

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 document.querySelector('.deck').addEventListener('click', respondToTheClick);
 
 function showCard(card) {
	card.setAttribute('class', 'card open show');
 }
 
 function hideCard(card) {
	setTimeout(card.setAttribute('class', 'card'), 3000);
 }
 
 function matchCard(card) {
	card.setAttribute('class', 'card match');
 }
 
 function compareCards(c1,c2) {
	setTimeout(function () {
		if (c1.innerHTML == c2.innerHTML) {
			matchCard(c1);
			matchCard(c2);
		}
		else {
			hideCard(c1);
			hideCard(c2);
		}
    }, 500);
}
	 
	 
 function respondToTheClick(evt) {
	var y = evt.target;
	if ((y.nodeName === 'LI')&&(y.className === 'card')) {  
		showCard(y);
		console.log(y.className);
		if (openCards.length > 0) {
			var x = openCards.pop();
			compareCards(x,y);
		}
		else {
			openCards.push(evt.target); 
		}
	}
}
