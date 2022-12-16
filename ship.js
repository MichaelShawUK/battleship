const Ship = (length, start, orientation) => {
  let hits = 0;

  function getOccupiedSquares(length, start, orientation) {
    const squares = [];
    for (let i = 0; i < length; i++) {
      if (orientation === "vertical") {
        squares.push([+start[0], +start[1] + i]);
      } else if (orientation === "horizontal") {
        squares.push([+start[0] + i, +start[1]]);
      }
    }
    return squares;
  }

  return {
    length,
    squares: getOccupiedSquares(length, start, orientation),
    hits,
    hit() {
      this.hits++;
    },
    isSunk() {
      if (this.hits === this.length) return true;
      return false;
    },
  };
};

export default Ship;
