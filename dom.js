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
  rotateBtn.style.display = "block";
  rotateBtn.addEventListener("click", () => {
    rotateBtn.classList.toggle("horizontal");
    rotateBtn.classList.toggle("vertical");
  })
}

function endOfInit() {
  const rotateBtn = document.getElementById("rotate-btn");
  rotateBtn.style.display = "none";
  const info = document.getElementById("info");
  info.innerText = "";
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
  gameboards.append(drawBoard("Computer"));
  gameboards.append(document.createElement("hr"));
  gameboards.append(drawBoard("PlayerOne"));
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
        console.log("chosen", chosen);
        console.log("square", square);
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

function placeShips() {
  const ships = ["carrier", "battleship", "destroyer", "submarine", "patrol boat"];

  const div = document.createElement("div");
  const rotateBtn = document.createElement("button");
  rotateBtn.append("ROTATE");
  rotateBtn.classList.add("horizontal");
  document.body.append(rotateBtn, div);
  rotateBtn.addEventListener("click", () => {
    rotateBtn.classList.toggle("horizontal");
    rotateBtn.classList.toggle("vertical");
  });

  let notYetClicked = true;

  while (notYetClicked) {
    let length = null;
    let ship = ships.shift();
    switch (ship) {
      case "carrier":
        length = 5;
        break;
      case "battleship":
        length = 4;
        break;
      case "destroyer":
        length = 3;
        break;
      case "submarine":
        length = 3;
        break;
      case "patrol boat":
        length = 2;
    }
    notYetClicked = false;
    div.append(`Place ${ship}`);
    const cells = document.querySelectorAll("#PlayerOne-board div");
    cells.forEach((cell) => {
      cell.addEventListener("mouseover", () => {
        const orientation = rotateBtn.classList[0];
        console.log(orientation);
        const coordinate = cell.dataset.coordinate.split(",");
        cell.classList.add("possible");
        for (let i = 1; i < 5; i++) {
          if (orientation === "horizontal") {
            if (+coordinate[0] + i > 9) continue;
            let adjacent = document.querySelector(
              `#PlayerOne-board [data-coordinate="${+coordinate[0] + i},${
                coordinate[1]
              }"`
            );
            adjacent.classList.add("possible");
          } else if (orientation === "vertical") {
            if (+coordinate[1] + i > 9) continue;
            let adjacent = document.querySelector(
              `#PlayerOne-board [data-coordinate="${coordinate[0]},${
                +coordinate[1] + i
              }"`
            );
            adjacent.classList.add("possible");
          }
        }
      });
      cell.addEventListener("mouseout", () => {
        cells.forEach((cell) => cell.classList.remove("possible"));
      });
      cell.addEventListener("click", () => {
        notYetClicked = true;
        const orientation = rotateBtn.classList[0];
        const coordinate = cell.dataset.coordinate.split(',');
        console.log(coordinate);
        for (let i = 0; i < 5; i++) {
          if (orientation === "horizontal") {
            if (+coordinate[0] + i > 9) continue;
            let adjacent = document.querySelector(
              `#PlayerOne-board [data-coordinate="${+coordinate[0] + i},${
                coordinate[1]
              }"`
            );
            adjacent.classList.add("ship");
          } else if (orientation === "vertical") {
            if (+coordinate[1] + i > 9) continue;
            let adjacent = document.querySelector(
              `#PlayerOne-board [data-coordinate="${coordinate[0]},${
                +coordinate[1] + i
              }"`
            );
            adjacent.classList.add("ship");
          }
        }
      })
    });
  }


}

function displayShips(player) {
  const cells = document.querySelectorAll(`#${player.name}-board div`);
  console.log(player.ships);
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
  }
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

export {
  displayShips,
  clickListener,
  drawBoards,
  initRotateBtn,
  displayShip,
  createFleet,
  endOfInit
};
