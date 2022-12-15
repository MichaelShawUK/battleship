import { player1, cpu, isGameOver } from "./main.js";

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

function placeShips() {
  const ships = {
    carrier: 5,
    battleship: 4,
    destroyer: 3,
    submarine: 3,
    patrolBoat: 2,
  };

  const div = document.createElement("div");
  const rotateBtn = document.createElement("button");
  rotateBtn.append("ROTATE");
  rotateBtn.classList.add("horizontal");
  document.body.append(rotateBtn, div);
  rotateBtn.addEventListener("click", () => {
    rotateBtn.classList.toggle("horizontal");
    rotateBtn.classList.toggle("vertical");
  });

  div.append(`Place carrier`);
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
  });
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
  drawBoard,
  displayShips,
  clickListener,
  registerEnemyAttack,
  placeShips,
};
