import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

function randomEnemyFleet() {
  const ships = [];
  let occupiedSquares = [];
  let incompleteFleet = true;
  const lengths = [5, 4, 3, 3, 2];

  remakeShip:
  while (incompleteFleet) {
    const ship = randomlyPlaceShip(lengths[0]);
    for (let occupied of occupiedSquares) {
      for (let square of ship.squares) {
        if (`${occupied}` === `${square}`) continue remakeShip;
      }
    }
    if (!isWithinBounds(ship)) continue;
    ships.push(ship);
    occupiedSquares = occupiedSquares.concat(ship.squares);
    lengths.shift();
    if (lengths.length === 0) {
      incompleteFleet = false;
    }
  }
  return ships;
}

function randomlyPlaceShip(length) {
  let rand1 = Math.floor(Math.random() * 10);
  let rand2 = Math.floor(Math.random() * 10);
  let orientation = ["horizontal", "vertical"][Math.round(Math.random())];
  return Ship(length, [rand1, rand2], orientation);
}

function isWithinBounds(ship) {
  const withinBounds = coordinate => (coordinate <= 9);
  const coordinates = ship.squares.join(',').split(',');
  return coordinates.every(withinBounds);
}


const Player = (name) => {
  let opponent = null;
  let ships = [];
  if (name === "Computer") ships = randomEnemyFleet();
  let position = Gameboard(ships);

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