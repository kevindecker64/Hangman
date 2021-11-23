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
  "moist",
  "laceration",
  "bass",
  "chastity",
  "lavender",
  "blanket",
  "teeth",
  "magnets",
  "weights",
  "paper",
  "hair",
  "curly",
  "warm",
  "paperclip",
  "briefcase",
  "smells",
  "soft",
  "extroverted",
  "friendly",
  "chill",
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

const figureParts = document.getElementsByClassName("figure-part");

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

playAgainBtn.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  for (let part of figureParts) {
    part.style.display = "none";
  }
  popup.style.display = "none";
});

/*-- Functions --*/
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
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

function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}`;

  for (let part of figureParts) {
    if (part.id <= wrongLetters.length) {
      part.style.display = "block";
    }
  }
  
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You lost...";
    finalMessageRevealWord.innerText = `The word was: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.style.display = "flex";
  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);
}

displayWord();
