/*-- Constants --*/
const words = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const correctLetters = [];
const wrongLetters = [];

/*-- Variables --*/
let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;

/*-- Cached Elements --*/
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");

const figureParts = document.getElementById("figure-parts");

/*-- Event Listeners --*/

/*-- Functions --*/
