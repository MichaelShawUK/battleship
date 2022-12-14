const Gameboard = (ships) => {
  const board = {};
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board[`${i},${j}`] = "unselected";
    }
  }

  return {
    board,
    receiveAttack(coordinate) {
      if (board[coordinate] === "unselected") {
        board[coordinate] = "clicked";
        for (let ship of ships) {
          for (let square of ship.squares) {
            if (`${coordinate}` === `${square}`) ship.hit();
          }
        }
      }
    },
    allShipsSunk() {
      for (let ship of ships) {
        if (!ship.isSunk()) return false;
      }
      return true;
    },
  };
};

export default Gameboard;
