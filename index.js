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

