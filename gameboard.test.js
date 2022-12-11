import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

test("Ship takes hit if occupying co-ordinate passed to receiveAttack", () => {
  const carrier = Ship(5, [1, 1], "horizontal");
  // Carrier positioned at [1,1],[2,1],[3,1],[4,1],[5,1]
  const gameboardA = Gameboard([carrier]);
  gameboardA.receiveAttack([4, 1]);
  expect(carrier.hits).toBe(1);
});

test("Returns true if all board's ships have been sunk", () => {
  const patrolBoat = Ship(2, [5, 6], "vertical");
  const submarine = Ship(3, [4, 2], "horizontal");
  const ships = [submarine, patrolBoat];
  const gameboardB = Gameboard(ships);
  gameboardB.receiveAttack([5, 6]);
  gameboardB.receiveAttack([5, 7]);
  gameboardB.receiveAttack([4, 2]);
  gameboardB.receiveAttack([5, 2]);
  gameboardB.receiveAttack([6, 2]);
  expect(gameboardB.allShipsSunk()).toBe(true);
});
