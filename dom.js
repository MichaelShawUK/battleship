import { player1, cpu, isGameOver } from "./main.js";
import Ship from "./ship.js";

function drawBoard(player) {
  const div = document.createElement("div");
  for (let i = 9; i >= 0; i--) {
    for (let j = 0; j <= 9; j++) {
      div.setAttribute("data-coordinate", `${j},${i}`);
      let clone = div.cloneNode();
      div.append(clone);
    }
  }
  div.removeAttribute("data-coordinate");
  div.classList.add("gameboard");
  div.id = `${player}-board`;
  return div;
}

function initRotateBtn() {
  const rotateBtn = document.getElementById("rotate-btn");
  rotateBtn.addEventListener("click", () => {
    if (rotateBtn.classList[0] === "horizontal") {
      rotateBtn.src = "./img/rotate_left.png";
    } else rotateBtn.src = "./img/rotate_right.png";
    rotateBtn.classList.toggle("horizontal");
    rotateBtn.classList.toggle("vertical");
  })
}

function endOfInit() {
  const cpuBoard = document.getElementById("Computer-board");
  const rotateBtn = document.getElementById("rotate-btn");
  rotateBtn.style.display = "none";
  const info = document.getElementById("info");
  info.innerText = "";
  cpuBoard.style.display = "grid";
}

function waitForClick() {
  const rotateBtn = document.getElementById("rotate-btn");
  const cells = document.querySelectorAll("#PlayerOne-board div");
  return new Promise(resolve => {
    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        resolve([cell.dataset.coordinate.split(','), rotateBtn.classList[0]]);
      })
    })
  })
}

function drawBoards() {
  const gameboards = document.getElementById("gameboards");
  gameboards.append(drawBoard("PlayerOne"));
  gameboards.append(document.createElement("hr"));
  gameboards.append(drawBoard("Computer"));
}

async function createFleet(input) {
  const info = document.getElementById("info");
  info.innerText = `Place ${input.name}`;
  let notInitialized = true;
  let ship;
  const isLessThanTen = currentValue => currentValue < 10;
  while(notInitialized) {
    const userInput = await waitForClick();
    ship = Ship(input.length, userInput[0], userInput[1]);
    let coordinate = ship.squares.join(',').split(',');
    if (!coordinate.every(isLessThanTen) || alreadyOccupied(ship.squares)) {
      notInitialized = true;
    }
    else {
      notInitialized = false;
    }
  }
  return new Promise(resolve => resolve(ship));
}

function alreadyOccupied(chosenSquares) {
  for (let ship of player1.ships) {
    for (let square of ship.squares) {
      for (let chosen of chosenSquares) {
        if (`${chosen}` == `${square}`) {
          return true;
        }
      }
    }
  }
}

function displayShip(ship) {
  const cells = document.querySelectorAll("#PlayerOne-board div");
  for (let square of ship.squares) {
    for (let cell of cells) {
      if (cell.dataset.coordinate == square) {
        cell.classList.add("ship");
      }
    }
  }
}

function placementFeedback(length) {

  const selector = `#PlayerOne-board [data-coordinate="`;
  const rotateBtn = document.getElementById("rotate-btn");
  let orientation = rotateBtn.classList[0];
  rotateBtn.addEventListener("click", () => {
    orientation = rotateBtn.classList[0];
  })

  function highlight(event) {
    const coord = event.target.dataset.coordinate.split(',');
    for (let i = 0; i < length; i++) {
      if (orientation === "horizontal") {
        try {
          let adjacent = document.querySelector(`${selector}${+coord[0] + i},${coord[1]}"]`);
          adjacent.classList.add("possible");
        } catch {
          continue;
        }
      } else if (orientation === "vertical") {
        try {
          let adjacent = document.querySelector(`${selector}${coord[0]},${+coord[1] + i}"]`);
          adjacent.classList.add("possible");
        } catch {
          continue;
        }
      }
    }
  }

  const cells = document.querySelectorAll("#PlayerOne-board div");
  cells.forEach(cell => {
    cell.addEventListener("mouseover", highlight)
    cell.addEventListener("mouseout", () => {
      cells.forEach(cell => cell.classList.remove("possible"));
    })
  })
  return highlight;
}

function removeListener(callback) {
  const cells = document.querySelectorAll("#PlayerOne-board div");
  cells.forEach(cell => {
    cell.removeEventListener("mouseover", callback);
  })
}

function displayShips(player) {
  const cells = document.querySelectorAll(`#${player.name}-board div`);
  for (let ship of player.ships) {
    for (let square of ship.squares) {
      for (let cell of cells) {
        if (cell.dataset.coordinate == square) {
          if (player.name === "Computer") cell.classList.add("enemy-ship");
          else cell.classList.add("ship");
        }
      }
    }
  }
}

function clickListener() {
  const cells = document.querySelectorAll("#Computer-board div");
  cells.forEach((cell) => {
    cell.addEventListener("click", registerClick);
  });
}

function registerClick() {
  if (!Array.from(this.classList).includes("clicked")) {
    this.classList.add("clicked");
    player1.attack(this.dataset.coordinate);
    cpu.attack();
    registerEnemyAttack();
    isGameOver();
    if (isGameOver()) displayWinner(isGameOver());
  }
}

function displayWinner(player) {
  const modalContainer = document.getElementById("modal-container");
  const winner = document.getElementById("winner");
  winner.innerText = `${player} WINS`;
  modalContainer.style.display = "block";
  reloadPage();
}

function registerEnemyAttack() {
  const board = player1.position.board;
  for (let key in board) {
    if (board[key] === "clicked") {
      const cell = document.querySelector(
        `#PlayerOne-board [data-coordinate="${key}"]`
      );
      cell.classList.add("clicked");
    }
  }
}

function reloadPage() {
  const playAgain = document.getElementById("play-again");
  playAgain.addEventListener("click", () => location.reload());
}

export {
  displayShips,
  clickListener,
  drawBoards,
  initRotateBtn,
  displayShip,
  createFleet,
  endOfInit,
  placementFeedback,
  removeListener,
};
