import Ship from "./ship.js";
import Gameboard from "./gameboard.js";


function createEnemyShips() {
  const carrier = Ship(5, [3, 7], "horizontal");
  const battleship = Ship(4, [0, 2], "vertical");
  const destroyer = Ship(3, [2, 5], "horizontal");
  const submarine = Ship(3, [8, 4], "vertical");
  const patrolBoat = Ship(2, [4, 2], "horizontal");

  return [carrier, battleship, destroyer, submarine, patrolBoat];
}

const Player = (name) => {

  let opponent = null;

  const carrier = Ship(5, [1, 1], "horizontal");
  const battleship = Ship(4, [1, 3], "horizontal");
  const destroyer = Ship(3, [1, 5], "horizontal");
  const submarine = Ship(3, [1, 7], "horizontal");
  const patrolBoat = Ship(2, [1, 9], "horizontal");

  let ships = [carrier, battleship, destroyer, submarine, patrolBoat];
  let position = Gameboard(ships);

  if (name === "Computer") {
    ships = createEnemyShips();
    position = Gameboard(ships);
  }

  return {
    name,
    opponent,
    ships,
    position,
    setOpponent(opp) {
      this.opponent = opp;
    },
    attack(coordinate=null) {
      if (coordinate === null) {
        coordinate = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
      }
      if (!this.opponent.position.receiveAttack(coordinate)) {
        if (this.name === "Computer") this.attack();
      }
    }
  }
}

export default Player;