function drawBoard(player) {

  const div = document.createElement("div");
  for (let i = 9; i >= 0; i--) {
    for (let j = 0; j <= 9; j++) {
      div.setAttribute('data-coordinate', `${j},${i}`)
      let clone = div.cloneNode();
      div.append(clone);
    }
  }
  div.removeAttribute('data-coordinate');
  div.classList.add('gameboard');
  div.id = `${player}-board`
  return div;
}

function displayShips(player) {
  const cells = document.querySelectorAll(`#${player.name}-board div`);
  for (let ship of player.ships) {
    for (let square of ship.squares) {
      for (let cell of cells) {
        if (cell.dataset.coordinate == square) {
          cell.classList.add("ship");
        }
      }
    }
  }
}

export { drawBoard, displayShips };