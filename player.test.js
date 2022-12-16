import Player from "./player.js";

const positions = [[0,9],[0,7],[0,5],[0,3],[0,1]];

test("Player can set computer as opponent", () => {
  const player1 = Player("Player One", positions);
  const cpu = Player("Computer", positions);
  player1.setOpponent(cpu);
  expect(player1.opponent.name).toBe("Computer");
})

test("Player can attack enemy's gameboard", () => {
  const player1 = Player("Player One", positions);
  const cpu = Player("Computer", positions);
  player1.setOpponent(cpu);
  const coordinate = [4, 7];
  player1.attack(coordinate);
  expect(cpu.position.board[coordinate]).toBe("clicked");
})

test("Computer randomly selects square on player's board", () => {
  const player1 = Player("Player One", positions);
  const cpu = Player("Computer", positions);
  cpu.setOpponent(player1);
  cpu.attack();
  expect(Object.values(player1.position.board)).toContain("clicked");
})

test("Computer chooses different square if already clicked", () => {
  const player1 = Player("Player One", positions);
  const cpu = Player("Computer", positions);
  cpu.setOpponent(player1);
  for (let key in player1.position.board) {
    player1.position.board[key] = "clicked";
  }
  player1.position.board["2,5"] = "unselected";
  cpu.attack();
  expect(Object.values(player1.position.board)).not.toContain("unselected");
})
