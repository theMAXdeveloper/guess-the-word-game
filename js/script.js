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
let word = "magnolia";

// Array of guessed letters //
const guessedLetters = [];

// Amount of guesses allowed //
let remainingGuesses = 8;

const getWord =  async function () {
	const dataRequest = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt") 
	
	const data = await dataRequest.text()

	const wordArray = data.split("\n");

	const randomIndex = Math.floor(Math.random() * wordArray.length);

	word = wordArray[randomIndex].trim();

	placeholderDots(word);
}

const placeholderDots = function (word) {
	const dotArray = [];
	for (let letter of word) {
		dotArray.push("●")
	}
	wordInProgress.innerText = dotArray.join("")
};

getWord()

guessButton.addEventListener("click", function (e) {
	e.preventDefault();

	const inputValue = letterInput.value;

	letterInput.value = "";

	message.innerText = "";

	const inputCheck = checkInput(inputValue);

	if (inputCheck) {
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
		guessedLetters.push(letter);
		updateLetters();
		guessesCount(letter);
		updateWord(guessedLetters);
	}
};

const updateLetters = function () {
	guesses.innerHTML = "";

	for (const letter of guessedLetters) {
		const li = document.createElement("li")
		li.innerText = letter
		guesses.append(li)
	}	
};

const updateWord = function (guessedLetters) {
	const wordUpper = word.toUpperCase();

	const wordArray = wordUpper.split("");

	const revealGuesses = [];

	for (const letter of wordArray) {
		if (guessedLetters.includes(letter)) {
			revealGuesses.push(letter.toUpperCase())
		} else {
			revealGuesses.push("●")
		}
	}
	wordInProgress.innerText = revealGuesses.join("");
	successGuess();
};

const guessesCount = function (letterInput) {
	const upperWord = word.toUpperCase();

	if (!upperWord.includes(letterInput)) {
		message.innerText = `Sorry, the letter ${letterInput} is not in this word.`
		remainingGuesses -= 1;
	} else {
		message.innerText = `Congrats, you guessed the letter ${letterInput} correctly!`
	}

	if (remainingGuesses === 0) {
		message.innerText = `GAME OVER, YOU LOST! The word is ${upperWord}.`
	} else if (remainingGuesses === 1) {
		reamainingSpan.innerText = `only 1 guess`
	} else if (remainingGuesses > 1) {
		reamainingSpan.innerText = `${remainingGuesses} guesses`
	}
}

const successGuess = function () {
	if (word.toUpperCase() === wordInProgress.innerText) {
		message.classList.add("win");
		message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
	}
};




