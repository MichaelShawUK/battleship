import { player1, cpu, isGameOver} from "./main.js";

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
    cell.addEventListener("click", () => {
      if (!Array.from(cell.classList).includes("clicked")) {
        cell.classList.add("clicked");
        player1.attack(cell.dataset.coordinate);
        cpu.attack();
        registerEnemyAttack();
        isGameOver();
      }
    });
  });
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

export { drawBoard, displayShips, clickListener, registerEnemyAttack };
