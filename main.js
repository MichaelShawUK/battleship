import { drawBoard, displayShips } from "./dom.js";
import Player from "./player.js";

document.body.append(drawBoard("Computer"));
document.body.append(document.createElement("hr"));
document.body.append(drawBoard("PlayerOne"));

const player1 = Player("PlayerOne");
const cpu = Player("Computer");
displayShips(player1);
displayShips(cpu);
