var Word = require("./word.js");
var inquirer = require("inquirer");

// letters entry
var letterArray = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from
var wordsArr = ["snag", "jungle", "important", "mime", "peasant", "baggage", "hail", "clog", "pizza", "sauce", "password", "Heinz", "scream", "newsletter", "bookend", "pro", "dripping", "pharmacist", "lie", "catalog", "ringleader", "husband", "laser", "diagonal", "comfy", "myth", "dorsal", "biscuit", "hydrogen", "macaroni", "rubber", "darkness", "yolk", "exercise", "vegetarian", "shrew", "chestnut", "ditch", "wobble", "glitter", "neighborhood", "dizzy", "fireside", "retail", "drawback", "logo", "fabric", "mirror", "barber", "jazz", "migrate", "drought", "commercial", "dashboard", "bargain", "double", "download", "professor", "landscape", "ski", "goggles", "vitamin"];

// Pick Random word array
var randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];

// Pass random word through Word constructor
computerWord = new Word(randomWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

function knowledge() {

    // Generates new word for Word constructor if true
    if (requireNewWord) {
        // Selects random from wordsArr array
        var randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];

        // Passes random word through the Word constructor
        computerWord = new Word(randomWord);
        requireNewWord = false;
    }

    // Test if the letter guessed is correct
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "let's find it! Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input) {
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                    knowledge();
                } else {
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        knowledge();
                    } else {
                        // Checks if guess is correct
                        var wordCheckArray = [];

                        computerWord.userGuess(input.userinput);

                        // Checks if guess is correct
                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                            correctLetters.push(input.userinput);
                        }

                        computerWord.log();
                        // Print guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // Print letters guessed already
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        // Guesses left
                        if (guessesLeft > 0) {
                            knowledge();
                        } else {
                            console.log("Sorry, you lose!\n");
                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("YOU WIN!\n");
        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                knowledge();
            } else {
                return
            }
        })
}

knowledge();