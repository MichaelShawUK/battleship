import {
  drawBoard,
  displayShips,
  clickListener,
  placeShips
} from "./dom.js";
import Player from "./player.js";

document.body.append(drawBoard("Computer"));
document.body.append(document.createElement("hr"));
document.body.append(drawBoard("PlayerOne"));
placeShips();
export const player1 = Player("PlayerOne");
export const cpu = Player("Computer");
player1.setOpponent(cpu);
cpu.setOpponent(player1);
displayShips(player1);
displayShips(cpu);
clickListener();


export function isGameOver() {
  if (player1.position.allShipsSunk()) {
    console.log("COMPUTER WINS");
  } else if (cpu.position.allShipsSunk()) {
    console.log("PLAYER WINS");
  }
}