const cases = document.querySelectorAll(".case");
const Player = "X";
const Bot = "O";
let currentPlayer = null;
const playerName = document.getElementById("playerName");
const start = document.getElementById("start");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const morpion = document.getElementById("played");
const container = document.querySelector(".container");
let playerNameValue = playerName.value;
let party = 1;

playerName.addEventListener("input", () => {
  if (playerName.value === "") {
    start.disabled = true;
  } else {
    start.disabled = false;
  }  
});

start.addEventListener("click", () => {
  playerNameValue = playerName.value;
  console.log(playerNameValue);
  morpion.style.display = "flex";
  container.style.display = "none";
  StartPartie();
  document.querySelector(".containerWin").style.display = "none";
});

restart.addEventListener("click", () => {
  document.querySelector(".containerWin").style.display = "none";
  StartPartie();
  party++;
});

const StartPartie = () => {
  cases.forEach((cases) => {
    cases.textContent = "";
  });
  const random = Math.floor(Math.random() * 2);
  if (random === 0) {
    currentPlayer = Player;
  } else {
    currentPlayer = Bot;
    getRandom();
    currentPlayer = Player;
  }
};
function switchPlayer() {
  currentPlayer = currentPlayer === Player ? Bot : Player;
}

function getRandom() {
  const random = Math.floor(Math.random() * 9);
  if (cases[random].textContent === "") {
    cases[random].textContent = Bot;
  } else {
    getRandom();
  }
}

addEventListener("click", (e) => {
  if (
    currentPlayer === Player &&
    e.target.classList.contains("case") &&
    document.querySelector(".containerWin").style.display === "none" &&
    e.target.textContent === ""
  ) {
    e.target.textContent = currentPlayer;
    if (!winVerification()) {
      currentPlayer = Bot;
    }
  }
  if (
    currentPlayer === Bot &&
    document.querySelector(".containerWin").style.display === "none"
  ) {
    setTimeout(() => {
      getRandom();
      if (!winVerification()) {
        currentPlayer = Player;
      }
    }, 500);
  }
});
function winVerification() {
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let gameWon = false;
  win.forEach((combination) => {
    if (
      cases[combination[0]].textContent === currentPlayer &&
      cases[combination[1]].textContent === currentPlayer &&
      cases[combination[2]].textContent === currentPlayer
    ) {
      result.textContent =
        "Le joueur " +
        (currentPlayer === Player ? playerNameValue : "Bot") +
        " a gagné";
      document.querySelector(".containerWin").style.display = "block";
      updateResultsTable(
        currentPlayer === Player ? playerNameValue : "Bot",
        "Win"
      );
      gameWon = true;
    }
  });
  if (
    !gameWon &&
    Array.from(cases).every((caseElement) => caseElement.textContent !== "")
  ) {
    result.textContent = "Match nul";
    updateResultsTable("", "Match nul");
    document.querySelector(".containerWin").style.display = "block";
  }
}

function updateResultsTable(player, result) {
  const row = document.createElement("tr");
  const playerCell = document.createElement("td");
  const resultCell = document.createElement("td");
  const Party = document.createElement("td");
  Party.textContent = party;
  playerCell.textContent = player;
  resultCell.textContent = result;
  row.appendChild(Party);
  row.appendChild(playerCell);
  row.appendChild(resultCell);
  resultsTable.appendChild(row);
}
