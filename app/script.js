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
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.getElementById("figure-parts");

/*-- Event Listeners --*/
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      const letter = e.key.toLocaleLowerCase();
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

/*-- Functions --*/
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
    </span>`
    )
    .join("")}`;
  const innerWord = wordEl.innerText.replace(/[ \n]/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congrats! You Win!";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
