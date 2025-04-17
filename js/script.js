// <UL> where guessed letters appear //
const guessedLetters = document.querySelector(".guessed-letters");

// Guess Button //
const guessButton = document.querySelector("button.guess");

// Text input for guessing letter //
const letterInput = document.querySelector("input#letter");

// Empty <p> where word in progress will appear //
const wordInProgress = document.querySelector(".word-in-progress");

// <p> for remaining guesses //
const remaining = document.querySelector(".remaining");

// remaining guesses <span> //
const reamainingSpan = document.querySelector(".remaining span");

// empty <p> where messages will appear after guessing letter //
const message = document.querySelector(".message");

// hidden button to prompt player to play again //
const playAgainButton = document.querySelector(".play-again");

// Temporary placeholder word //
const word = "magnolia";

const placeholderDots = function (word) {
	const dotArray = [];
	for (let letter of word) {
		dotArray.push("●")
	}
	wordInProgress.innerText = dotArray.join("")
};

placeholderDots(word);

guessButton.addEventListener("click", function (e) {
	e.preventDefault();

	const inputValue = letterInput.value;

	console.log(inputValue);

	letterInput.value = "";
});


