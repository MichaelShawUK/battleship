import {
  drawBoard,
  displayShips,
  clickListener,
} from "./dom.js";
import Player from "./player.js";

document.body.append(drawBoard("Computer"));
document.body.append(document.createElement("hr"));
document.body.append(drawBoard("PlayerOne"));

export const player1 = Player("PlayerOne");
export const cpu = Player("Computer");
player1.setOpponent(cpu);
cpu.setOpponent(player1);
displayShips(player1);
displayShips(cpu);
clickListener();
// console.log(player1.position.board);
// registerEnemyAttack(cpu.attack());
// registerEnemyAttack(cpu.attack());
// console.log(player1.position.board);




