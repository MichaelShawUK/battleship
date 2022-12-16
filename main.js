import {
  displayShips,
  clickListener,
  drawBoards,
  initRotateBtn,
  displayShip,
  createFleet,
  endOfInit
} from "./dom.js";
import Player from "./player.js";

const startingShips = [
  {name: "carrier", length: 5},
  {name: "battleship", length: 4},
  {name: "destroyer", length: 3},
  {name: "submarine", length: 3},
  {name: "patrol boat", length: 2},
]

export const player1 = Player("PlayerOne");
export const cpu = Player("Computer");

drawBoards();
initRotateBtn();
initShips();
player1.setOpponent(cpu);
cpu.setOpponent(player1);
displayShips(cpu);
clickListener();


async function initShips() {
  for (let ship of startingShips) {
    let boat = await createFleet(ship);
    player1.ships.push(boat);
    displayShip(boat);
  }
  endOfInit();
}

export function isGameOver() {
  if (player1.position.allShipsSunk()) {
    console.log("COMPUTER WINS");
  } else if (cpu.position.allShipsSunk()) {
    console.log("PLAYER WINS");
  }
}