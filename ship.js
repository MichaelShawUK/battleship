const Ship = (length, start, orientation) => {

  let hits = 0;

  function getEndPoint(length, start, orientation) {
    if (orientation === 'vertical') {
      return [start[0], start[1] + length - 1]
    } else if (orientation === 'horizontal') {
      return [(start[0] + length - 1), start[1]]
    }
  }

  return {
    length,
    start,
    end: getEndPoint(length, start, orientation),
    hits,
    hit() {
      this.hits++;
    },
    isSunk() {
      if (this.hits === this.length) return true;
      return false;
    }
  }
}

export default Ship;