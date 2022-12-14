import Ship from "./ship";
import Gameboard from "./gameboard";

const Player = (name) => {

  let opponent = null;

  const carrier = Ship(5, [1, 1], "horizontal");
  const battleship = Ship(4, [1, 3], "horizontal");
  const destroyer = Ship(3, [1, 5], "horizontal");
  const submarine = Ship(3, [1, 7], "horizontal");
  const patrolBoat = Ship(2, [1, 9], "horizontal");

  const ships = [carrier, battleship, destroyer, submarine, patrolBoat];
  const position = Gameboard(ships);

  return {
    name,
    opponent,
    ships,
    position,
    setOpponent(opp) {
      this.opponent = opp;
    },
    attack(coordinate=null) {
      this.opponent.position.receiveAttack(coordinate);
    }
  }
}

export default Player;