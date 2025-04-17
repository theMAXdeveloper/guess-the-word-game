// <UL> where guessed letters appear //
const guesses = document.querySelector(".guessed-letters");

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

// Array of guessed letters //
const guessedLetters = [];

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

	letterInput.value = "";

	message.innerText = "";

	const inputCheck = checkInput(inputValue);

	if (inputCheck.match(/[a-zA-Z]/)) {
		makeGuess(inputValue);
	}
});

const checkInput = function (input) {
	const acceptedLetter = /[a-zA-Z]/;
	if (input === "") {
		message.innerText = "Please enter a letter."
	} else if (input.length > 1 ) {
		message.innerText = "Please enter 1 letter only."
	} else if (!input.match(acceptedLetter)) {
		message.innerText = "Please enter a letter between A-Z."
	} else {
		return input
	}
};

const makeGuess = function (letter) {
	letter = letter.toUpperCase();

	if (guessedLetters.includes(letter)) {
		message.innerText = `You have already guessed the letter ${letter}, please try again.`
	} else {
		guessedLetters.push(letter)
	}

	console.log(guessedLetters);
}


